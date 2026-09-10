import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';

export default class SessionService extends BaseSessionService {
  @service currentSession;

  async handleAuthentication(routeAfterAuthentication) {
    await this.currentSession.load();
    super.handleAuthentication(routeAfterAuthentication);
  }
}
