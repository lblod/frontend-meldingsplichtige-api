import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { validateForm }  from '../../utils/import-triples-for-form';
import importTriplesForForm from '../../utils/import-triples-for-form';
import { delGraphFor, addGraphFor } from '../../utils/forking-store';

export default class FormsEditController extends Controller {
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

  @tracked
  addedTriples = [];

  @tracked
  removedTriples = [];

  @action
  registerObserver(){
    this.formStore.registerObserver(() => {
      this.setTriplesForTables();
    });
  }

  @action
  setTriplesForTables(){
    this.datasetTriples = importTriplesForForm(this.form, { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore });
    this.addedTriples = this.formStore.match(undefined, undefined, undefined, addGraphFor(this.graphs.sourceGraph));
    this.removedTriples = this.formStore.match(undefined, undefined, undefined, delGraphFor(this.graphs.sourceGraph));
  }

  @action
  send(){
    const options = { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore};
    const isValid = validateForm(this.form, options);
    alert(isValid);
  }
}
