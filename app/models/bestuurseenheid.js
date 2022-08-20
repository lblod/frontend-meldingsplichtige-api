import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr() uri;
  @attr('string') naam;
  @attr() alternatieveNaam;
  @belongsTo('bestuurseenheid-classificatie-code') classificatie;
  @hasMany('bestuursorgaan') bestuursorganens;
}
