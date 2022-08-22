import Model, { attr, hasMany } from '@ember-data/model';

export default class VendorModel extends Model {
  @attr name;
  @attr key;
  @hasMany('bestuurseenheid') canActOnBehalfOf;
}
