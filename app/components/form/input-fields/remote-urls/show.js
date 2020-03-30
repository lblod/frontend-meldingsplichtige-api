import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { triplesForPath } from '../../../../utils/import-triples-for-form';

import { RDF } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';

export default class FormInputFieldsFilesShowComponent extends Component {
  @service()
  store;

  @tracked remoteUrls = [];

  @tracked errors = [];

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

    for (let uri of matches.values) {
      try {
        if(!this.isRemoteDataObject(uri)) continue;
        this.remoteUrls.pushObject(await this.retrieveRemoteDataObject(uri));
      } catch (error) {
        this.errors.pushObject({resultMessage : "Er ging iets fout bij het ophalen van de addressen."});
      }
    }
  }

  isRemoteDataObject(subject){
    return this.storeOptions.store.match(subject,
                                         RDF('type'),
                                         new rdflib.NamedNode('http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject'),
                                         this.storeOptions.sourceGraph).length > 0;
  }

  async retrieveRemoteDataObject(remoteObjectUri) {
    let remotes = await this.store.query('remote-url', {
      'filter[:uri:]': remoteObjectUri.value,
      page: { size: 1 }
    });
    if (remotes.length) {
      return remotes.get('firstObject');
    } else {
      throw `No remote-url could be found for ${remoteObjectUri}`;
    }
  }

}
