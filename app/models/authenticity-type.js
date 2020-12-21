import Model, { attr } from '@ember-data/model';

export default class AuthenticityTypeModel extends Model {
  @attr('string') label;
}

