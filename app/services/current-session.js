import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;
  @tracked account;
  @tracked user;
  @tracked roles;
  @tracked group;

  async load() {
    if (this.session.isAuthenticated) {
      this.account = await this.store.findRecord(
        'account',
        this.session.data.authenticated.relationships.account.data.id
      );
      this.user = await this.account.gebruiker;
      this.group = await this.store.find(
        'bestuurseenheid',
        this.session.data.authenticated.relationships.group.data.id
      );
      this.roles = this.session.data.authenticated.data.attributes.roles;

      this.canAccessToezicht = this.canAccess('LoketLB-toezichtGebruiker');
      this.canAccessBbcdr = this.canAccess('LoketLB-bbcdrGebruiker');
      this.canAccessMandaat = this.canAccess('LoketLB-mandaatGebruiker');
      this.canAccessBerichten = this.canAccess('LoketLB-berichtenGebruiker');
      this.canAccessLeidinggevenden = this.canAccess(
        'LoketLB-leidinggevendenGebruiker'
      );
      this.canAccessPersoneelsbeheer = this.canAccess(
        'LoketLB-personeelsbeheer'
      );
      this.canAccessSubsidies = this.canAccess('LoketLB-subsidies');
    }
  }

  canAccess(role) {
    return this.roles.includes(role);
  }

  async ensureLoaded() {
    if (!(this.user && this.group)) {
      return await this.load();
    }
  }
}
