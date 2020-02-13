import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import {triplesForPath} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsToezichtBestuursorgaanSelectShowComponent extends Component {

  @service
  store;

  @tracked
  selected = null;

  @tracked
  storeOptions = {};

  @action
  async loadData() {
    this.storeOptions = {
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph,
      metaGraph: this.args.graphs.metaGraph,
      store: this.args.formStore,
      path: this.args.field.rdflibPath
    };
    await this.loadProvidedValue();
  }

  async loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);
    if(matches.values.length === 0){
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

}
