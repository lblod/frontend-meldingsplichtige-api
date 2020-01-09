import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  openbaar: attr('boolean'),
  gevolg: attr('language-string'),
  vorigeBehandelingVanAgendapunt: belongsTo('behandeling-van-agendapunt'),
  onderwerp: belongsTo('agendapunt'),
  submissionDocuments: hasMany('submission-document')
});
