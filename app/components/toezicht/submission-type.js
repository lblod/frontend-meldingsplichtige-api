import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { all } from 'ember-concurrency';
import { task, keepLatestTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

const CONCEPT_SCHEME_REGULATION_TYPE = 'http://lblod.data.gift/concept-schemes/c93ccd41-aee7-488f-86d3-038de890d05a';
const CONCEPT_SCHEME_SUBMISSION_TYPE = 'http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5';

export default class ToezichtSubmissionTypeComponent extends Component {
  @service store

  @tracked decisionType
  @tracked regulationType

  @keepLatestTask
  *loadData() {
    const formData = yield this.args.formData;

    if (formData) {
      const concepts = yield formData.types;
      yield all(concepts.map(c => this.updateSubmissionType.perform(c)));
    }
  }

  @task
  *updateSubmissionType(concept) {
    const conceptSchemes = yield concept.conceptSchemes;
    const conceptSchemeUris = conceptSchemes.map(cs => cs.uri);

    if (conceptSchemeUris.includes(CONCEPT_SCHEME_SUBMISSION_TYPE))
      this.decisionType = concept;

    if (conceptSchemeUris.includes(CONCEPT_SCHEME_REGULATION_TYPE))
      this.regulationType = concept;
  }
}
