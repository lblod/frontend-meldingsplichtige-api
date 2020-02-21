import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import {set} from '@ember/object';
import {
  triplesForPath,
  updateSimpleFormValue,
  validationResultsForField,
  validationResultsForFieldPart
} from '../../../../utils/import-triples-for-form';
import rdflib from 'ember-rdflib';

const READY_TO_BE_CACHED_URI = "http://lblod.data.gift/file-download-statuses/ready-to-be-cached";
const CREATOR_URI = "http://lblod.data.gift/fronted-end-componets/remote-url-creator";

export default class FormInputFieldsRemoteUrlsEditComponent extends Component {

  @service
  store;

  @tracked
  remoteUrls = [];

  @tracked
  errors = [];

  @tracked
  remoteErrors = [];

  @action
  async loadData() {
    this.storeOptions = {
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph,
      metaGraph: this.args.graphs.metaGraph,
      store: this.args.formStore,
      path: this.args.field.rdflibPath
    };


    this.loadValidations();
    await this.loadProvidedValue();
  }

  loadValidations() {
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  async loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);

    // This will return two triples per url:
    // <form> <http://purl.org/dc/terms/hasPart> <remoteUrl> .
    // <remoteUrl> <http://www.semanticdesktop.org/ontologies/2007/01/19/nie#url> <theUrl> .

    const groupedByRemoteUrl = matches.triples.reduce((acc, t) => {
      if(t.predicate.value == 'http://purl.org/dc/terms/hasPart'){
        acc[t.object.value] = { remoteUrlData: t };
      }
      else {
        acc[t.subject.value].addressData = t;
      }
      return acc;
    }, {});

    for (let data of Object.values(groupedByRemoteUrl)) {
      const uri = (data.remoteUrlData.object.value || '').trim(); //they might come from places not created from this component
      try {
        const remotes = await this.store.query('remote-url', {'filter[:uri:]': uri});
        const remoteUrl = remotes.get('firstObject');
        if (remoteUrl) {
          this.remoteUrls.pushObject({
            remoteUrl,
            errors: this.validationResultsForAddress(remoteUrl.address),
            triplesData: data
          });
        } else {
          this.remoteErrors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
        }
      } catch (error) {
        this.remoteErrors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
      }

    }
  }

  @action
  addUrlField() {
    this.remoteUrls.pushObject({remoteUrl: null, errors: [], triplesData: null});
  }

  @action
  async updateRemoteUrl(current, newValue) {

    if (current.remoteUrl && current.remoteUrl.address == newValue.trim()) return; //do nothing if no change

    //for every url update we should make a new remote-url. This is how the model is
    //TODO: Now every time a url is added, it is immediatly cached. This should occur on save
    const address = newValue.trim();
    const status = this.isValidAddress(address) ? READY_TO_BE_CACHED_URI : null;
    const newRemoteUrl = this.createNewRemoteUrl(address, status);

    try {
        await newRemoteUrl.save();
      } catch (error) {
        this.remoteErrors.pushObject({resultMessage: "Er ging iets fout bij het opslaan."});
        return;
    }

    //If there was a previous, remove this from the store
    if(current.triplesData){
      await current.remoteUrl.destroyRecord();
      const tripleRemoteUrl = {
        subject: this.storeOptions.sourceNode,
        predicate: new rdflib.NamedNode("http://purl.org/dc/terms/hasPart"),
        object: new rdflib.NamedNode(current.remoteUrl.uri),
        graph: this.storeOptions.sourceGraph
      };
      this.storeOptions.store.removeStatements([ tripleRemoteUrl ]);
      updateSimpleFormValue(this.storeOptions, null, current.triplesData.addressData.object); //we can rely on some boilerplate abstraction
    }

    // Boilerplate to create one
    const tripleRemoteUrl = {
      subject: this.storeOptions.sourceNode,
      predicate: new rdflib.NamedNode("http://purl.org/dc/terms/hasPart"),
      object: new rdflib.NamedNode(newRemoteUrl.uri),
      graph: this.storeOptions.sourceGraph
    };
    const tripleAddress = {
      subject: tripleRemoteUrl.object,
      predicate: new rdflib.NamedNode("http://www.semanticdesktop.org/ontologies/2007/01/19/nie#url"),
      object: newRemoteUrl.address,
      graph: this.storeOptions.sourceGraph
    };
    this.storeOptions.store.addAll([tripleRemoteUrl, tripleAddress]);

  }

  @action
  async removeRemoteUrl(current) {
    await current.remoteUrl.destroyRecord();
    const tripleRemoteUrl = {
      subject: this.storeOptions.sourceNode,
      predicate: new rdflib.NamedNode("http://purl.org/dc/terms/hasPart"),
      object: new rdflib.NamedNode(current.remoteUrl.uri),
      graph: this.storeOptions.sourceGraph
    };
    this.storeOptions.store.removeStatements([ tripleRemoteUrl ]);
    updateSimpleFormValue(this.storeOptions, null, current.triplesData.addressData.object); //we can rely on some boilerplate abstraction
  }

  createNewRemoteUrl(address, downloadStatus) {
    return this.store.createRecord('remote-url', {
      creator: CREATOR_URI,
      downloadStatus, address
    });
  }

  isValidAddress(value) {
    let errors = this.validationResultsForAddress(value);
    return errors ? errors.length === 0 : false;
  }

  validationResultsForAddress(value) {
    return validationResultsForFieldPart(
      {values: [{value}]},
      this.args.field.uri,
      this.storeOptions).filter(r => !r.valid);
  }
}
