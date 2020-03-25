import Component from "@glimmer/component";
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

import {triplesForPath} from "../../../../utils/import-triples-for-form";
import {DCT} from "../../../../utils/namespaces";

export default class FormInputFieldsRemoteUrlsShowComponent extends Component {

  @service
  store;

  @tracked
  remoteUrls = [];

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

    await this.loadProvidedValue();
  }

  async loadProvidedValue() {
    const matches = triplesForPath(this.storeOptions);
    const uris = matches.triples.filter(t => t.predicate.value === DCT("hasPart").value).map(t => t.object);

    for (let uri of uris) {
      try {
        this.remoteUrls.pushObject(
          await this.retrieveRemoteDataObject(uri, matches.triples)
        );
      } catch (error) {
        this.error.pushObject({resultMessage: "Er ging iets fout bij het ophalen van de addressen."});
      }
    }
  }

  async retrieveRemoteDataObject(uri) {
    let remotes = await this.store.query('remote-url', {'filter[:uri:]': uri.value});
    if (remotes.length !== 0) {
      return remotes.get('firstObject');
    } else {
      throw `No remote-url could be found for ${uri}`;
    }
  }
}
