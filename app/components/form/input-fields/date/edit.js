import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath, validationResultsForField, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';
import { reads } from '@ember/object/computed';
import rdflib from 'ember-rdflib';
import { XSD } from '../../../../utils/namespaces';

export default class FormInputFieldsDateEditComponent extends Component {
  @tracked
  value = null;

  @tracked
  nodeValue = null;

  @tracked
  errors = [];

  @tracked
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
    if(matches.values.length > 0){
      this.value = matches.values[0].value;
      this.nodeValue = matches.values[0];
    }
  }

  @action
  updateValue(newValue){
    let dateString = null;
    if(newValue != null) {
      dateString = newValue.toISOString().split("T")[0];
    }
    const newDate = rdflib.literal(dateString, XSD('date'));
    updateSimpleFormValue(this.storeOptions, newDate, this.nodeValue);
  }
}
