import EmberRouter from '@ember/routing/router';
import config from 'frontend-meldingsplichtige-api/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('mock-login');

  this.route('route-not-found', {
    path: '/*wildcard',
  });
  this.route('login');

  this.route('forms', function () {
    this.route('edit', { path: '/:id' });
    this.route('new');
  });
});
