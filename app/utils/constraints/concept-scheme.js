import { FORM, SKOS } from '../namespaces';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';

export default function conceptSchemeValidation(values, options){
  //TODO: ASSUMES BAG MATCHING, FIX PLEASE
  if (values.length > 1){
    return false;
  }

  const { constraintUri, store, metaGraph } = options;

  const conceptSchemeUri = store.match( constraintUri, FORM("conceptScheme"), undefined)[0].object;

  const matchingValues = store.match( values[0], SKOS("inScheme"), conceptSchemeUri, metaGraph).length;

  return matchingValues == 1;
}
