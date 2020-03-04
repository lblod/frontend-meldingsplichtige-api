import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { CONCEPT_STATUS } from '../../models/submission-document-status';

export default class FormsNewRoute extends Route {
  @service currentSession

  async beforeModel() {
    const conceptStatuses = await this.store.query('submission-document-status', {
      page: { size: 1 },
      'filter[:uri:]': CONCEPT_STATUS
    });

    if (conceptStatuses.length)
      this.conceptStatus = conceptStatuses.firstObject;
  }

  async model() {
    const bestuurseenheid = await this.currentSession.group;

    const submissionDocument = this.store.createRecord('submissionDocument', {});
    await submissionDocument.save();
    const submission = this.store.createRecord('submission', {
      organization: bestuurseenheid,
      status: this.conceptStatus,
      submissionDocument
    });
    await submission.save();

    return submission;
  }

  afterModel(model) {
    this.transitionTo('forms.edit', model.id);
  }
}
