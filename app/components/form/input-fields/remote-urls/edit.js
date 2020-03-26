import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import {
  triplesForPath,
  validationResultsForField,
  validationResultsForFieldPart
} from '../../../../utils/import-triples-for-form';

import {DCT, NIE} from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';
import uuidv4 from "uuid/v4";

const REMOTE_URI_TEMPLATE = 'http://data.lblod.info/remote-url/';

export default class FormInputFieldsRemoteUrlsEditComponent extends Component {

  @service
  store;

  @tracked
  remoteUrls = [];

  @tracked
  errors = [];

  @tracked
  validation = [];

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
    this.loadProvidedValue();
  }

  loadValidations() {
    this.validation = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    const uris = matches.triples.filter(t => t.predicate.value === DCT("hasPart").value).map(t => t.object);

    for (let uri of uris) {
      try {
        let remoteUrl = this.retrieveRemoteDataObject(uri, matches.triples)
        this.remoteUrls.pushObject({
          ...this.retrieveRemoteDataObject(uri),
          validation: this.validationResultsForAddress(remoteUrl.address),
        });
      } catch (error) {
        this.errors.pushObject({resultMessage: "Er ging iets fout bij het ophalen van de addressen."});
      }
    }
  }

  retrieveRemoteDataObject(uri) {
    const addresses = triplesForPath(this.storeOptions)
      .triples
      .filter(t => t.subject.value === uri.value)
      .map(t => t.object.value);
    if (addresses.length !== 0) {
      return {
        uri,
        address: addresses.get('firstObject')
      }
    } else {
      throw `No remote-url could be found for ${uri}`;
    }
  }

  validationResultsForAddress(value) {
    return validationResultsForFieldPart(
      {
        values: [{value}]
      },
      this.args.field.uri,
      this.storeOptions).filter(r => !r.valid);
  }

  insertRemoteDataObject(address) {
    const uri = new rdflib.NamedNode(`${REMOTE_URI_TEMPLATE}${uuidv4()}`);
    const triples = [
      {
        subject: this.storeOptions.sourceNode,
        predicate: DCT('hasPart'),
        object: uri,
        graph: this.storeOptions.sourceGraph
      },
      {
        subject: uri,
        predicate: NIE('url'),
        object: address,
        graph: this.storeOptions.sourceGraph
      }];
    this.storeOptions.store.addAll(triples);
  }

  removeRemoteDataObject(remote) {
    const uri = new rdflib.NamedNode(remote.uri);
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
    this.remoteUrls.pushObject({
      uri: null,
      address: null,
    });
  }

  @action
  async updateRemoteUrl(current, newValue) {
    if (current.remoteUrl && current.remoteUrl.address === newValue.trim()) return; //do nothing if no change
    //If there was a previous, remove this from the store
    if (current.uri) {
      this.removeRemoteDataObject(current);
    }
    this.insertRemoteDataObject(newValue.trim());
  }

  @action
  async removeRemoteUrl(current) {
    if (current.value) {
      this.removeRemoteDataObject(current)
    } else {
      this.remoteUrls = [];
    }
  }
}
