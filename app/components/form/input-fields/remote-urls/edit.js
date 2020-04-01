import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  triplesForPath,
  validationResultsForField,
  validationResultsForFieldPart,
  addSimpleFormValue,
  removeSimpleFormValue
} from '../../../../utils/import-triples-for-form';

import { RDF, NIE } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';
import {v4 as uuidv4} from 'uuid';

const REMOTE_URI_TEMPLATE = 'http://data.lblod.info/remote-url/';

export default class FormInputFieldsRemoteUrlsEditComponent extends Component {
  @tracked remoteUrls = []

  @tracked errors = []

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
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);

    for (let uri of matches.values) {
      try {
        if(!this.isRemoteDataObject(uri)) continue;
        this.remoteUrls.pushObject(this.retrieveRemoteDataObject(uri));
      } catch (error) {
        this.errors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
      }
    }
  }

  isRemoteDataObject(subject){
    return this.storeOptions.store.match(subject,
                                         RDF('type'),
                                         new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
                                         this.storeOptions.sourceGraph).length > 0;
  }

  removeRemoteDataObject(remoteObjUri){
    const remoteObjecTs = this.storeOptions.store.match(remoteObjUri, undefined, undefined, this.storeOptions.sourceGraph);
    if(remoteObjecTs.length){
      this.storeOptions.store.removeStatements(remoteObjecTs);
    }
    removeSimpleFormValue(new rdflib.NamedNode(remoteObjUri), this.storeOptions); //remove hasPart
  }

  insertRemoteDataObject({ remoteObjUri, address } ){
    const triples = [
      { subject: remoteObjUri,
        predicate: RDF('type'),
        object: new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
        graph: this.storeOptions.sourceGraph
      },
      {
        subject: remoteObjUri,
        predicate: NIE('url'),
        object: address,
        graph: this.storeOptions.sourceGraph
      }
    ];
    this.storeOptions.store.addAll( triples );
    addSimpleFormValue(remoteObjUri, this.storeOptions); //adds hasPart;
  }

  retrieveRemoteDataObject(remoteObjUri) {
    const addressesTs = this.storeOptions.store.match(remoteObjUri, NIE('url'), undefined, this.storeOptions.sourceGraph);
    if(addressesTs.length > 1) throw `Too many addresses for ${remoteObjUri.value}.`;
    if(addressesTs.length) {
      const address = addressesTs[0].object.value;
      return { remoteObjUri, address: address, validation: this.validationResultsForAddress(address) };
    }
    return { remoteObjUri, address: null };
  }

  @action
  addUrlField() {
    this.remoteUrls.pushObject({remoteObjUri: new rdflib.namedNode(REMOTE_URI_TEMPLATE + `${uuidv4()}`), validation: [], address: ''});
  }

  @action
  updateRemoteUrl(current, newValue) {
    const address = newValue.trim();
    if (current.address == address) return; //do nothing if no change
    this.removeRemoteDataObject( current.remoteObjUri );
    this.insertRemoteDataObject({ remoteObjUri: current.remoteObjUri, address });
    set(current, "validation", this.validationResultsForAddress(address)); //Keeps track of validation message for specific address
    this.loadValidations(); // keeps track of the validation state for the form filed in general
  }

  @action
  async removeRemoteUrl(current) {
    this.removeRemoteDataObject( current.remoteObjUri );
    this.remoteUrls.removeObject(current);
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
