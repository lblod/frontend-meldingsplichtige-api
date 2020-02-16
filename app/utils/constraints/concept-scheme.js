import { FORM, SKOS } from '../namespaces';
import forkingStore from '../../utils/forking-store';
import rdflib from 'ember-rdflib';

export default function conceptSchemeValidation(values, options){

  //return true;

  //TODO: FIX THIS ONCE THE GROWN UPS HAVE SPOKEN

  const { constraintUri, store, metaGraph } = options;

  const conceptSchemeUri = store.match( constraintUri, FORM("conceptScheme"), undefined, metaGraph );

  const matchingValues =
      values
      .filter( (value) => {
        const matchCount =
              store
              //this is where we check if a definition is part of a scheme
              .match( value, SKOS("inScheme"), conceptSchemeUri, codelistGraph )
              .length;
        return matchCount >= 1;
      });
  return matchingValues.length == 1;
}
