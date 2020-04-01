import { action } from '@ember/object';
import SimpleInputFieldComponent from '../simple-value-input-field';
import { updateSimpleFormValue } from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsInputEditComponent extends SimpleInputFieldComponent {
  @action
  updateValue(e){
    e.preventDefault();
    updateSimpleFormValue(this.storeOptions, this.value && this.value.trim(), this.nodeValue);
    this.loadData();
  }
}
