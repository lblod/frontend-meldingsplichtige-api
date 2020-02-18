import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import {set} from '@ember/object';
import {
  triplesForPath,
  addSimpleFormValue,
  removeSimpleFormValue,
  validationResultsForField,
  validationResultsForFieldPart
} from '../../../../utils/import-triples-for-form';

const READY_TO_BE_CACHED = "bd1017b8-6353-4d52-9e09-37dcc92f05b5";
const FAILED = "51aaa791-ba19-4ccb-ad2d-9d5b7f65d351";
const CREATOR = "d298d62c-cb94-4cbd-a88a-ca3f2bec003a";

export default class FormInputFieldsFileAddressesEditComponent extends Component {

  @service
  store;

  @tracked
  remoteFiles = [];

  @tracked
  errors = [];

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


    this.loadValidations();
    await this.loadProvidedValue();
  }

  loadValidations() {
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  async loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    for (let triple of matches.triples) {
      const uri = triple.object.value;
      const remotes = await this.store.query('remote-url', {'filter[:uri:]' : uri});
      const remoteUrl = remotes.get('firstObject');
      this.remoteFiles.pushObject({
        remoteUrl,
        errors: validationResultsForFieldPart({values: [{value: remoteUrl.address}]},
          this.args.field.uri,
          this.storeOptions).filter(r => !r.valid)
      });
    }
  }

  @action
  async addUrlField() {
    const creator = await this.store.findRecord("service-agent", CREATOR);

    const remoteUrl = await this.store.createRecord('remote-url');
    remoteUrl.setProperties({
      creator
    });

    this.remoteFiles.pushObject({remoteUrl, errors: []});
  }

  @action
  async updateRemoteUrl(current, newValue) {
    set(current.remoteUrl, "address", newValue.trim());

    if (this.isValid(newValue) && current.remoteUrl.address !== newValue.trim()) {
      set(current.remoteUrl, "downloadStatus", await this.store.findRecord("file-download-status", READY_TO_BE_CACHED));
    }

    await current.remoteUrl.save();
    addSimpleFormValue(current.remoteUrl.get("uri"), this.storeOptions);
  }

  @action
  async removeRemoteUrl(current) {
    removeSimpleFormValue(current.remoteUrl.uri, this.storeOptions);
    await current.remoteUrl.destroyRecord();
  }

  isValid(value) {
    // TODO Reusable
    let errors = validationResultsForFieldPart(
      {values: [{value}]},
      this.args.field.uri,
      this.storeOptions).filter(r => !r.valid);
    return errors ? errors.length === 0 : false;
  }
}
