import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { validateForm }  from '../../utils/import-triples-for-form';
import importTriplesForForm from '../../utils/import-triples-for-form';
import { delGraphFor, addGraphFor } from '../../utils/forking-store';
import fetch from 'fetch';
import { reads } from '@ember/object/computed';
import { DELETED_STATUS } from '../../models/submission-document-status';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class FormsEditController extends Controller {
  @service currentSession

  get formStore() {
    return this.model.formStore;
  }

  get graphs() {
    return this.model.graphs;
  }

  get sourceNode() {
    return this.model.sourceNode;
  }

  get form() {
    return this.model.form;
  }

  @tracked datasetTriples = []

  @tracked addedTriples = []

  @tracked removedTriples = []

  @action
  registerObserver() {
    this.formStore.registerObserver(() => {
      this.setTriplesForTables();
    });
  }

  @action
  setTriplesForTables() {
    this.datasetTriples = importTriplesForForm(this.form, { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore });
    this.addedTriples = this.formStore.match(undefined, undefined, undefined, addGraphFor(this.graphs.sourceGraph));
    this.removedTriples = this.formStore.match(undefined, undefined, undefined, delGraphFor(this.graphs.sourceGraph));
  }

  @task
  *saveSubmissionForm() {
    yield fetch(`/submission-forms/${this.model.submissionDocument.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json'},
      body: JSON.stringify(
        {
          ...this.formStore.serializeDataWithAddAndDelGraph(this.graphs.sourceGraph)
        }
      )
    });
    yield fetch(`/submission-forms/${this.model.submissionDocument.id}/flatten`, {
      method: 'PUT'
    });

    // Since the form data and related entities are not updated via ember-data
    // we need to manually reload those to keep the index page up-to-date
    const formData = yield this.model.submission.formData.reload();
    yield formData.hasMany('types').reload();
    yield formData.belongsTo('passedBy').reload();
  }

  @task
  *submitSubmissionForm() {
    yield fetch(`/submission-forms/${this.model.submissionDocument.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json'}
    });
    // Since the sent date and sent status of the submission will be set by the backend
    // and not via ember-data, we need to manually reload the submission record
    // to keep the index page up-to-date
    const submission = yield this.model.submission.reload();
    yield submission.belongsTo('status').reload();
  }

  @task
  *deleteSubmissionForm() {
    yield fetch(`/submission-forms/${this.model.submissionDocument.id}`, {
      method: 'DELETE',
    });
  }

  @task
  *delete() {
    const deletedStatus = (yield this.store.query('submission-document-status', {
      page: { size: 1 },
      'filter[:uri:]': DELETED_STATUS
    })).firstObject;
    const user = yield this.currentSession.user;

    this.model.submission.status = deletedStatus;
    this.model.submission.modified = new Date();
    this.model.submission.lastModifier = user;

    yield this.model.submission.save();

    yield this.deleteSubmissionForm.perform();
    this.transitionToRoute('index');
  }

  @task
  *save() {
    yield this.saveSubmissionForm.perform();

    const user = yield this.currentSession.user;
    this.model.submission.modified = new Date();
    this.model.submission.lastModifier = user;
    yield this.model.submission.save();
  }

  @task
  *submit() {
    const options = { ...this.graphs, sourceNode: this.sourceNode, store: this.formStore};
    const isValid = validateForm(this.form, options);
    if (!isValid) {
      alert('Gelieve het formulier correct in te vullen');
    }
    else {
      yield this.saveSubmissionForm.perform();
      yield this.submitSubmissionForm.perform();
      this.transitionToRoute('index');
    }
  }
}
