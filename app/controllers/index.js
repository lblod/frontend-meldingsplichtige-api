import Controller from '@ember/controller';

export default class IndexController extends Controller {
  page = 0;
  size = 10;
  sort = 'status.label,-sent-date,-modified';
}
