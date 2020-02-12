import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

import {
  triplesForPath,
  addSimpleFormValue,
  removeSimpleFormValue, validationResultsForField
} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsFileAddressesEditComponent extends Component {

  @service
  store;

  @tracked
  fileAddresses = [];

  @action
  loadData() {
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

  loadValidations(){
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    if (matches.values.length > 0) {
      for (let path of matches.values) {
        this.fileAddresses.pushObject(path.value.trim());
      }
    }
  }

  @action
  addUrlField() {
    this.fileAddresses.pushObject("");
  }

  @action
  updateFileAddresses(prev, value) {
    removeSimpleFormValue(prev, this.storeOptions);
    addSimpleFormValue(value, this.storeOptions);
  }

  @action
  delete(value) {
    removeSimpleFormValue(value, this.storeOptions);
  }
}
