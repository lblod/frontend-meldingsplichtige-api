import Model, { attr, hasMany } from '@ember-data/model';

export default class ConceptsModel extends Model {
  @hasMany("concept-schemes") conceptSchemes;
  @attr label;
}
