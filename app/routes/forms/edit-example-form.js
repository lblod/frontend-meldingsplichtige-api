import Route from '@ember/routing/route';
import dilbeek from '../../utils/dilbeek';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';
import codeLists from '../../utils/codelist/codelists';

//TODO: clean up
export default class FormsEditExampleFormRoute extends Route {

  async model(){
    const { formGraph, metaGraph, form } = this.modelFor('forms');

    let sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/dilbeek`);
    let graphs = { formGraph, sourceGraph, metaGraph };
    let model = { form,
                  formData: dilbeek,
                  graphs: graphs,
                  sourceNode: new rdflib.NamedNode("http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069"),
                  disclaimer: 'Sample form'
                  };
    return model;
  }
  setupController(controller, model){
    super.setupController(controller, model);

    controller.formStore = new forkingStore();
    controller.graphs = model.graphs;

    controller.sourceNode = model.sourceNode;
    controller.formStore.parse(model.formData, model.graphs.sourceGraph, "text/turtle");
    controller.formStore.parse(model.form, model.graphs.formGraph, "text/turtle");
    controller.formStore.parse(codeLists, model.graphs.metaGraph, "text/turtle");

    controller.form = controller.formStore.any(undefined, RDF("type"), FORM("Form"), model.graphs.formGraph);

  }
}
