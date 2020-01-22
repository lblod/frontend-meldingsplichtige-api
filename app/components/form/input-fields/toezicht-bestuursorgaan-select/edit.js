import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { triplesForPath, validationResultsForField, updateSimpleFormValue } from '../../../../utils/import-triples-for-form';
import rdflib from 'ember-rdflib';

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

    const bestuurseenheid = yield this.currentSession.group;
    const queryParams = {
      sort: 'classificatie.label',
      page: { size: 200 },
      include: 'is-tijdsspecialisatie-van.classificatie',
      'filter[is-tijdsspecialisatie-van][bestuurseenheid][id]': bestuurseenheid.get('id')
      //'filter[heeft-tijdsspecialisaties][:has-no:bevat-bestuursfunctie]': true -> TODO this is not in the API
    };

    if (searchData)
      queryParams['filter[is-tijdsspecialisatie-van][classificatie]'] = searchData;

    const resources = yield this.store.query('bestuursorgaan', queryParams);
    return resources;

  }).keepLatest())
  searchOptions;

  @action
  async updateSelection(bestuursorgaan){
    updateSimpleFormValue(bestuursorgaan && new rdflib.NamedNode(bestuursorgaan.uri), this.storeOptions);
  }
}
