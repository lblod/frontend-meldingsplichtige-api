import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  filename: attr('string'),
  format: attr('string'),
  size: attr('number'),
  extension: attr('string'),
  created: attr('datetime'),
  download: belongsTo('file')
});
