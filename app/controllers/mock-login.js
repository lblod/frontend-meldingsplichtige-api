import Controller from '@ember/controller';
import { task, timeout, restartableTask } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MockLoginController extends Controller {
  queryParams = ['gemeente', 'page'];
  @tracked gemeente = '';
  @tracked page = 0;
  @tracked size = 10;
  @service store;
  @tracked isLoading = false;

  @task
  *queryStore() {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (this.gemeente) filter.gebruiker = { achternaam: this.gemeente };
    const accounts = yield this.store.query('account', {
      include: 'gebruiker,gebruiker.bestuurseenheden',
      filter: filter,
      page: { size: this.size, number: this.page },
      sort: 'gebruiker.achternaam',
    });
    return accounts;
  }

  @restartableTask
  *updateSearch(value) {
    yield timeout(500);
    this.page = 0;
    this.gemeente = value;
    this.model = yield this.queryStore.perform();
  }

  @action
  async login(loginF, account) {
    const accountId = account.id;
    const gebruiker = account.gebruiker;
    const bestuurseenheden = await gebruiker.get('bestuurseenheden');
    const group = await bestuurseenheden[0];
    const groupId = await group.id;
    return loginF(accountId, groupId);
  }
}
