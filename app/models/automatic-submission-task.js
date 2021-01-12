import Model, { attr, belongsTo } from '@ember-data/model';

export default class AutomaticSubmissionTaskModel extends Model {
  @attr() created;
  @belongsTo('submission') submission;
}
