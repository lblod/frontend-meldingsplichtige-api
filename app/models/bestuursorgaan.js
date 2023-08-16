import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BestuursorgaanModel extends Model {
  @attr uri;
  @attr naam;
  @attr('date') bindingEinde;
  @attr('date') bindingStart;

  @belongsTo('bestuurseenheid', {
    async: true,
    inverse: 'bestuursorganen',
  })
  bestuurseenheid;
  @belongsTo('bestuursorgaan-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;
  @belongsTo('bestuursorgaan', {
    async: true,
    inverse: 'heeftTijdsspecialisaties',
  })
  isTijdsspecialisatieVan;
  @hasMany('bestuursorgaan', {
    async: true,
    inverse: 'isTijdsspecialisatieVan',
  })
  heeftTijdsspecialisaties;
}
