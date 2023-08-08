import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr uri;
  @attr naam;
  @attr alternatieveNaam;

  @belongsTo('bestuurseenheid-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;

  @hasMany('bestuursorgaan', {
    async: true,
    inverse: 'bestuurseenheid',
  })
  bestuursorganen;
  @hasMany('vendor', {
    async: true,
    inverse: 'canActOnBehalfOf',
  })
  vendors;
}
