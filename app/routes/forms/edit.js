import Route from '@ember/routing/route';
import dilbeek from '../../utils/dilbeek';
import form from '../../utils/besluitenlijst-formulier';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';
import documentTypeCodelist from '../../utils/codelist/document-type';
import fetch from 'fetch';

export default class FormsEditRoute extends Route {

  async model(params){
    const response = await fetch(`/submission-forms/${params.id}`);
    if(response.status !== 200 ){
      return { form, formData: dilbeek, disclaimer: 'Geen form gevonden, een voorbeeld wordt getoond!' };
    }
    else{
      const formData = await response.json();
      return { form, formData: formData.source, id: params.id };
    }
  }

  setupController(controller, model){
    super.setupController(controller, model);

    controller.formStore = new forkingStore();

    const formGraph = new rdflib.NamedNode("http://mu.semte.ch/form");
    const sourceGraph = new rdflib.NamedNode(`http://mu.semte.ch/${model.id}`);
    const metaGraph = new rdflib.NamedNode("http://mu.semte.ch/metagraph");
    controller.graphs = { formGraph, sourceGraph, metaGraph  };

    //TODO: how do i get this
    controller.sourceNode = new rdflib.NamedNode("http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069");

    controller.formStore.parse(model.formData, sourceGraph, "text/turtle");
    controller.formStore.parse(model.form, formGraph, "text/turtle");
    controller.formStore.parse(documentTypeCodelist, metaGraph, "text/turtle");

    controller.form = controller.formStore.any(undefined, RDF("type"), FORM("Form"), formGraph);

  }
}
