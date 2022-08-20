import Route from '@ember/routing/route';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service currentSession;
  @service session;
  @service router;

  async beforeModel() {
    await this.session.setup();
    return this.loadCurrentSession();
  }

  sessionInvalidated() {
    this.router.transitionTo('login');
  }

  loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });
  }
}
