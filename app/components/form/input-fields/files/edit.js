import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import { RDF } from '../../../../utils/namespaces';
import rdflib from 'browser-rdflib';
import { guidFor } from '@ember/object/internals';

import {
  triplesForPath,
  validationResultsForField,
  addSimpleFormValue,
  removeSimpleFormValue
} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsFilesEditComponent extends Component {

  @service()
  store;

  @tracked files = []

  @tracked errors = []

  observerLabel = `files-${guidFor(this)}`

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

    this.storeOptions
      .store.registerObserver(this.loadValidationsOnStoreUpdate.bind(this), this.observerLabel);

    this.loadValidations();
    await this.loadProvidedValue();
  }

  willDestroy(){
    this.storeOptions.store.deregisterObserver(this.observerLabel);
  }

  loadValidationsOnStoreUpdate(){
    //Required because this field being valid, depends on the state of other fields
    this.loadValidations();
  }

  loadValidations() {
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  async loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    if (matches.values.length > 0) {
      for (let uri of matches.values) {
        try {
          if(!this.isFileDataObject(uri)) continue;
          const files = await this.store.query('file', {'filter[:uri:]' : uri.value});
          const uploadedFile = files.get('firstObject');
          if(uploadedFile) {
            this.files.pushObject(uploadedFile);
          } else {
            this.handleRetrievalError(uri.value);
          }
        } catch (error) {
          this.handleRetrievalError(uri.value);
        }
      }
    }
  }

  handleRetrievalError(uri) {
    this.errors.pushObject({resultMessage: `failed to retrieve file with uri ${uri}` });
  }

  isFileDataObject(subject){
    return this.storeOptions.store.match(subject,
                                         RDF('type'),
                                         new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#FileDataObject'),
                                         this.storeOptions.sourceGraph).length > 0;
  }

  insertFileDataObject(fileUri){
    const typeT = { subject: new rdflib.NamedNode(fileUri),
                    predicate: RDF('type'),
                    object: new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#FileDataObject'),
                    graph: this.storeOptions.sourceGraph
                  };
    this.storeOptions.store.addAll([ typeT ]);
    addSimpleFormValue(new rdflib.NamedNode(fileUri), this.storeOptions);
  }

  removeFileDataObject(fileUri){
    const typeT = { subject: new rdflib.NamedNode(fileUri),
                    predicate: RDF('type'),
                    object: new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#FileDataObject'),
                    graph: this.storeOptions.sourceGraph
                  };
    this.storeOptions.store.removeStatements([ typeT ]);
    removeSimpleFormValue(new rdflib.NamedNode(fileUri), this.storeOptions);
  }

  @action
  addFile(file) {
    this.insertFileDataObject(file.uri);
    this.files.pushObject(file);
    this.loadValidations();
  }

  @action
  async removeFile(file) {
    this.removeFileDataObject(file.uri);
    // we need to remove the uploaded file ourselves, as this is not done by the `VoMuFileCard` component.
    try {
      await (this.store.peekRecord('file', file.id)).destroyRecord();
    } catch (error) {
      // should probably be silently logged in later implementations
    }
    this.files.removeObject(file);
  }
}
