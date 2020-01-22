import Route from '@ember/routing/route';
import form from '../../utils/besluitenlijst-formulier';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';
import documentTypeCodelist from '../../utils/codelist/document-type';
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

    const formGraph = new rdflib.NamedNode("http://mu.semte.ch/form");
    const sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/meldingsplicht/bestuurseenheid/${this.bestuurseenheid.id}/id/${uuidv4()}`);
    const metaGraph = new rdflib.NamedNode("http://mu.semte.ch/metagraph");
    controller.graphs = { formGraph, sourceGraph, metaGraph  };

    //TODO: how do i get this
    controller.sourceNode =new rdflib.NamedNode("http://data.lblod.info/forms/meldingsplicht/208ee6e0-28b1-11ea-972c-8915ff690069");;
    controller.formStore.parse(model.form, formGraph, "text/turtle");
    controller.formStore.parse(documentTypeCodelist, metaGraph, "text/turtle");

    controller.form = controller.formStore.any(undefined, RDF("type"), FORM("Form"), formGraph);

  }

}
