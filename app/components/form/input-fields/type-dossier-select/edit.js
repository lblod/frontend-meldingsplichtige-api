import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { triplesForPath, validationResultsForField } from '../../../../utils/import-triples-for-form';
import { RDF, FORM, SKOS, FOAF } from '../../../../utils/namespaces';
import rdflib from 'ember-rdflib';

export default class FormInputFieldsTypeDossierSelectEditComponent extends Component {
  @tracked
  selected = null;

  @tracked
  options = [];

  @tracked
  errors = [];

  storeOptions = {};

  @action
  loadData(){

    this.storeOptions = {
      formGraph: this.args.graphs.formGraph,
      sourceNode: this.args.sourceNode,
      sourceGraph: this.args.graphs.sourceGraph,
      metaGraph: this.args.graphs.metaGraph,
      store: this.args.formStore,
      path: this.args.field.rdflibPath
    };

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
    this.errors = validationResultsForField(this.args.field.uri, this.storeOptions).filter(r => !r.valid);
  }

  loadProvidedValue(){
    // Assumes valid input
    const matches = triplesForPath(this.storeOptions);

    const subject = matches.values.find(v => {
      return this.args.formStore.any(v, SKOS('inScheme'), undefined, this.args.graphs.metaGraph);
    });

    const label = this.args.formStore.any(subject, SKOS('prefLabel'), undefined, this.args.graphs.metaGraph);

    this.selected = {subject, label};
  }

  @action
  updateSelection(option){
    //gather triples to remove on path
    const matches = triplesForPath(this.storeOptions);

    let triple = {};

    //We get expect more data on path rdf:type then soley those linked to a code lists. So we need this extra filter.
    const documentTypes = matches.values.filter(v => {
      return this.args.formStore.any(v, SKOS('inScheme'), undefined, this.args.graphs.metaGraph);
    });

    const triplesToRemove = documentTypes
          .map(docType => this.args.formStore.match(undefined, RDF('type'), docType, this.args.graphs.sourceGraph))
          .reduce((acc, triples) => [...acc, ...triples], []);

    if(triplesToRemove.length > 0){
      const subject = triplesToRemove[0].subject;

      //construct the new triple to add
      triple = {subject, predicate: RDF('type'), object: option.subject, graph: this.args.graphs.sourceGraph};

      this.args.formStore.removeStatements(triplesToRemove);
    }
    else{
      //This is a best guess, we need to find a potential subject do add the documentype to.
      //TODO: if multiple exist, I really don't know what to do.
      if(!matches.values.length == 1){
        alert(`Algemene fout voor formulier ${this.args.sourceNode}`);
        return;
      }
      triple = {subject: matches.triples[0].subject, predicate: RDF('type'), object: option.subject, graph: this.args.graphs.sourceGraph};
    }

    this.args.formStore.addAll([triple]);
  }
}
