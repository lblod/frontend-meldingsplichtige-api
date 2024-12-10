/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import DataTableRouteMixin from 'ember-data-table/mixins/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route.extend(DataTableRouteMixin) {
  @service session;
  @service store;
  modelName = 'submission';

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  mergeQueryOptions() {
    return {
      'filter[status][id]': [
        '79a52da4-f491-4e2f-9374-89a13cde8ecd', // Concept status
        '9bd8d86d-bb10-4456-a84e-91e9507c374c', // Sent status
      ].join(','),
      include: [
        'form-data',
        'form-data.passed-by',
        'form-data.passed-by.is-tijdsspecialisatie-van',
        'form-data.types',
        'job',
        'creator',
        'status',
        'last-modifier',
      ].join(','),
    };
  }
}
