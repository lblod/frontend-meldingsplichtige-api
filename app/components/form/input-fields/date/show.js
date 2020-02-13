import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath} from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsDateShowComponent extends Component {
  @tracked
  value = null;

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

    this.loadProvidedValue();
  }

  loadProvidedValue(){
    const matches = triplesForPath(this.storeOptions);
    if(matches.values.length > 0)
      this.value = matches.values[0].value;
  }
}
