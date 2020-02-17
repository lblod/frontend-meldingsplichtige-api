import Component from '@glimmer/component';
import {action, set} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {reads, empty, not} from '@ember/object/computed';
import {
  triplesForPath,
  addSimpleFormValue,
  removeSimpleFormValue,
  validationResultsForField,
  validationResultsForFieldPart
} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsVlabelOpcentiemEditComponent extends Component {

  @tracked
  fields = [];

  @empty('fields')
  differentiatie;

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

  loadValidations() {
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);

    for (let triple of matches.triples) {

      const errors = validationResultsForFieldPart(
        {values: [triple.object]},
        this.args.field.uri,
        this.storeOptions).filter(r => !r.valid);

      this.fields.pushObject({value: {taxRate: triple.object.value}, errors});
    }
  }

  // TODO should be worked out
  @action
  toggleDiff(event) {
    event.preventDefault();
    this.differentiatie = !this.differentiatie;
  }

  @action
  create() {
    this.fields.pushObject({value: {taxRate: ""}, errors: []});
  }

  @action
  update(field, newValue) {
    removeSimpleFormValue(field.value.taxRate, this.storeOptions);
    set(field, 'value.taxRate', newValue.trim());
    addSimpleFormValue(newValue.trim(), this.storeOptions);
  }

  @action
  delete(field) {
    removeSimpleFormValue(field.value.taxRate.trim(), this.storeOptions);
  }
}
