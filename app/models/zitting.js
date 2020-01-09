import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  gestartOpTijdstip: attr('datetime'),
  bestuursorgaan: belongsTo('bestuursorgaan'),
  agendapuntens: hasMany('agendapunt')
});
