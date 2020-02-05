import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath, validationResultsForField, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsDateEditComponent extends Component {
  @tracked
  value = null;

  @tracked
  errors = [];

  @tracked
  storeOptions = {};

  @action
  loadData(){
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

  loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);
    if(matches.values.length > 0)
      this.value = matches.values[0].value;
  }

  @action
  updateValue(){
    // Cutting of the time because we don't need it.
    console.log(this.value);
    // this.value.value = this.value.value.split("T")[0];
    updateSimpleFormValue(this.value, this.storeOptions);
  }
}
