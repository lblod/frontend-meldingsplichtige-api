import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class BestuurseenheidModel extends Model {
  @attr uri;
  @attr naam;
  @attr alternatieveNaam;
  @belongsTo('bestuurseenheid-classificatie-code') classificatie;
  @hasMany('bestuursorgaan') bestuursorganen;
  @hasMany('vendor') vendors;
}
