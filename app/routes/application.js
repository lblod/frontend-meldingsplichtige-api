import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'frontend-meldingsplichtige-api/config/environment';
import { warn } from '@ember/debug';

export default Route.extend(ApplicationRouteMixin, {

  sessionInvalidated() {
    const logoutUrl = ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'];
    if (logoutUrl.startsWith('http')) {
      window.location.replace(logoutUrl);
    }
    else {
      warn('Incorrect logout URL configured', { id: 'session-invalidation-failure' });
    }
  },

});
