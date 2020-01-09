import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  href: attr(),
  organization: belongsTo('bestuurseenheid'),
  publisher: belongsTo('vendor'),
  submittedResource: belongsTo('submission-document'),
  status: belongsTo('submission-document-status'),
  files: hasMany('file')
});
