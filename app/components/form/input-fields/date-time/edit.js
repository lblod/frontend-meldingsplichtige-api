import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {
  triplesForPath,
  validationResultsForField,
  updateSimpleFormValue
} from '../../../../utils/import-triples-for-form';
import { XSD } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';

export default class FormInputFieldsDateTimeEditComponent extends Component {
  @tracked
  value = null;

  @tracked
  hour = null;

  @tracked
  minutes = null;

  @tracked
  nodeValue = null;

  @tracked
  errors = [];

  @tracked
  storeOptions = {};

  @action
  loadData() {
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

  loadValidations() {
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    if (matches.values.length > 0) {
      this.nodeValue = matches.values[0];
      let datobj = new Date(this.nodeValue.value);
      this.value = datobj;
      this.hour = datobj.getHours();
      this.minutes = datobj.getMinutes();
    }
  }

  @action
  updateValue() {
    if (this.value) {
      this.value.setHours(this.hour, this.minutes, null, null);
    }
    const newValue = rdflib.literal(this.value.toISOString(), XSD('dateTime'));
    updateSimpleFormValue(this.storeOptions, newValue, this.nodeValue);
  }
}
