import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'frontend-meldingsplichtige-api/config/environment';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  currentSession: service(),

  beforeModel() {
    return this._loadCurrentSession();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentSession();
  },

  sessionInvalidated() {
    const logoutUrl = ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'];
    if (logoutUrl.startsWith('http')) {
      window.location.replace(logoutUrl);
    }
    else {
      warn('Incorrect logout URL configured', { id: 'session-invalidation-failure' });
    }
  },

  _loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });
  }
});
