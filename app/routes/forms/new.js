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

  model(){
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
