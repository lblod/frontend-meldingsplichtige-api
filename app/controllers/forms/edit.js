import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  importTriplesForForm,
  validateForm,
  delGraphFor,
  addGraphFor,
} from '@lblod/ember-submission-form-fields';
import fetch from 'fetch';
import { DELETED_STATUS } from '../../models/submission-document-status';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class FormsEditController extends Controller {
  @service currentSession;
  @service store;
  @service toaster;

  @tracked formVisible = true;
  @tracked triplesVisible = false;

  @tracked datasetTriples = [];
  @tracked addedTriples = [];
  @tracked removedTriples = [];
  @tracked forceShowErrors = false;

  deletedStatus;

  constructor() {
    super(...arguments);
    this.ensureDeletedStatus();
  }

  reset() {
    this.formVisible = true;
    this.triplesVisible = false;
  }

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

  async ensureDeletedStatus() {
    this.deletedStatus = (
      await this.store.query('submission-document-status', {
        page: { size: 1 },
        'filter[:uri:]': DELETED_STATUS,
      })
    ).firstObject;
  }

  @action
  registerObserver() {
    this.formStore.registerObserver(() => {
      this.setTriplesForTables();
    });
  }

  @action
  setTriplesForTables() {
    this.datasetTriples = importTriplesForForm(this.form, {
      ...this.graphs,
      sourceNode: this.sourceNode,
      store: this.formStore,
    });
    this.addedTriples = this.formStore.match(
      undefined,
      undefined,
      undefined,
      addGraphFor(this.graphs.sourceGraph)
    );
    this.removedTriples = this.formStore.match(
      undefined,
      undefined,
      undefined,
      delGraphFor(this.graphs.sourceGraph)
    );
  }

  @task
  *saveSubmissionForm() {
    yield fetch(`/submission-forms/${this.model.submissionDocument.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        ...this.formStore.serializeDataWithAddAndDelGraph(
          this.graphs.sourceGraph
        ),
      }),
    });
    yield fetch(
      `/submission-forms/${this.model.submissionDocument.id}/flatten`,
      {
        method: 'PUT',
      }
    );

    // Since the form data and related entities are not updated via ember-data
    // we need to manually reload those to keep the index page up-to-date
    const formData = yield this.model.submission.belongsTo('formData').reload();
    yield formData.hasMany('types').reload();
    yield formData.belongsTo('passedBy').reload();
  }

  @task
  *submitSubmissionForm() {
    yield fetch(
      `/submission-forms/${this.model.submissionDocument.id}/submit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/vnd.api+json' },
      }
    );
    // Since the sent date and sent status of the submission will be set by the backend
    // and not via ember-data, we need to manually reload the submission record
    // to keep the index page up-to-date
    const submission = yield this.model.submission.reload();
    yield submission.belongsTo('status').reload();
  }

  @task
  *deleteSubmission() {
    yield fetch(`/submissions/${this.model.submission.id}`, {
      method: 'DELETE',
    });
  }

  @task
  *delete() {
    this.toaster.notify('Het dossier wordt verwijderd...', 'Verwijderen', {
      icon: 'three-dots',
      timeOut: '5000',
      closable: true,
    });
    yield this.deleteSubmission.perform();
    this.toaster.success(
      'Het dossier werd successvol verwijderd',
      'Verwijderd',
      { icon: 'check', timeOut: '10000', closable: true }
    );
    this.transitionToRoute('index');
  }

  @task
  *save() {
    this.toaster.notify('Het dossier wordt opgeslagen...', 'Opslaan', {
      icon: 'three-dots',
      timeOut: '5000',
      closable: true,
    });

    yield this.saveSubmissionForm.perform();

    const user = yield this.currentSession.user;
    this.model.submission.modified = new Date();
    this.model.submission.lastModifier = user;
    yield this.model.submission.save();

    this.toaster.success(
      'Het dossier werd successvol opgeslagen',
      'Opgeslagen',
      { icon: 'check', timeOut: '10000', closable: true }
    );
  }

  @task
  *submit() {
    this.toaster.notify('Het dossier wordt verzonden...', 'Verzenden', {
      icon: 'three-dots',
      timeOut: '5000',
      closable: true,
    });
    const options = {
      ...this.graphs,
      sourceNode: this.sourceNode,
      store: this.formStore,
    };
    const isValid = validateForm(this.form, options);
    if (!isValid) {
      this.toaster.error(
        'Kan dossier niet versturen door ontbrekende of foutief ingevulde velden.',
        'Kan dossier niet versturen',
        {
          icon: 'cross',
          timeOut: undefined,
          closable: true,
        }
      );
      this.forceShowErrors = true;
    } else {
      yield this.saveSubmissionForm.perform();
      yield this.submitSubmissionForm.perform();
      this.toaster.success(
        'Het dossier werd successvol verzonden',
        'Verzonden',
        { icon: 'check', timeOut: '10000', closable: true }
      );
      this.transitionToRoute('index');
    }
  }

  @action
  showForm() {
    this.formVisible = true;
    this.triplesVisible = false;
  }

  @action
  showTriples() {
    this.formVisible = false;
    this.triplesVisible = true;
  }
}
