import Route from '@ember/routing/route';
import dilbeek from '../../utils/dilbeek';
import form from '../../utils/besluitenlijst-formulier';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';
import documentTypeCodelist from '../../utils/codelist/document-type';
import fetch from 'fetch';

//TODO: clean
export default class FormsEditRoute extends Route {

  async model(params){
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/${params.id}`); //TODO: not correct
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");
    const graphs = { formGraph, sourceGraph, metaGraph  };

    const response = await fetch(`/submission-forms/${params.id}`);
    if(response.status !== 200 ){
      //example form
      return { form,
               formData: dilbeek,
               graphs: graphs,
               sourceNode: new rdflib.NamedNode("http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069"),
               disclaimer: 'Geen form gevonden, een voorbeeld wordt getoond!',
               id: params.id };
    }
    else{
      const formData = await response.json();
      return { form, formData: formData.source, id: params.id, graphs, sourceNode: null };
    }
  }

  setupController(controller, model){
    super.setupController(controller, model);

    controller.formStore = new forkingStore();
    controller.graphs = model.graphs;

    //TODO: how do i get this
    controller.sourceNode = model.sourceNode;

    controller.formStore.parse(model.formData, model.graphs.sourceGraph, "text/turtle");
    controller.formStore.parse(model.form, model.graphs.formGraph, "text/turtle");
    controller.formStore.parse(documentTypeCodelist, model.graphs.metaGraph, "text/turtle");

    controller.form = controller.formStore.any(undefined, RDF("type"), FORM("Form"), model.graphs.formGraph);

  }
}
