import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { triplesForPath, validationResultsForField, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';
import rdflib from 'ember-rdflib';
import { reads } from '@ember/object/computed';
import { SKOS } from '../../../../utils/namespaces';

export default class FormInputFieldsToezichtBestuursorgaanSelectEditComponent extends Component {
  @service currentSession;
  @service store;

  @tracked
  selected = null;

  @tracked
  errors = [];

  @tracked
  options = [];

  @tracked
  allowClear = true;

  @reads('args.formStore')
  formStore = null;

  @action
  async loadData(){
    this.storeOptions = {
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph,
      metaGraph: this.args.graphs.metaGraph,
      store: this.args.formStore,
      path: this.args.field.rdflibPath
    };

    this.loadValidations();
    this.options = await this.searchOptions.perform();
    await this.loadProvidedValue();
  }

  async loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);
    if(matches.values.length == 0){
      return;
    }

    const bestuursorgaanInTijdUri = matches.values[0].value;

    const queryParams = {
      sort: 'classificatie.label',
      include: 'classificatie,is-tijdsspecialisatie-van',
      'filter[:uri:]': bestuursorgaanInTijdUri
    };

    const bestuursorganen = await this.store.query('bestuursorgaan', queryParams);

    this.selected = bestuursorganen.firstObject;
  }

  loadValidations(){
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  @(task(function* (searchData){

    if (searchData)
      yield timeout(300);

    let organenInTijd = this.formStore.match( undefined,
                                              SKOS('inScheme'),
                                              new rdflib.namedNode("http://data.lblod.info/concept-schemes/481c03f0-d07f-424e-9c2b-8d4cfb141c72"),
                                               this.storeOptions.metaGraph);
    let organenInTijdUri = organenInTijd.map(t => t.subject.value);

    let organen = [];

    const queryParams = {
      sort: 'classificatie.label',
      page: { size: 200 },
      include: 'is-tijdsspecialisatie-van.classificatie'
      };

    for(const uri of organenInTijdUri){
      queryParams['filter[:uri:]'] = uri;
      if (searchData)
        queryParams['filter[is-tijdsspecialisatie-van][classificatie]'] = searchData;
      const result = yield this.store.query('bestuursorgaan', queryParams);
      if(result.firstObject)
        organen.push(result.firstObject);
    }

    organen = organen.sortBy('isTijdsspecialisatieVan.naam');

    return organen;

  }).keepLatest())
  searchOptions;

  @action
  async updateSelection(bestuursorgaan){
    updateSimpleFormValue( this.storeOptions, bestuursorgaan && new rdflib.NamedNode(bestuursorgaan.uri), this.selected);
  }
}
