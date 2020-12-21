import Model, { attr } from '@ember-data/model';

export default class TaxRateModel extends Model {
  @attr('number') amount;
}
