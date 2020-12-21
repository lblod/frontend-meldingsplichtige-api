import Model, { attr, hasMany } from '@ember-data/model';

export default class GebruikerModel extends Model {
  @attr('string') voornaam;
  @attr('string') achternaam;
  @attr('string') rijksregisterNummer;
  @hasMany('account') accounts;
  @hasMany('bestuurseenheid') bestuurseenheden;

  get group() {
    return this.bestuurseenheden.firstObject;
   } // used for mock login

  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }

}

