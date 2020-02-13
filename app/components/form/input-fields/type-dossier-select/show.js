import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import {triplesForPath} from '../../../../utils/import-triples-for-form';
import {SKOS} from "../../../../utils/namespaces";

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

  loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);

    const subject = matches.values.find(v => {
      return this.args.formStore.any(v, SKOS('inScheme'), undefined, this.args.graphs.metaGraph);
    });

    const label = this.args.formStore.any(subject, SKOS('prefLabel'), undefined, this.args.graphs.metaGraph);

    this.selected = {subject, label};
  }

}
