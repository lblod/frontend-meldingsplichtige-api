import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  provider: attr(),
  voId: attr(),
  gebruiker: belongsTo('gebruiker')
});