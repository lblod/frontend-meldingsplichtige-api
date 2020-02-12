import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { oneWay, reads, empty, not} from '@ember/object/computed';
import { triplesForPath, validationResultsForField, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';

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


  @action
  toggleDiff(event) {
    event.preventDefault();
    console.log("toggled diff");
    this.differentiatie = !this.differentiatie;
  }

  @action
  create(){
    console.log("create clicked");
    this.taxRates.pushObject("");
  }

  @action
  delete(value) {
    console.log("delete clicked with value:");
    console.log(value);
  }
}
