import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  beschrijving: attr('string'),
  geplandOpenbaar: attr('boolean'),
  titel: attr('string'),
  type: attr('uri-set'),
  vorigeAgendapunt: belongsTo('agendapunt'),
  behandeling: belongsTo('behandeling-van-agendapunt'),
  referenties: hasMany('agendapunt')
});
