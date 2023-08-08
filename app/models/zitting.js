import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ZittingModel extends Model {
  @attr('datetime') gestartOpTijdstip;

  @belongsTo('bestuursorgaan', {
    async: true,
    inverse: null,
  })
  bestuursorgaan;

  @hasMany('agendapunt', {
    async: true,
    inverse: null,
  })
  agendapunten;
}
