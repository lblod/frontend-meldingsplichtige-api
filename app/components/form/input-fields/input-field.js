import Component from '@glimmer/component';

/**
 * Abstract input-field component providing a base class
 * for the custom input-fields
*/
export default class InputFieldComponent extends Component {
  get storeOptions() {
    return {
      formGraph: this.args.graphs.formGraph,
      sourceGraph: this.args.graphs.sourceGraph,
      metaGraph: this.args.graphs.metaGraph,
      sourceNode: this.args.sourceNode,
      store: this.args.formStore,
      path: this.args.field.rdflibPath
    };
  }
}
