import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath, validationResultsForField } from '../../../../utils/import-triples-for-form';
import { RDF, FORM, SKOS, FOAF } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';

export default class FormInputFieldsConceptSchemeSelectorEditComponent extends Component {
  @tracked
  selected = null;

  @tracked
  options = [];

  @tracked
  errors = [];

  storeOptions = {};

  @action
  loadData(){
    //constructor ...kinda

    //this is passed to validations
    this.storeOptions = {
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph,
      metaGraph: this.args.graphs.metaGraph,
      store: this.args.formStore,
      path: this.args.field.rdflibPath
    };
    this.loadOptions();
    this.loadValidations();
    if(this.errors.length == 0){
      //do something if validated
    }
    else{
      //do something if validation fails
    }
  }

  loadOptions(){
    //Selects all options that match the concept scheme from the codelist
    this.options = this.args.formStore
      .match( undefined,
              SKOS('inScheme'),
              //should there be an attr in the form graph?
              new rdflib.namedNode('https://data.vlaanderen.be/id/conceptscheme/BesluitDocumentType'),
              this.args.graphs.metaGraph)
      .map(s => {
        const label = this.args.formStore.any(s.subject, SKOS('prefLabel'), undefined, this.args.graphs.metaGraph);
        return { subject: s.subject, label: label && label.value };
      });
  }

  loadValidations(){
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  @action
  updateSelection(option){
    //Do something @onChange
    this.selected=option;
  }

}

