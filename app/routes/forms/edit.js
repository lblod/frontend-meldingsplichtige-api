import Route from '@ember/routing/route';
import dilbeek from '../../utils/dilbeek';
import form from '../../utils/besluitenlijst-formulier';
import forkingStore from '../../utils/forking-store';

export default class FormsEditRoute extends Route {
  model(){
    return {form, formData: dilbeek};
  }
  setupController(controller, model){
    super.setupController(controller, model);
    controller.set('formStore', new forkingStore());
  }
}
