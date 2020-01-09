import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  naam: attr('string'),
  alternatieveNaam: attr('string-set'),
  classificatie: belongsTo('bestuurseenheid-classificatie-code'),
  bestuursorganens: hasMany('bestuursorgaan')
});
