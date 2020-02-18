import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath,
         validationResultsForField,
         addSimpleFormValue} from '../../../../utils/import-triples-for-form';
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
    //this is passed to validations and other util functions
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
      //do something if validated scraped
      this.selectValidValue();
    }
  }

  loadOptions(){
    //Selects all options that match the concept scheme from the form turtle
    const conceptScheme=JSON.parse(this.args.field.options).conceptScheme
    this.options = this.args.formStore
      .match( undefined,
              SKOS('inScheme'),
              new rdflib.namedNode(conceptScheme),
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
    this.errors=[];
    //debugger;
    //addSimpleFormValue(option.subject, this.storeOptions);
  }

  @action
  selectValidValue(){
    const match = triplesForPath(this.storeOptions, true).values;
    if (match.length==1){
      this.selected=this.options.find((e)=>{
        return e.subject.value==match[0].value;
      });
    }

  }

}

