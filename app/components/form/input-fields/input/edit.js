import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath } from '../../../../utils/import-triples-for-form';

export default class FormInputFieldsInputEditComponent extends Component {
  @tracked
  value = null;

  @action
  loadData(){
    const matches = triplesForPath({
      store: this.args.formStore,
      path: this.args.field.rdflibPath,
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph
    });

    if(matches.values.length > 0)
      this.value = matches.values[0].value;
  }
}
