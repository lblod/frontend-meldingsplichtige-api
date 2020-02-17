import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import {
  triplesForPath,
  addSimpleFormValue,
  removeSimpleFormValue,
  validationResultsForField,
  validationResultsForFieldPart
} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsFileAddressesEditComponent extends Component {

  @service
  store;

  @tracked
  fileAddresses = [];

  @tracked
  errors = [];

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
    for (let triple of matches.triples) {
      this.fileAddresses.pushObject({ fileAddress: { address : triple.object.value.trim() },
                                      errors: validationResultsForFieldPart({values: [ triple.object ]},
                                                                            this.args.field.uri,
                                                                            this.storeOptions).filter(r => !r.valid) } );
    }
  }

  @action
  addUrlField() {
    this.fileAddresses.pushObject({ fileAddress: { address : ""}, errors: []});
  }

  @action
  updateFileAddress(currentFileAddress, newValue) {
    removeSimpleFormValue(currentFileAddress.fileAddress.address, this.storeOptions);
    set(currentFileAddress, 'fileAddress.address', newValue);
    addSimpleFormValue(newValue, this.storeOptions);
  }

  @action
  removeFileAddress(value) {
    removeSimpleFormValue(value.fileAddress.address, this.storeOptions);
  }
}
