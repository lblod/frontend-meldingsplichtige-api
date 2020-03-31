import InputFieldComponent from '../input-field';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  triplesForPath,
  validationResultsForFieldPart,
  addSimpleFormValue,
  removeSimpleFormValue
} from '../../../../utils/import-triples-for-form';

import { RDF, NIE } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';
import { v4 as uuidv4 } from 'uuid';

const REMOTE_URI_TEMPLATE = 'http://data.lblod.info/remote-url/';

class RemoteUrl {
  errors = [];

  constructor({ uri, address, errors }) {
    this.uri = uri;
    this.address = address;
    this.errors = errors;
  }

  get isValid() {
    return this.errors.length == 0;
  }

  get isInvalid() {
    return !this.isValid;
  }
}
export default class FormInputFieldsRemoteUrlsEditComponent extends InputFieldComponent {
  @tracked remoteUrls = [];

  @action
  async loadData() {
    super.loadData();
    this.loadProvidedValue();
  }

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);

    for (let uri of matches.values) {
      if (this.isRemoteDataObject(uri)) {
        const remoteUrl = this.retrieveRemoteDataObject(uri);
        this.remoteUrls.pushObject(remoteUrl);
      }
    }
  }

  isRemoteDataObject(subject){
    const remoteDataObjectType = new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject');
    return this.storeOptions.store.match(subject,
                                         RDF('type'),
                                         remoteDataObjectType,
                                         this.storeOptions.sourceGraph).length > 0;
  }

  retrieveRemoteDataObject(uri) {
    const urlTriples = this.storeOptions.store.match(uri, NIE('url'), undefined, this.storeOptions.sourceGraph);

    if (urlTriples.length) {
      const address = urlTriples[0].object.value;
      const errors = this.validationErrorsForAddress(address).map(e => e.resultMessage);

      if (urlTriples.length > 1)
        errors.push("Veld kan maximaal 1 URL bevatten");

      return new RemoteUrl({ uri, address, errors });
    } else {
      return new RemoteUrl({ uri, address: null, errors: ["Dit veld is verplicht"] });
    }
  }

  removeRemoteDataObject(uri){
    const remoteObjecTs = this.storeOptions.store.match(uri, undefined, undefined, this.storeOptions.sourceGraph);
    if (remoteObjecTs.length) {
      this.storeOptions.store.removeStatements(remoteObjecTs);
    }
    removeSimpleFormValue(new rdflib.NamedNode(uri), this.storeOptions); // remove hasPart
  }

  insertRemoteDataObject({ uri, address } ){
    const triples = [
      { subject: uri,
        predicate: RDF('type'),
        object: new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
        graph: this.storeOptions.sourceGraph
      },
      {
        subject: uri,
        predicate: NIE('url'),
        object: address,
        graph: this.storeOptions.sourceGraph
      }
    ];
    this.storeOptions.store.addAll( triples );
    addSimpleFormValue(uri, this.storeOptions); // add hasPart;
  }

  @action
  addUrlField() {
    this.remoteUrls.pushObject(new RemoteUrl({
      uri: new rdflib.namedNode(REMOTE_URI_TEMPLATE + `${uuidv4()}`),
      address: '',
      errors: [],
    }));
  }

  @action
  updateRemoteUrl(remoteUrl) {
    const address = remoteUrl.address.trim();
    this.removeRemoteDataObject( remoteUrl.uri );
    this.insertRemoteDataObject({ uri: remoteUrl.uri, address });
  }

  @action
  removeRemoteUrl(current) {
    this.removeRemoteDataObject( current.uri );
  }

  validationErrorsForAddress(address) {
    return validationResultsForFieldPart(
      { values: [{ value: address }] },
      this.args.field.uri,
      this.storeOptions).filter(r => !r.valid);
  }
}
