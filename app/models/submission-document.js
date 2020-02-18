import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  uri: attr(),
  //TODO: not entirly clear what the added value of the model now
  files: belongsTo('file')
});
