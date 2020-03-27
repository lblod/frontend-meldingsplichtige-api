import { action } from '@ember/object';
import rdflib from 'ember-rdflib';
import { updateSimpleFormValue } from '../../../../utils/import-triples-for-form';
import { XSD } from '../../../../utils/namespaces';
import SimpleInputFieldComponent from '../simple-value-input-field';

export default class FormInputFieldsDateEditComponent extends SimpleInputFieldComponent {
  @action
  updateValue(newValue){
    let dateString = null;
    if(newValue != null) {
      dateString = newValue.toISOString().split("T")[0];
    }
    const newDate = rdflib.literal(dateString, XSD('date'));
    updateSimpleFormValue(this.storeOptions, newDate, this.nodeValue);
  }
}
