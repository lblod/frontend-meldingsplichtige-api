import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  naam: attr('string'),
  bindingEinde: attr('date'),
  bindingStart: attr('date'),
  bestuurseenheid: belongsTo('bestuurseenheid'),
  classificatie: belongsTo('bestuursorgaan-classificatie-code'),
  isTijdsspecialisatieVan: belongsTo('bestuursorgaan'),
  heeftTijdsspecialisaties: hasMany('bestuursorgaan')
});
