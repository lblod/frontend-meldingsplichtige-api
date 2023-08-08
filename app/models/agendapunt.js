import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AgendapuntModel extends Model {
  @attr beschrijving;
  @attr('boolean') geplandOpenbaar;
  @attr titel;
  @attr('uri-set') type;

  @belongsTo('agendapunt', {
    async: true,
    inverse: null,
  })
  vorigeAgendapunt;
  @belongsTo('behandeling-van-agendapunt', {
    async: true,
    inverse: 'onderwerp',
  })
  behandeling;

  @hasMany('agendapunt', {
    async: true,
    inverse: 'vorigeAgendapunt',
  })
  referenties;
}
