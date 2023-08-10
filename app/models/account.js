import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr provider;
  @attr voId;

  @belongsTo('gebruiker', {
    async: true,
    inverse: 'accounts',
  })
  gebruiker;
}
