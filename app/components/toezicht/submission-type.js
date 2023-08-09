import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task, all } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const CONCEPT_SCHEME_REGULATION_TYPE =
  'http://lblod.data.gift/concept-schemes/c93ccd41-aee7-488f-86d3-038de890d05a';
const CONCEPT_SCHEME_DECISION_TYPE =
  'https://data.vlaanderen.be/id/conceptscheme/BesluitType';
const CONCEPT_SCHEME_DOCUMENT_TYPE =
  'https://data.vlaanderen.be/id/conceptscheme/BesluitDocumentType';

export default class ToezichtSubmissionTypeComponent extends Component {
  @service store;

  @tracked decisionType;
  @tracked regulationType;

  loadData = task({ keepLatest: true }, async () => {
    const formData = await this.args.formData;

    if (formData) {
      const concepts = await formData.types;
      return all(concepts.map((c) => this.updateSubmissionType.perform(c)));
    }
  });

  updateSubmissionType = task(async (concept) => {
    const topConceptSchemes = await concept.topConceptSchemes;
    const topConceptSchemeUris = topConceptSchemes.map((cs) => cs.uri);
    const isTopConcept =
      topConceptSchemeUris.includes(CONCEPT_SCHEME_DECISION_TYPE) ||
      topConceptSchemeUris.includes(CONCEPT_SCHEME_DOCUMENT_TYPE);
    if (isTopConcept) this.decisionType = concept;

    const conceptSchemes = await concept.conceptSchemes;
    const conceptSchemeUris = conceptSchemes.map((cs) => cs.uri);
    if (conceptSchemeUris.includes(CONCEPT_SCHEME_REGULATION_TYPE))
      this.regulationType = concept;
  });
}
