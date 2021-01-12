import Model, { attr, belongsTo, hasMany }  from '@ember-data/model';

export default class ZittingModel extends Model {
  @attr('datetime') gestartOpTijdstip;
  @belongsTo('bestuursorgaan') bestuursorgaan;
  @hasMany('agendapunt') agendapuntens;
}

