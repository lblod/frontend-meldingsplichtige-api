import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { oneWay, reads, empty, not} from '@ember/object/computed';
import {
  triplesForPath,
  validationResultsForField,
  removeSimpleFormValue,
  addSimpleFormValue
} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsVlabelOpcentiemEditComponent extends Component {

  @tracked
  differentiatie;

  @tracked
  taxRates = [];

  @empty('taxRates')
  taxRatesEmpty;

  @not('differentiatie')
  showTable;

  @reads('taxRatesEmpty')
  showDifferentiatie;

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

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    if (matches.values.length > 0) {
      for (let taxRate of matches.values) {
        this.taxRates.pushObject(taxRate.value.trim());
      }
    }
  }

  @action
  toggleDiff(event) {
    event.preventDefault();
    this.differentiatie = !this.differentiatie;
  }

  @action
  create(){
    this.taxRates.pushObject("");
  }

  @action
  update(prev, value) {
    removeSimpleFormValue(prev, this.storeOptions);
    addSimpleFormValue(value, this.storeOptions);
  }

  @action
  delete(value) {
    removeSimpleFormValue(value, this.storeOptions);
  }
}
