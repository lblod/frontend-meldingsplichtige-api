import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class AgendapuntModel extends Model {
  @attr('string') beschrijving;
  @attr('boolean') geplandOpenbaar;
  @attr('string') titel; 
  @attr('uri-set') type; 
  @belongsTo('agendapunt') vorigeAgendapunt; 
  @belongsTo('behandeling-van-agendapunt') behandeling;
  @hasMany('agendapunt') referenties;
}
