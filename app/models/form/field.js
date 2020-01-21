import { SHACL, FORM } from '../../utils/namespaces';
import { tracked } from '@glimmer/tracking';

export default class FormFieldModel {

  @tracked
  uri = '';

  @tracked
  rdflibLabel = null;
  get label() {
    return this.rdflibLabel && this.rdflibLabel.value;
  }

  @tracked
  rdflibDescription = null;
  get description(){
    return this.rdflibDescription && this.rdflibDescription.value;
  }

  @tracked
  rdflibOrder = null;
  get order(){
    return this.rdflibOrder && parseInt(this.rdflibOrder.value);
  }

  @tracked
  rdflibDisplayType = null;
  get displayType(){
    return this.rdflibDisplayType && this.rdflibDisplayType.value;
  }

  @tracked
  rdflibPath = null;
  get path(){
    return this.rdflibPath && this.rdflibPath.value;
  }

  @tracked
  rdflibOptions = null;
  get options(){
    return this.rdflibOptions && this.rdflibOptions.value;
  }

  constructor( uri, options ) {
    const { store, formGraph } = options;
    this.uri = uri;
    this.rdflibLabel = store.any( uri, SHACL("label"), undefined, formGraph );
    this.rdflibDescription = store.any( uri, SHACL("description"), undefined, formGraph );
    this.rdflibOrder = store.any( uri, SHACL("order"), undefined, formGraph );
    this.rdflibDisplayType = store.any( uri, FORM("displayType"), undefined, formGraph );
    this.rdflibPath = store.any( uri, SHACL("path"), undefined, formGraph );
    this.rdflibOptions = store.any( uri, FORM("options"), undefined, formGraph );
  }
}
