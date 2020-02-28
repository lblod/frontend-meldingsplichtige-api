import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { RDF, FORM } from '../utils/namespaces';
import forkingStore from '../utils/forking-store';
import rdflib from 'ember-rdflib';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  currentSession: service(),

  async getCodelistsTtl(){
    const response = await fetch(`/semantic-forms-data/codelists.ttl`);
    return response.text();
  },

  async getFormTtl(){
    const response = await fetch(`/semantic-forms-data/form.ttl`);
    return response.text();
  },

  /*
   * For displaying purposes to the end user,
   * we remove type dossiers which are not relevant to bestuurseenheid.
   * This is not equal to validation!
   */
  async cleanupFormStoreFromNonRelevenatTypeDossiers(formStore, metaGraph){
    const bestuurseenheid = await this.currentSession.group;
    const classificatie = await bestuurseenheid.classificatie;

    const classificatieUri = new rdflib.NamedNode(classificatie.uri);
    const decidableBy = new rdflib.NamedNode('http://lblod.data.gift/vocabularies/besluit/decidableBy');
    const inScheme = new rdflib.NamedNode('http://www.w3.org/2004/02/skos/core#inScheme');
    const typeDossierScheme = new rdflib.NamedNode('http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5');

    const typeDossiersForEenheid = formStore
          .match(undefined, decidableBy, classificatieUri, metaGraph)
          .filter(t => formStore.any(t.subject, inScheme, typeDossierScheme, metaGraph)); //In case usage of decidableBy changes;
    const typeDossiers = formStore.match(undefined, inScheme, typeDossierScheme, metaGraph);

    const dossiersToRemove = typeDossiers.filter(t => !typeDossiersForEenheid.any(td => td.subject.equals(t.subject)));
    formStore.removeStatements( dossiersToRemove );
  },

  async model(){
    const codeListsTtl = await this.getCodelistsTtl();
    const formTtl = await this.getFormTtl();
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");
    const formStore = new forkingStore();
    formStore.parse(codeListsTtl, metaGraph, "text/turtle");
    formStore.parse(formTtl, formGraph, "text/turtle");

    await this.cleanupFormStoreFromNonRelevenatTypeDossiers(formStore, metaGraph);
    const form = formStore.any(undefined, RDF("type"), FORM("Form"), formGraph);
    return { formGraph, metaGraph, form, formStore };
  }
});
