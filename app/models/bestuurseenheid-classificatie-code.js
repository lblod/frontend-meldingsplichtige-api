import Model, { attr } from '@ember-data/model';

export default class BestuurseenheidClassificatieCodeModel extends Model {
  @attr('string') uri;
  @attr('string') label;
  @attr('string') scopeNote;
}
