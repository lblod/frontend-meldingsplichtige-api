import Model, { attr } from '@ember-data/model';

export default class BestuursorgaanClassificatieCodeModel extends Model {
  @attr('string') label;
  @attr('string') scopeNote;
}

