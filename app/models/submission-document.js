import Model, { attr, belongsTo } from '@ember-data/model';

export default class SubmissionDocumentModel extends Model {
  @attr() uri;
  @belongsTo('submission') submission;
}
