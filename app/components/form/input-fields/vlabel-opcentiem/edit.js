import Component from '@glimmer/component';
import {action, set} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { computed } from '@ember/object';
import { empty } from '@ember/object/computed';
import {
  triplesForPath,
  validationResultsForField
} from '../../../../utils/import-triples-for-form';
import rdflib from 'ember-rdflib';
import uuidv4 from 'uuid/v4';
import { RDF, XSD } from '../../../../utils/namespaces';

const uriTemplate = 'http://data.lblod.info/tax-rates';
const lblodBesluit = `http://lblod.data.gift/vocabularies/besluit`;

const TaxRateType = new rdflib.NamedNode(`${lblodBesluit}/TaxRate`);
const hasAdditionalTaxRate = new rdflib.NamedNode(`${lblodBesluit}/hasAdditionalTaxRate`);
const schemaPrice = new rdflib.NamedNode(`http://schema.org/price`);
const taxRate = new rdflib.NamedNode(`${lblodBesluit}/taxRate`);

export default class FormInputFieldsVlabelOpcentiemEditComponent extends Component {

  @tracked
  fields = [];

  @tracked
  differentiatie;

  @empty('fields')
  taxRatesEmpty;

  @computed('differentiatie', 'errors')
  get showTable(){
    return !this.differentiatie || this.errors.length > 0;
  }

  @computed('taxRatesEmpty', 'errors')
  get showDifferentiatie(){
    return this.taxRatesEmpty || this.errors.length > 0;
  }

  @tracked
  errors = [];

  @tracked
  storeOptions = {};

  constructor() {
    super(...arguments);
    this.differentiatie = false;
  }

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
    const triples =  matches.triples;

    if(triples.length){
      this.taxRateSubject = triples[0].object; //assuming only one per form

      const prices = matches.values;

      for (let price of prices) {
        const errors = [];

        this.fields.pushObject({value: {taxRate: price.value}, errors});
      }
    }

    const statements = this.storeOptions.store.match(this.storeOptions.sourceNode,
                                                     hasAdditionalTaxRate,
                                                     undefined,
                                                     this.storeOptions.sourceGraph);
    if(statements.length > 0){
      this.differentiatie = statements[0].object.value == "1"; //There is a bug in conversion from rdflib
    }
  }

  @action
  toggleDifferentiatie(event) {
    event.preventDefault();
    this.differentiatie = !this.differentiatie;

    if(this.differentiatie && this.hasTaxRate()){
       this.removeTaxRate();
    }

    this.updateAdditionalTaxRate(this.differentiatie);
  }

  updateAdditionalTaxRate(newValue){
    const statements = this.storeOptions.store.match(this.storeOptions.sourceNode,
                                                     hasAdditionalTaxRate,
                                                     undefined,
                                                     this.storeOptions.sourceGraph);
    this.storeOptions.store.removeStatements(statements);

    this.storeOptions.store.addAll([ {
      subject: this.storeOptions.sourceNode,
      predicate: hasAdditionalTaxRate,
      object: newValue,
      graph: this.storeOptions.sourceGraph
    }]);
  }

  createTaxRate(){
    this.taxRateSubject = new rdflib.NamedNode(`${uriTemplate}/${uuidv4()}`);
    const triples = [ { subject: this.taxRateSubject, predicate: RDF('type'), object: TaxRateType, graph: this.storeOptions.sourceGraph },
                      { subject: this.storeOptions.sourceNode,
                        predicate: taxRate,
                        object: this.taxRateSubject,
                        graph: this.storeOptions.sourceGraph }];
    this.storeOptions.store.addAll( triples );
  }

  removeTaxRate(){
    const statements = [
      ...this.storeOptions.store.match(this.taxRateSubject, undefined, undefined, this.storeOptions.sourceGraph),
      { subject: this.storeOptions.sourceNode, predicate: taxRate, object: this.taxRateSubject, graph: this.storeOptions.sourceGraph }
    ];
    this.storeOptions.store.removeStatements(statements);
  }

  updatePrice(oldValue, newValue){
    this.storeOptions.store.removeStatements([
       { subject: this.taxRateSubject, predicate: schemaPrice, object: oldValue, graph: this.storeOptions.sourceGraph },
    ]);
    this.storeOptions.store.addAll( [ { subject: this.taxRateSubject,
                                        predicate: schemaPrice,
                                        object: newValue,
                                        graph: this.storeOptions.sourceGraph}
                                    ]);
  }

  hasTaxRate(){
    if(!this.taxRateSubject) return false;
    //TODO: the semantics from any in forking-store and rdflibstore are different, thats why we use match. (to easy potential migration)_
    return this.storeOptions.store.match(this.sourceNode, taxRate, this.taxRateSubject, this.storeOptions.sourceGraph).length > 0;
  }

  hasPrices(){
    return this.storeOptions.store.match(this.taxRateSubject, schemaPrice, undefined, this.storeOptions.sourceGraph).length > 0;
  }

  @action
  addPricePlaceholder() {
    this.fields.pushObject({value: {taxRate: ""}, errors: []});
  }

  @action
  addPrice(field, newValue) {
    if(!this.hasTaxRate()){
      this.createTaxRate();
    }
    this.updatePrice(field.value.taxRate, newValue);
    set(field, 'value.taxRate', newValue.trim());
  }

  @action
  removePrice(field) {
    this.storeOptions.store.removeStatements([
       { subject: this.taxRateSubject, predicate: schemaPrice, object: field.value.taxRate, graph: this.storeOptions.sourceGraph },
    ]);
    if(!this.hasPrices()){
      this.removeTaxRate();
    }
    this.fields.removeObject(field);
  }
}
