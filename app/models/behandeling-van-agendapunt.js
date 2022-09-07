import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BehandelingVanAgendapuntModel extends Model {
  @attr('boolean') openbaar;
  @attr('language-string') gevolg;
  @belongsTo('behandeling-van-agendapunt') vorigeBehandelingVanAgendapunt;
  @belongsTo('agendapunt') onderwerp;
  @hasMany('submission-document') submissionDocuments;
}
