import Route from '@ember/routing/route';
import dilbeek from '../../utils/dilbeek';
import form from '../../utils/besluitenlijst-formulier';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';
import codeLists from '../../utils/codelist/codelists';
import fetch from 'fetch';

//TODO: clean up
export default class FormsEditExampleFormRoute extends Route {

  async model(params){
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");

    // const submission = await this.store.find('submission', params.id);
    // const submissionDocument = await submission.submittedResource;


    //default form
    let sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/dilbeek`);
    let graphs = { formGraph, sourceGraph, metaGraph };
    let model = { form,
                  formData: dilbeek,
                  graphs: graphs,
                  sourceNode: new rdflib.NamedNode("http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069"),
                  disclaimer: 'Sample form'
                  };
    return model;
    // if(!submissionDocument){
    //   return model;
    // }

  //   else{
  //     sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/submission-document/data/${submissionDocument.id}`);
  //     graphs = { formGraph, sourceGraph, metaGraph };
  //     const response = await fetch(`/submission-forms/${submissionDocument.id}`);
  //     if(response.status !== 200){
  //       return model;
  //     }
  //     const formData = await response.json();
  //     return { form,
  //              additions: formData.additions,
  //              removals: formData.removals,
  //              formData: formData.source,
  //              graphs,
  //              sourceNode: new rdflib.NamedNode(submissionDocument.uri),
  //              submissionDocument
  //            };
  //   }
  // }
  }
  setupController(controller, model){
    super.setupController(controller, model);

    controller.formStore = new forkingStore();
    controller.graphs = model.graphs;

    controller.sourceNode = model.sourceNode;

    // if(model.removals || model.additions){
    //   controller.formStore.loadDataWithAddAndDelGraph(model.formData,
    //                                                   model.graphs.sourceGraph,
    //                                                   model.additions,
    //                                                   model.removals,
    //                                                   "text/turtle");
    //   controller.formStore.parse(model.formData, model.graphs.sourceGraph, "text/turtle");
    // }
    // else {
    //   controller.formStore.parse(model.formData, model.graphs.sourceGraph, "text/turtle");
    // }
    controller.formStore.parse(model.formData, model.graphs.sourceGraph, "text/turtle");
    controller.formStore.parse(model.form, model.graphs.formGraph, "text/turtle");
    controller.formStore.parse(codeLists, model.graphs.metaGraph, "text/turtle");

    controller.form = controller.formStore.any(undefined, RDF("type"), FORM("Form"), model.graphs.formGraph);

  }
}
