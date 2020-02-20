import Route from '@ember/routing/route';
import rdflib from 'ember-rdflib';
import { RDF, FORM } from '../../utils/namespaces';
import uuidv4 from 'uuid/v4';
import { inject as service } from '@ember/service';

export default class FormsNewRoute extends Route {
  @service currentSession;

  async model(){
    const bestuurseenheid = await this.currentSession.group;
    const { formGraph, metaGraph, form, formStore } = this.modelFor('forms');
    const sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/meldingsplicht/bestuurseenheid/${bestuurseenheid.id}/id/${uuidv4()}`);
    const sourceNode = new rdflib.NamedNode(`http://data.lblod.info/forms/meldingsplicht/${uuidv4()}`);
    const graphs = { formGraph, metaGraph, sourceGraph };

    formStore.addAll([{ subject: sourceNode, predicate: RDF('type'), object: FORM('ManualFormSolution'), graph: sourceGraph }]);

    return { form,
             formStore,
             graphs,
             sourceNode
           };
  }
}
