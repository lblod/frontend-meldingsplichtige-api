import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import InputFieldComponent from './input-field';
import { triplesForPath, validationResultsForField } from '../../../utils/import-triples-for-form';

export default class SimpleValueInputFieldComponent extends InputFieldComponent {
  @tracked value = null
  @tracked nodeValue = null
  @tracked validations = []

  get errors() {
    return this.validations.filter(r => !r.valid);
  }

  get isRequired() {
    return this.validations.any(v => v.validationType == 'http://lblod.data.gift/vocabularies/forms/RequiredConstraint');
  }

  @action
  loadData(){
    this.loadValidations();
    this.loadProvidedValue();
  }

  loadValidations(){
    this.validations = validationResultsForField(this.args.field.uri, this.storeOptions);
  }

  loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);
    if (matches.values.length > 0) {
      this.nodeValue = matches.values[0];
      this.value = matches.values[0].value;
    }
  }
}
