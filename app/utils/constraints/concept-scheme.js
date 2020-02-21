import { FORM, SKOS } from '../namespaces';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';

export default function conceptSchemeValidation(values, options){
  //TODO: ASSUMES BAG MATCHING, FIX PLEASE
  const { constraintUri, store, metaGraph } = options;

  const matchingType = store.match( constraintUri, FORM("grouping"), undefined)[0].object.value;

  if(matchingType == 'http://lblod.data.gift/vocabularies/forms/Bag'){

    console.log('matching type is bag');

    const conceptSchemeUri = store.match( constraintUri, FORM("conceptScheme"), undefined)[0].object;
    const matchingValues = values.filter( value => store.any( value, SKOS("inScheme"), conceptSchemeUri, metaGraph));
    return matchingValues.length == 1;
  }
  else{
    console.log('matching type for concept scheme selector is not form:Bag, please change that');
    return false;
  }
}
