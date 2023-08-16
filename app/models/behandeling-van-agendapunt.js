import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BehandelingVanAgendapuntModel extends Model {
  @attr('boolean') openbaar;
  @attr('language-string') gevolg;

  @belongsTo('behandeling-van-agendapunt', {
    async: true,
    inverse: null,
  })
  vorigeBehandelingVanAgendapunt;
  @belongsTo('agendapunt', {
    async: true,
    inverse: 'behandeling',
  })
  onderwerp;

  @hasMany('submission-document', {
    async: true,
    inverse: null,
  })
  submissionDocuments;
}
