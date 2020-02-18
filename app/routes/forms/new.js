import Route from '@ember/routing/route';
import form from '../../utils/besluitenlijst-formulier';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';

import codeLists from '../../utils/codelist/codelists';

import uuidv4 from 'uuid/v4';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FormsNewRoute extends Route {
  @service currentSession;

  @tracked
  bestuurseenheid;

  async beforeModel(){
    this.bestuurseenheid = await this.currentSession.group;
  }

  async model(){
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");

    const submission = await this.store.createRecord('submission', params.id);
    const submissionDocument = await submission.submittedResource;


    //default form
    let sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/dilbeek`);
    let graphs = { formGraph, sourceGraph, metaGraph };
    let model = { form,
                  formData: dilbeek,
                  graphs: graphs,
                  sourceNode: new rdflib.NamedNode("http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069"),
                  disclaimer: 'Geen form gevonden, een voorbeeld wordt getoond!'
                  };

    if(!submissionDocument){
      return model;
    }

    else{
      sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/submission-document/data/${submissionDocument.id}`);
      graphs = { formGraph, sourceGraph, metaGraph };
      const response = await fetch(`/submission-forms/${submissionDocument.id}`);
      if(response.status !== 200){
        return model;
      }
      const formData = await response.json();
      return { form,
               additions: formData.additions,
               removals: formData.removals,
               formData: formData.source,
               graphs,
               sourceNode: new rdflib.NamedNode(submissionDocument.uri),
               submissionDocument
             };
    }
    return { form };
  }

  setupController(controller, model){

    super.setupController(controller, model);

    controller.formStore = new forkingStore();

    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/meldingsplicht/bestuurseenheid/${this.bestuurseenheid.id}/id/${uuidv4()}`);
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");
    controller.graphs = { formGraph, sourceGraph, metaGraph  };

    //TODO: how do i get this
    const sourceNode = new rdflib.NamedNode(`http://data.lblod.info/forms/meldingsplicht/${uuidv4()}`);
    controller.sourceNode = sourceNode;
    controller.formStore.addAll([{ subject: sourceNode, predicate: RDF('type'), object: FORM('ManualFormSolution'), graph: sourceGraph }]);
    controller.formStore.parse(model.form, formGraph, "text/turtle");

    controller.formStore.parse(codeLists, metaGraph, "text/turtle");

    controller.form = controller.formStore.any(undefined, RDF("type"), FORM("Form"), formGraph);

  }

}
