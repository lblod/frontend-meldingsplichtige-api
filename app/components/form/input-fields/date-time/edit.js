import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import rdflib from 'browser-rdflib';
import { triplesForPath, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';
import { XSD } from '../../../../utils/namespaces';
import SimpleInputFieldComponent from '../simple-value-input-field';

export default class FormInputFieldsDateTimeEditComponent extends SimpleInputFieldComponent {
  inputId = 'date-' + guidFor(this);

  @tracked hour = null
  @tracked minutes = null

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    if (matches.values.length > 0) {
      this.nodeValue = matches.values[0];
      const datobj = new Date(this.nodeValue.value);
      this.value = datobj;
      this.hour = datobj.getHours();
      this.minutes = datobj.getMinutes();
    }
  }

  @action
  updateValue() {
    if (this.value) {
      this.value.setHours(this.hour, this.minutes, null, null);
    }
    const newValue = rdflib.literal(this.value.toISOString(), XSD('dateTime'));
    updateSimpleFormValue(this.storeOptions, newValue, this.nodeValue);
    this.loadData();
  }
}
