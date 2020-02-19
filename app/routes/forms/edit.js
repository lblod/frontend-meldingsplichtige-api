import Route from '@ember/routing/route';
import rdflib from 'ember-rdflib';
import fetch from 'fetch';

const VERSTUURD_URI = 'http://lblod.data.gift/concepts/9bd8d86d-bb10-4456-a84e-91e9507c374c';

export default class FormsEditRoute extends Route {

  async model(params){
    const { formGraph, metaGraph, form, formStore } = this.modelFor('forms');

    const submission = await this.store.find('submission', params.id);
    const submissionDocument = await submission.submittedResource;
    const submissionStatus = await submission.status;

    const sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/submission-document/data/${submissionDocument.id}`);
    const graphs = { formGraph, sourceGraph, metaGraph };
    const response = await fetch(`/submission-forms/${submissionDocument.id}`);

    const {source, additions, removals } = await response.json();

    if(removals || additions){
      formStore.loadDataWithAddAndDelGraph(source, sourceGraph, additions,  removals, "text/turtle");
    }
    else {
      formStore.parse(source, sourceGraph, "text/turtle");
    }

    return { form,
             formStore,
             graphs,
             sourceNode: new rdflib.NamedNode(submissionDocument.uri),
             submissionDocument,
             submitted: submissionStatus.uri === VERSTUURD_URI
           };
  }
}
