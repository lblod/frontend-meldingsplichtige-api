import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MockLoginRoute extends Route {
  queryParams = {
    page: {
      refreshModel: true,
    },
  };
  @service session;
  @service store;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  model(params) {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (params.gemeente) filter.gebruiker = { achternaam: params.gemeente };
    return this.store.query('account', {
      include: 'gebruiker.bestuurseenheden',
      filter: filter,
      page: { size: 10, number: params.page },
      sort: 'gebruiker.achternaam',
    });
  }

  @action
  async loading(transition) {
    const controller = this.controllerFor('mock-login');
    controller.set('isLoading', true);
    transition.promise.finally(function () {
      controller.set('isLoading', false);
    });
  }
}
