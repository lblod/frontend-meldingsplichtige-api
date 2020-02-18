import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

import {
  triplesForPath,
  validationResultsForField,
  addSimpleFormValue,
  removeSimpleFormValue
} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsFilesEditComponent extends Component {

  @service()
  store;

  @tracked
  files = [];

  @tracked
  errors = [];

  @tracked
  storeOptions = {};

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
    if (matches.values.length > 0) {
      for (let uri of matches.values) {
        try {
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
    this.errors.pushObject(`failed to retrieve file with uri ${uri}`);
  }

  cachedFileUris = [];

  @action
  addFile(file, filesQueueInfo) {
    this.cachedFileUris.push(file.uri);
    if(filesQueueInfo.isQueueEmpty){
      this.cachedFileUris.forEach( uri => addSimpleFormValue(uri, this.storeOptions) );
    }
  }

  @action
  async removeFile(file) {
    removeSimpleFormValue(file.uri, this.storeOptions);
    // we need to remove the uploaded file ourselves, as this is not done by the `VoMuFileCard` component.
    try {
      await (this.store.peekRecord('file', file.id)).destroyRecord();
    } catch (error) {
      // should probably be silently logged in later implementations
    }
  }
}
