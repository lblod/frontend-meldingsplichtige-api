import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import formTtl from '../utils/form';
import codeLists from '../utils/codelist/codelists';
import { RDF, FORM } from '../utils/namespaces';
import forkingStore from '../utils/forking-store';
import rdflib from 'ember-rdflib';

export default Route.extend(AuthenticatedRouteMixin, {

  model(){
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");
    const formStore = new forkingStore();
    formStore.parse(codeLists, metaGraph, "text/turtle");
    formStore.parse(formTtl, formGraph, "text/turtle");
    const form = formStore.any(undefined, RDF("type"), FORM("Form"), formGraph);
    return { formGraph, metaGraph, form, formStore };
  }
});
