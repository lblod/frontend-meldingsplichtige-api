import Model, { attr, hasMany } from '@ember-data/model';

export default class ConceptSchemeModel extends Model {
  @attr uri;

  @hasMany('concept', {
    async: true,
    inverse: null,
  })
  concepts;
  @hasMany('concept', {
    async: true,
    inverse: null,
  })
  topConcepts;
}
