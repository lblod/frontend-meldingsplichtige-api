import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { inject as service } from '@ember/service';

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
        let id = uri.value.split("/").pop();
        const uploadedFile = await this.store.findRecord('file', id);
        this.files.pushObject(uploadedFile);
      }
    }
  }

  @action
  addFile(file) {
    addSimpleFormValue(file.uri, this.storeOptions);
  }

  @action
  removeFile(file) {
    removeSimpleFormValue(file.uri, this.storeOptions);
  }
}
