import { FORM, SKOS } from '../namespaces';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';

export default function conceptSchemeValidation(values, options){

  const { constraintUri, store, metaGraph } = options;

  const conceptSchemeUri = store.match( constraintUri, FORM("conceptScheme"), undefined)[0].object;

  debugger;

  const matchingValues = store.match( values, SKOS("inScheme"), conceptSchemeUri, metaGraph).length;

  return matchingValues >= 1;
}
