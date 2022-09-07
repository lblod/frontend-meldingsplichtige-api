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
  @service router;
  @service toaster;
  @service intl;

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
    this.toaster.notify(
      this.intl.t('edit.toast.delete'),
      this.intl.t('edit.toast.delete-title'),
      {
        icon: 'three-dots',
        timeOut: '5000',
        closable: true,
      }
    );
    yield this.deleteSubmission.perform();
    this.toaster.success(
      this.intl.t('edit.toast.delete-success'),
      this.intl.t('edit.toast.delete-success-title'),
      { icon: 'check', timeOut: '10000', closable: true }
    );
    this.router.transitionTo('index');
  }

  @task
  *save() {
    this.toaster.notify(
      this.intl.t('edit.toast.save'),
      this.intl.t('edit.toast.save-title'),
      {
        icon: 'three-dots',
        timeOut: '5000',
        closable: true,
      }
    );

    yield this.saveSubmissionForm.perform();

    const user = yield this.currentSession.user;
    this.model.submission.modified = new Date();
    this.model.submission.lastModifier = user;
    yield this.model.submission.save();

    this.toaster.success(
      this.intl.t('edit.toast.save-success'),
      this.intl.t('edit.toast.save-success-title'),
      { icon: 'check', timeOut: '10000', closable: true }
    );
  }

  @task
  *submit() {
    this.toaster.notify(
      this.intl.t('edit.toast.send'),
      this.intl.t('edit.toast.send-title'),
      {
        icon: 'three-dots',
        timeOut: '5000',
        closable: true,
      }
    );
    const options = {
      ...this.graphs,
      sourceNode: this.sourceNode,
      store: this.formStore,
    };
    const isValid = validateForm(this.form, options);
    if (!isValid) {
      this.toaster.error(
        this.intl.t('edit.toast.send-fail'),
        this.intl.t('edit.toast.send-fail-title'),
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
        this.intl.t('edit.toast.send-success'),
        this.intl.t('edit.toast.send-success-title'),
        { icon: 'check', timeOut: '10000', closable: true }
      );
      this.router.transitionTo('index');
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
