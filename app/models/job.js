import Model, { attr, belongsTo } from '@ember-data/model';

export default class JobModel extends Model {
  @attr('datetime') created;
  @belongsTo('submission') submission;
}
