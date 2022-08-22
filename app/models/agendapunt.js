import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AgendapuntModel extends Model {
  @attr beschrijving;
  @attr('boolean') geplandOpenbaar;
  @attr titel;
  @attr('uri-set') type;
  @belongsTo('agendapunt') vorigeAgendapunt;
  @belongsTo('behandeling-van-agendapunt') behandeling;
  @hasMany('agendapunt') referenties;
}
