import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  voornaam: attr('string'),
  achternaam: attr('string'),
  rijksregisterNummer: attr('string'),
  accounts: hasMany('account'),
  bestuurseenheden: hasMany('bestuurseenheid'),
  group: computed('bestuurseenheden', function () {
    return this.get('bestuurseenheden.firstObject');
  }), // used for mock login
  fullName: computed('voornaam', 'achternaam', function() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  })
});
