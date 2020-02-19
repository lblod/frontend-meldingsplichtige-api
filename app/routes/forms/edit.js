import Route from '@ember/routing/route';
import dilbeek from '../../utils/dilbeek';
import form from '../../utils/besluitenlijst-formulier';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';

import codeLists from '../../utils/codelist/codelists';

import fetch from 'fetch';

const VERSTUURD_URI = 'http://lblod.data.gift/concepts/9bd8d86d-bb10-4456-a84e-91e9507c374c';

//TODO: clean up
export default class FormsEditRoute extends Route {

  async model(params){
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");

    const submission = await this.store.find('submission', params.id);
    const submissionDocument = await submission.submittedResource;
    const submissionStatus = await submission.status;

    let graphs = { formGraph, metaGraph };
    let sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/submission-document/data/${submissionDocument.id}`);
    graphs = { formGraph, sourceGraph, metaGraph };
    const response = await fetch(`/submission-forms/${submissionDocument.id}`);

    const formData = await response.json();
    return { form,
             additions: formData.additions,
             removals: formData.removals,
             formData: formData.source,
             graphs,
             sourceNode: new rdflib.NamedNode(submissionDocument.uri),
             submissionDocument,
             submitted: submissionStatus.uri === VERSTUURD_URI
           };
  }

  setupController(controller, model){
    super.setupController(controller, model);

    controller.formStore = new forkingStore();
    controller.graphs = model.graphs;

    controller.sourceNode = model.sourceNode;

    if(model.removals || model.additions){
      controller.formStore.loadDataWithAddAndDelGraph(model.formData,
                                                      model.graphs.sourceGraph,
                                                      model.additions,
                                                      model.removals,
                                                      "text/turtle");
      controller.formStore.parse(model.formData, model.graphs.sourceGraph, "text/turtle");
    }
    else {
      controller.formStore.parse(model.formData, model.graphs.sourceGraph, "text/turtle");
    }
    controller.formStore.parse(model.form, model.graphs.formGraph, "text/turtle");
    controller.formStore.parse(codeLists, model.graphs.metaGraph, "text/turtle");

    controller.form = controller.formStore.any(undefined, RDF("type"), FORM("Form"), model.graphs.formGraph);

  }
}
