import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service currentSession;
  page = 0;
  size = 10;
  sort = 'status.label,-sent-date,-modified';
}
