import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { validateForm }  from '../../utils/import-triples-for-form';
import importTriplesForForm from '../../utils/import-triples-for-form';
import { delGraphFor, addGraphFor } from '../../utils/forking-store';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import { reads } from '@ember/object/computed';

const CONCEPT_STATUS = 'http://lblod.data.gift/concepts/79a52da4-f491-4e2f-9374-89a13cde8ecd';

export default class FormsNewController extends Controller {
  @service
  currentSession;

  @service
  router;

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

  async createSubmission(){
    const organization = await this.currentSession.group;
    const status = (await this.store.query('submission-document-status', {'filter[:uri:]': CONCEPT_STATUS})).firstObject;
    const submission = await this.store.createRecord('submission', {organization, status});
    await submission.save();
    return submission;
  }

  async createSubmissionForm(submission, subject){
    await fetch(`/submission-forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json'},
      body: JSON.stringify(
        {
          submission: submission.uri,
          subject: subject,
          ...this.formStore.serializeDataWithAddAndDelGraph(this.graphs.sourceGraph)
        }
      )
    });
  }

  async submitSubmissionForm(submissionDocument){
    await fetch(`/submission-forms/${submissionDocument.id}/submit`, {
       method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json'}
    });
  }

  @action
  setTriplesForTables(){
    this.datasetTriples = importTriplesForForm(this.form, { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore });
    this.addedTriples = this.formStore.match(undefined, undefined, undefined, addGraphFor(this.graphs.sourceGraph));
    this.removedTriples = this.formStore.match(undefined, undefined, undefined, delGraphFor(this.graphs.sourceGraph));
  }

  @action
  async save(){
    const submission = await this.createSubmission();
    await this.createSubmissionForm(submission, this.sourceNode.value);
    this.router.transitionTo('forms.edit', submission.get('id'));
  }

  @action
  async submit(){
    const options = { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore};
    const isValid = validateForm(this.form, options);
    if(!isValid){
      alert('Gelieve het formulier correct in te vullen');
    }
    else{
      const submission = await this.createSubmission();
      await this.createSubmissionForm(submission);
      const submissionDocument = await submission.submittedResource;
      await this.submitSubmissionForm(submissionDocument);
      this.router.transitionTo('forms.edit', submission.get('id'));
    }
  }
}
