import Route from '@ember/routing/route';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service currentSession;
  @service session;
  @service router;
  @service intl;

  async beforeModel() {
    const userLocale = navigator.language || navigator.languages[0];
    this.intl.setLocale([userLocale, 'nl-BE']);
    await this.session.setup();
    return this.loadCurrentSession();
  }

  loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });
  }
}
