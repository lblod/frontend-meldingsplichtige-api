import Route from '@ember/routing/route';
import { warn } from '@ember/debug';
import rdflib from 'ember-rdflib';
import fetch from 'fetch';
import forkingStore from '../../utils/forking-store';
import { SENT_STATUS } from '../../models/submission-document-status';
import { RDF, FORM } from '../../utils/namespaces';

export default class FormsEditRoute extends Route {
  async model(params) {
    // Fetch data from backend

    const submission = await this.store.find('submission', params.id);
    const submissionDocument = await submission.submissionDocument;
    const submissionStatus = await submission.status;

    if (!submissionDocument) {
      warn('No submission document, Transitioning to index.');
      this.transitionTo('index');
    }

    const response = await fetch(`/submission-forms/${submissionDocument.id}`);
    const { source, additions, removals, meta, form } = await response.json();

    // Prepare data in forking store

    const formStore = new forkingStore();

    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");
    formStore.parse(meta, metaGraph, "text/turtle");
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    formStore.parse(form, formGraph, "text/turtle");

    const sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/submission-document/data/${submissionDocument.id}`);
    if (removals || additions){
      formStore.loadDataWithAddAndDelGraph(source, sourceGraph, additions, removals, "text/turtle");
    }
    else {
      formStore.parse(source, sourceGraph, "text/turtle");
    }

    const graphs = { formGraph, sourceGraph, metaGraph };
    const formNode = formStore.any(undefined, RDF("type"), FORM("Form"), formGraph);

    return { form: formNode,
             formStore,
             graphs,
             sourceNode: new rdflib.NamedNode(submissionDocument.uri),
             submission,
             submissionDocument,
             submitted: submissionStatus.uri === SENT_STATUS
           };
  }

  /*
   * For displaying purposes to the end user,
   * we remove type dossiers which are not relevant to bestuurseenheid.
   * This is not equal to validation!
   */
  async afterModel(model) {
    const bestuurseenheid = await model.submission.organization;
    const classificatie = await bestuurseenheid.classificatie;

    const classificatieUri = new rdflib.NamedNode(classificatie.uri);
    const decidableBy = new rdflib.NamedNode('http://lblod.data.gift/vocabularies/besluit/decidableBy');
    const inScheme = new rdflib.NamedNode('http://www.w3.org/2004/02/skos/core#inScheme');
    const typeDossierScheme = new rdflib.NamedNode('http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5');

    const formStore = model.formStore;
    const metaGraph = model.graphs.metaGraph;
    const typeDossiersForEenheid = formStore
          .match(undefined, decidableBy, classificatieUri, metaGraph)
          .filter(t => formStore.any(t.subject, inScheme, typeDossierScheme, metaGraph)); //In case usage of decidableBy changes;
    const typeDossiers = formStore.match(undefined, inScheme, typeDossierScheme, metaGraph);

    const dossiersToRemove = typeDossiers.filter(t => !typeDossiersForEenheid.any(td => td.subject.equals(t.subject)));
    formStore.removeStatements( dossiersToRemove );
  }
}
