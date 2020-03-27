import { action } from '@ember/object';
import { updateSimpleFormValue } from '../../../../utils/import-triples-for-form';
import SimpleInputFieldComponent from '../simple-value-input-field';

export default class FormInputFieldsTextAreaEditComponent extends SimpleInputFieldComponent {
  @action
  updateValue(e) {
    e.preventDefault();
    updateSimpleFormValue(this.storeOptions, this.value && this.value.trim(), this.nodeValue);
  }
}
