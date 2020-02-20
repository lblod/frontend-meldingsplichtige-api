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

const READY_TO_BE_CACHED_URI = "http://lblod.data.gift/file-download-statuses/ready-to-be-cached";
const CREATOR_URI = "http://lblod.data.gift/fronted-end-componets/remote-url-creator";

export default class FormInputFieldsRemoteUrlsEditComponent extends Component {

  @service
  store;

  @tracked
  remoteUrls = [];

  @tracked
  errors = [];

  @tracked
  remoteErrors = [];

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
      try {
        const remotes = await this.store.query('remote-url', {'filter[:uri:]': uri});
        const remoteUrl = await remotes.get('firstObject');
        if (remoteUrl) {
          this.remoteUrls.pushObject({
            remoteUrl,
            errors: this.validationResultsForAddress(remoteUrl.address)
          });
        } else {
          this.remoteErrors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
        }
      } catch (error) {
        this.remoteErrors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
      }

    }
  }

  @action
  addUrlField() {
    const remoteUrl = this.getNewRemoteUrl();
    this.remoteUrls.pushObject({remoteUrl, errors: []});
  }

  @action
  async updateRemoteUrl(current, newValue) {
    if (current.remoteUrl.address != newValue.trim()) {
      if (this.isValidAddress(newValue.trim())) {
        set(current.remoteUrl, "downloadStatus", READY_TO_BE_CACHED_URI);
      }
      set(current.remoteUrl, "address", newValue.trim());
      try {
        await current.remoteUrl.save();
        addSimpleFormValue(current.remoteUrl.get("uri"), this.storeOptions);
      } catch (error) {
        this.remoteErrors.pushObject({resultMessage: "Er ging iets fout bij het opslaan."});
      }
    }
  }

  @action
  async removeRemoteUrl(current) {
    removeSimpleFormValue(current.remoteUrl.uri, this.storeOptions);
    await current.remoteUrl.destroyRecord();
  }

  getNewRemoteUrl() {
    return this.store.createRecord('remote-url', {
      creator: CREATOR_URI
    });
  }

  isValidAddress(value) {
    let errors = this.validationResultsForAddress(value);
    return errors ? errors.length === 0 : false;
  }

  validationResultsForAddress(value) {
    return validationResultsForFieldPart(
      {values: [{value}]},
      this.args.field.uri,
      this.storeOptions).filter(r => !r.valid);
  }
}
