import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr provider;
  @attr voId;

  @belongsTo('gebruiker', {
    async: false,
    inverse: 'accounts',
  })
  gebruiker;
}
