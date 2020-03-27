import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import InputFieldComponent from './input-field';
import { triplesForPath, validationResultsForField } from '../../../utils/import-triples-for-form';

export default class SimpleValueInputFieldComponent extends InputFieldComponent {
  @tracked value = null
  @tracked nodeValue = null
  @tracked errors = []

  @action
  loadData(){
    this.loadValidations();
    this.loadProvidedValue();
  }

  loadValidations(){
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions)
      .filter(r => !r.valid);
  }

  loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);
    if (matches.values.length > 0) {
      this.nodeValue = matches.values[0];
      this.value = matches.values[0].value;
    }
  }
}
