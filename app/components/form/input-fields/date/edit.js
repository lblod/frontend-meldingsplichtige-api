import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath, validationResultsForField, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';
import rdflib from 'ember-rdflib';

export default class FormInputFieldsDateEditComponent extends Component {
  @tracked
  value = null;

  @tracked
  errors = [];

  storeOptions = {};

  @action
  loadData(){
    this.storeOptions = {
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph,
      metaGraph: this.args.graphs.metaGraph,
      store: this.args.formStore,
      path: this.args.field.rdflibPath
    };

    this.loadValidations();
    this.loadProvidedValue();
  }

  loadValidations(){
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);
    if(matches.values.length > 0)
      this.value = matches.values[0].value;
  }


  lastPathElemnt(path){
    if(path.termType == "NamedNode"){
      return path;
    }
    return path.elements.slice[-1][0];
  }

  @action
  updateValue(e){
    e.preventDefault();
    updateSimpleFormValue(this.value, this.storeOptions);
  }
}