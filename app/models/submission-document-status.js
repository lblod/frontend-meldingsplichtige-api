import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  uri: attr(),
  label: attr('string')
});
