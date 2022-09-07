import { inject as service } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';

export default class LoketSessionService extends SessionService {
  @service currentSession;

  handleAuthentication(routeAfterAuthentication) {
    super.handleAuthentication(routeAfterAuthentication);
    this.currentSession.load();
  }
}
