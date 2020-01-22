import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { validateForm }  from '../../utils/import-triples-for-form';

export default class FormsNewController extends Controller {
  @tracked
  formStore;

  @tracked
  graphs;

  @tracked
  sourceNode;

  @tracked
  form;

  @action
  send(){
    const options = { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore};
    const isValid = validateForm(this.form, options);
    alert(isValid);
  }
}
