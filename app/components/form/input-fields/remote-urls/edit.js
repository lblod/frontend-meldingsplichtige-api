import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import {
  triplesForPath,
  validationResultsForField,
  validationResultsForFieldPart
} from '../../../../utils/import-triples-for-form';

import {DCT, NIE, RDF} from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';
import uuidv4 from "uuid/v4";

const CREATOR_URI = "http://lblod.data.gift/fronted-end-componets/remote-url-creator";
const REMOTE_URI_TEMPLATE = 'http://data.lblod.info/remote-url/';

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
    const uris = matches.triples.filter(t => t.predicate.value === DCT("hasPart").value).map(t => t.object);

    for (let uri of uris) {
      try {
        let remoteUrl = await this.retrieveRemoteDataObject(uri, matches.triples)
        this.remoteUrls.pushObject({
          remoteUrl,
          errors: this.validationResultsForAddress(remoteUrl.address),
          uri
        });
      } catch (error) {
        this.remoteErrors.pushObject({resultMessage: "Er ging iets fout bij het ophalen van de addressen."});
      }
    }
  }

  async retrieveRemoteDataObject(uri, triples) {
    // first we try to get it from the triple-store (exciting file)
    let remotes = await this.store.query('remote-url', {'filter[:uri:]': uri.value});
    if (remotes.length !== 0) {
      return remotes.get('firstObject');
    }
    // if nothing was found we try to retrieve it from local (being made in this instance)
    remotes = await this.store.peekAll('remote-url').filter(remote => remote.uri === uri.value);
    if (remotes.length !== 0) {
      return remotes.get('firstObject');
    }
    // if nothing was found in the triple-store or locally, we create our own record based
    // on the values.
    return this.store.createRecord('remote-url', {
      uri,
      creator: CREATOR_URI,
      address: triples.filter(t => t.subject.value === uri.value).map(t => t.object.value).get('firstObject')
    });
  }

  isRemoteDataObject(subject) {
    return this.storeOptions.store.match(subject,
      RDF('type'),
      new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
      this.storeOptions.sourceGraph).length > 0;
  }

  // TODO change this to save the correct data in the rdflib form
  insertRemoteDataObject(remoteObj) {
    const triples = [
      {
        subject: this.storeOptions.sourceNode,
        predicate: DCT('hasPart'),
        object: new rdflib.NamedNode(remoteObj.uri),
        graph: this.storeOptions.sourceGraph
      },
      {
        subject: new rdflib.NamedNode(remoteObj.uri),
        predicate: NIE('url'),
        object: remoteObj.address,
        graph: this.storeOptions.sourceGraph
      }];
    this.storeOptions.store.addAll(triples);
  }

  // TODO change this to remove the correct data in the rdflib form
  removeRemoteDataObject(remoteObjUri) {
    const uri = new rdflib.NamedNode(remoteObjUri);
    const statements = [
      ...this.storeOptions.store.match(uri, undefined, undefined, this.storeOptions.sourceGraph),
      {
        subject: this.storeOptions.sourceNode,
        predicate: DCT('hasPart'),
        object: uri,
        graph: this.storeOptions.sourceGraph
      }
    ];
    this.storeOptions.store.removeStatements(statements);
  }

  @action
  addUrlField() {
    this.remoteUrls.pushObject({remoteUrl: null, errors: [], uri: null});
  }

  @action
  async updateRemoteUrl(current, newValue) {

    if (current.remoteUrl && current.remoteUrl.address === newValue.trim()) return; //do nothing if no change

    //for every url update we should make a new remote-url. This is how the model is
    const address = newValue.trim();
    const newRemoteUrl = this.createNewRemoteUrl(address);

    //If there was a previous, remove this from the store
    if (current.uri) {
      await current.remoteUrl.destroyRecord();
      this.removeRemoteDataObject(current.uri.value);
    }

    this.insertRemoteDataObject(newRemoteUrl);
  }

  @action
  async removeRemoteUrl(current) {
    if (current.remoteUrl) {
      await current.remoteUrl.destroyRecord();
      this.removeRemoteDataObject(current.uri.value);
    } else {
      this.remoteUrls = [];
    }
  }

  createNewRemoteUrl(address) {
    return this.store.createRecord('remote-url', {
      uri: `${REMOTE_URI_TEMPLATE}${uuidv4()}`,
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
