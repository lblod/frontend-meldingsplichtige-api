import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BestuursorgaanModel extends Model {
  @attr uri;
  @attr naam;
  @attr('date') bindingEinde;
  @attr('date') bindingStart;
  @belongsTo('bestuurseenheid') bestuurseenheid;
  @belongsTo('bestuursorgaan-classificatie-code') classificatie;
  @belongsTo('bestuursorgaan', { inverse: 'heeftTijdsspecialisaties' })
  isTijdsspecialisatieVan;
  @hasMany('bestuursorgaan', { inverse: 'isTijdsspecialisatieVan' })
  heeftTijdsspecialisaties;
}
