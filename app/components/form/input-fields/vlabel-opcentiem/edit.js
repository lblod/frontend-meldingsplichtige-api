import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { oneWay, reads, empty, not} from '@ember/object/computed';
import { triplesForPath, validationResultsForField, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsVlabelOpcentiemEditComponent extends Component {

  @tracked
  taxRates = [];

  @empty('taxRates')
  taxRatesEmpty;

  @reads('taxRatesEmpty')
  showDifferentiatie;

}
