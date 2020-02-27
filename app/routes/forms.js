import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { RDF, FORM } from '../utils/namespaces';
import forkingStore from '../utils/forking-store';
import rdflib from 'ember-rdflib';
import fetch from 'fetch';

export default Route.extend(AuthenticatedRouteMixin, {
  async getCodelistsTtl(){
    const response = await fetch(`/semantic-forms-data/codelists.ttl`);
    return response.text();
  },

  async getFormTtl(){
    const response = await fetch(`/semantic-forms-data/form.ttl`);
    return response.text();
  },

  async model(){
    const codeListsTtl = await this.getCodelistsTtl();
    const formTtl = await this.getFormTtl();
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");
    const formStore = new forkingStore();
    formStore.parse(codeListsTtl, metaGraph, "text/turtle");
    formStore.parse(formTtl, formGraph, "text/turtle");
    const form = formStore.any(undefined, RDF("type"), FORM("Form"), formGraph);
    return { formGraph, metaGraph, form, formStore };
  }
});
