import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import documentTypeCodelist from '../../utils/codelist/document-type';
import { fieldsForForm }  from '../../utils/import-triples-for-form';
import { createPropertyTreeFromFields } from '../../utils/model-factory';
import { RDF, FORM } from '../../utils/namespaces';

export default class FormRootComponent extends Component {
  // parse ttls from provided form arguments
  // generate all graphs there need to exist
  // send and save logic ?
  // render fieldgroups

  @tracked
  propertyGroups = [];

  formGraph = null;
  sourceGraph = null;
  sourceNode = null;
  metaGraph = null;
  graphs = {}

  @action
  loadData(){
    const formGraph = new rdflib.NamedNode("http://mu.semte.ch/form");
    const sourceGraph = new rdflib.NamedNode("http://mu.semte.ch/dilbeek");
    const metaGraph = new rdflib.NamedNode("http://mu.semte.ch/metagraph");
    this.graphs = { formGraph, sourceGraph, metaGraph  };

    //TODO: how do i get this
    this.sourceNode = new rdflib.NamedNode("http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069");

    this.args.formStore.parse(this.args.data.formData, sourceGraph, "text/turtle");
    this.args.formStore.parse(this.args.data.form, formGraph, "text/turtle");
    this.args.formStore.parse(documentTypeCodelist, metaGraph, "text/turtle");

    this.getPropertyGroups( this.args.formStore,
                            formGraph,
                            sourceGraph,
                            this.sourceNode,
                            metaGraph
                          );

    this.args.formStore.registerObserver(() => {
      this.getPropertyGroups( this.args.formStore,
                              formGraph,
                              sourceGraph,
                              this.sourceNode,
                              metaGraph
                            );
    });
  }

  getPropertyGroups(store, formGraph, sourceGraph, sourceNode, metaGraph) {
    const form = store.any(undefined, RDF("type"), FORM("Form"), formGraph);
    if(!form) return;

    let fieldUris = fieldsForForm( form, {
      store,
      formGraph,
      sourceGraph,
      sourceNode,
      metaGraph
    });

    this.propertyGroups = createPropertyTreeFromFields( fieldUris, { store, formGraph });
  }
}
