import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { validateForm }  from '../../utils/import-triples-for-form';
import importTriplesForForm from '../../utils/import-triples-for-form';

export default class FormsNewController extends Controller {
  @tracked
  formStore;

  @tracked
  graphs;

  @tracked
  sourceNode;

  @tracked
  form;

  @tracked
  datasetTriples = [];

  @action
  registerObserver(){
    this.formStore.registerObserver(() => {
      this.setTriplesForTable();
    });
  }

  @action
  setTriplesForTable(){
    this.datasetTriples = importTriplesForForm(this.form, { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore });
  }

  @action
  send(){
    const options = { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore};
    const isValid = validateForm(this.form, options);
    alert(isValid);
  }
}
