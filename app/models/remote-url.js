import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  uri: attr(),
  address: attr(),
  created: attr('date'),
  modified: attr('date'),
  replicatedFile: belongsTo('file'),
  downloadStatus: belongsTo('file-download-status'),
  creator: belongsTo('service-agent')
});
