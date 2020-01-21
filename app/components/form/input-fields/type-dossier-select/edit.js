import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath } from '../../../../utils/import-triples-for-form';
import { check } from '../../../../utils/constraints';
import { RDF, FORM, SKOS } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';

export default class FormInputFieldsTypeDossierSelectEditComponent extends Component {
  @tracked
  selected = null;

  @tracked
  options = [];

  @tracked
  errors = [];

  @action
  loadData(){
    this.loadOptions();
    this.loadValidations();
    if(this.errors.length == 0){
      this.loadProvidedValue();
    }
  }

  loadOptions(){
    this.options = this.args.formStore
      .match( undefined,
              SKOS('inScheme'),
              new rdflib.namedNode('https://data.vlaanderen.be/id/conceptscheme/BesluitDocumentType'),
              this.args.graphs.metaGraph)
      .map(s => {
        const label = this.args.formStore.any(s.subject, SKOS('prefLabel'), undefined, this.args.graphs.metaGraph);
        return { subject: s.subject, label: label && label.value };
      });
  }

  loadValidations(){
    const validationConstraintUris = this.args.formStore
          .match(this.args.field.uri, FORM("validations"), undefined, this.args.graphs.formGraph)
          .map(t => t.object);

    let validationResults = [];

    for(let constraintUri of validationConstraintUris){
      const options = {
        formGraph: this.args.graphs.formGraph,
        sourceNode: this.args.sourceNode,
        sourceGraph: this.args.graphs.sourceGraph,
        metaGraph: this.args.graphs.metaGraph,
        store: this.args.formStore
      };
      const validationResult = check(constraintUri, options);
      validationResults.push(validationResult);
    }

    this.errors = validationResults.filter(r => !r.valid);
  }

  loadProvidedValue(){
    // Assumes valid input
    const matches = triplesForPath({
      store: this.args.formStore,
      path: this.args.field.rdflibPath,
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph
    });

    const subject = matches.values.find(v => {
      return this.args.formStore.any(v, SKOS('inScheme'), undefined, this.args.graphs.metaGraph);
    });

    const label = this.args.formStore.any(subject, SKOS('prefLabel'), undefined, this.args.graphs.metaGraph);

    this.selected = {subject, label};
  }

  @action
  updateSelection(option){
    //gather triples to remove on path
    const matches = triplesForPath({
      store: this.args.formStore,
      path: this.args.field.rdflibPath,
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph
    });

    const documentTypes = matches.values.filter(v => {
      return this.args.formStore.any(v, SKOS('inScheme'), undefined, this.args.graphs.metaGraph);
    });

    const triplesToRemove = documentTypes
          .map(docType => this.args.formStore.match(undefined, RDF('type'), docType, this.args.graphs.sourceGraph))
          .reduce((acc, triples) => [...acc, ...triples], []);

    //There will always be a subject, else this component wouldn't render.
    const subject  = triplesToRemove[0].subject;

    //construct the new triple to add
    const triple = {subject, predicate: RDF('type'), object: option.subject, graph: this.args.graphs.sourceGraph};

    this.args.formStore.removeStatements(triplesToRemove);
    this.args.formStore.addAll([triple]);
  }
}
