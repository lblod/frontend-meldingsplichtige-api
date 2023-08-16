import Model, { attr, belongsTo } from '@ember-data/model';

export default class JobModel extends Model {
  @attr('datetime') created;
  //Not in model (domain.lisp):
  @belongsTo('submission', {
    async: true,
    inverse: 'job',
  })
  submission;
}
