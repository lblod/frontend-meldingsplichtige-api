import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { fieldsForForm }  from '../../utils/import-triples-for-form';
import { createPropertyTreeFromFields } from '../../utils/model-factory';

export default class FormRootComponent extends Component {
  @tracked propertyGroups = []

  @action
  loadData(){
    this.getPropertyGroups( this.args.formStore,
                            this.args.graphs.formGraph,
                            this.args.graphs.sourceGraph,
                            this.args.sourceNode,
                            this.args.graphs.metaGraph
                          );

    this.args.formStore.registerObserver(() => {
      this.getPropertyGroups( this.args.formStore,
                              this.args.graphs.formGraph,
                              this.args.graphs.sourceGraph,
                              this.args.sourceNode,
                              this.args.graphs.metaGraph
                            );
    });
  }

  getPropertyGroups(store, formGraph, sourceGraph, sourceNode, metaGraph) {

    let fieldUris = fieldsForForm( this.args.form, {
      store,
      formGraph,
      sourceGraph,
      sourceNode,
      metaGraph
    });

    this.propertyGroups = createPropertyTreeFromFields( fieldUris, { store, formGraph });
  }
}
