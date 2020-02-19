import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import form from '../utils/besluitenlijst-formulier';
import rdflib from 'ember-rdflib';

export default Route.extend(AuthenticatedRouteMixin, {

  model(){
    const formGraph = new rdflib.NamedNode("http://data.lblod.info/form");
    const metaGraph = new rdflib.NamedNode("http://data.lblod.info/metagraph");
    return { formGraph, metaGraph, form };
  }
});
