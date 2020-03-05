import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import {
  triplesForPath,
  validationResultsForField,
  validationResultsForFieldPart,
  addSimpleFormValue,
  removeSimpleFormValue
} from '../../../../utils/import-triples-for-form';

import { RDF } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';

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

    for (let uri of matches.values) {
      try {
        if(!this.isRemoteDataObject(uri)) continue;
        const remotes = await this.store.query('remote-url', {'filter[:uri:]': uri.value});
        const remoteUrl = remotes.get('firstObject');
        if (remoteUrl) {
          this.remoteUrls.pushObject({
            remoteUrl,
            errors: this.validationResultsForAddress(remoteUrl.address),
            uri
          });
        } else {
          this.remoteErrors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
        }
      } catch (error) {
        this.remoteErrors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
      }

    }
  }

  isRemoteDataObject(subject){
    return this.storeOptions.store.match(subject,
                                         RDF('type'),
                                         new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
                                         this.storeOptions.sourceGraph).length > 0;
  }

  insertRemoteDataObject(remoteObjUri){
    const typeT = { subject: new rdflib.NamedNode(remoteObjUri),
                    predicate: RDF('type'),
                    object: new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
                    graph: this.storeOptions.sourceGraph
                  };
    this.storeOptions.store.addAll([ typeT ]);
    addSimpleFormValue(new rdflib.NamedNode(remoteObjUri), this.storeOptions);
  }

  removeRemoteDataObject(remoteObjUri){
    const typeT = { subject: new rdflib.NamedNode(remoteObjUri),
                    predicate: RDF('type'),
                    object: new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
                    graph: this.storeOptions.sourceGraph
                  };
    this.storeOptions.store.removeStatements([ typeT ]);
    removeSimpleFormValue(new rdflib.NamedNode(remoteObjUri), this.storeOptions);
  }

  @action
  addUrlField() {
    this.remoteUrls.pushObject({remoteUrl: null, errors: [], uri: null});
  }

  @action
  async updateRemoteUrl(current, newValue) {

    if (current.remoteUrl && current.remoteUrl.address == newValue.trim()) return; //do nothing if no change

    //for every url update we should make a new remote-url. This is how the model is
    const address = newValue.trim();
    const newRemoteUrl = this.createNewRemoteUrl(address);

    try {
        await newRemoteUrl.save();
      } catch (error) {
        this.remoteErrors.pushObject({resultMessage: "Er ging iets fout bij het opslaan."});
        return;
    }

    //If there was a previous, remove this from the store
    if(current.uri){
      await current.remoteUrl.destroyRecord();
      this.removeRemoteDataObject(current.uri.value);
    }

    this.insertRemoteDataObject(newRemoteUrl.uri);
  }

  @action
  async removeRemoteUrl(current) {
    if(current.remoteUrl) {
      await current.remoteUrl.destroyRecord();
       this.removeRemoteDataObject(current.uri.value);
    } else {
      this.remoteUrls = [];
    }
  }

  createNewRemoteUrl(address) {
    return this.store.createRecord('remote-url', {
      creator: CREATOR_URI,
      address
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
