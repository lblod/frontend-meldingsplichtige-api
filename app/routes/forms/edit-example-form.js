import Route from '@ember/routing/route';
import dilbeek from '../../utils/dilbeek';
import rdflib from 'ember-rdflib';

export default class FormsEditExampleFormRoute extends Route {

  async model(){
    const { formGraph, metaGraph, form, formStore } = this.modelFor('forms');

    const sourceGraph = new rdflib.NamedNode(`http://data.lblod.info/dilbeek`);
    const graphs = { formGraph, sourceGraph, metaGraph };
    formStore.parse(dilbeek, sourceGraph, "text/turtle");

    return { form,
             formStore,
             graphs,
             sourceNode: new rdflib.NamedNode("http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069"),
             disclaimer: 'Sample form'
           };
  }
}
