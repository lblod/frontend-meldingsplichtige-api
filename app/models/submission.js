import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  uri: attr(),
  href: attr(),
  organization: belongsTo('bestuurseenheid'),
  publisher: belongsTo('vendor'),
  submissionDocument: belongsTo('submission-document'),
  status: belongsTo('submission-document-status'),
  files: hasMany('file'),
  task: belongsTo('automatic-submission-task')
});
