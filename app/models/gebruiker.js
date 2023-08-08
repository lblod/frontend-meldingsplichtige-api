import Model, { attr, hasMany } from '@ember-data/model';

export default class GebruikerModel extends Model {
  @attr voornaam;
  @attr achternaam;
  @attr rijksregisterNummer;

  @hasMany('account', {
    async: true,
    inverse: 'gebruiker',
  })
  accounts;
  @hasMany('bestuurseenheid', {
    async: true,
    inverse: null,
  })
  bestuurseenheden;

  get group() {
    return this.bestuurseenheden.firstObject;
  } // used for mock login

  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }
}
