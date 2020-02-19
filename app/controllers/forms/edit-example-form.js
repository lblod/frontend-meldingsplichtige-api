import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { validateForm }  from '../../utils/import-triples-for-form';
import importTriplesForForm from '../../utils/import-triples-for-form';
import { delGraphFor, addGraphFor } from '../../utils/forking-store';
import fetch from 'fetch';
import { reads } from '@ember/object/computed';

export default class FormsEditExampleFormController extends Controller {
  @reads('model.formStore')
  formStore;

  @reads('model.graphs')
  graphs;

  @reads('model.sourceNode')
  sourceNode;

  @reads('model.form')
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
  async send(){
    const options = { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore};
    const isValid = validateForm(this.form, options);
    if(!isValid){
      alert('Gelieve het formulier correct in te vullen');
    }
    else {
      alert('Dummy submitted!');
    }
  }
}
