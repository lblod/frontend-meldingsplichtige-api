import Model, { attr,hasMany } from '@ember-data/model';

export default class ConceptSchemesModel extends Model {
  @hasMany('concepts') concepts;
  @attr uuid;
}
