export default `@prefix form: <http://lblod.data.gift/vocabularies/forms/> .
@prefix sh: <http://www.w3.org/ns/shacl#>.
@prefix dct: <http://purl.org/dc/terms/> .
@prefix mu: <http://mu.semte.ch/vocabularies/core/> .
@prefix ext: <http://mu.semte.ch/vocabularies/ext/> .
@prefix : <http://data.lblod.info/forms/> .
@prefix fieldGroups: <http://data.lblod.info/field-groups/> .
@prefix fields: <http://data.lblod.info/fields/> .
@prefix displayTypes: <http://lblod.data.gift/display-types/> .
@prefix eli: <http://data.europa.eu/eli/ontology#>.
@prefix besluit: <http://data.vlaanderen.be/ns/besluit#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix prov: <http://www.w3.org/ns/prov#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.

:besluitenlijst a form:Form ;
    mu:uuid "a0a120d2-87a8-4f45-a61b-61654997cf1e" ;
    form:hasFieldGroup fieldGroups:allForms .

fieldGroups:allForms a form:FieldGroup;
    mu:uuid "3a60def6-107e-4716-bc5f-2f2e108f7fab" ;
    form:hasField fields:submissionType.

fieldGroups:besluitenlijstMain a form:FieldGroup ;
    mu:uuid "6e8bb26a-0f95-4c0e-b1a9-188430c4b7af" ;
    form:hasField fields:administrativeBody, fields:meetingDate, fields:publicationDate, fields:filesAndLinks, fields:remark .

fieldGroups:notulenMain a form:FieldGroup ;
    mu:uuid "6e8bb26a-0f95-4c0e-b1a9-188430c4b7af" ;
    form:hasField fields:meetingDate.

fields:remark a form:Field ;
    mu:uuid "0cdfe85f-ec65-498f-bd26-0ec611967de0" ;
    sh:name "Opmerking" ;
    sh:order 500 ;
    sh:path rdfs:comment ;
    form:displayType displayTypes:textArea;
    sh:group fields:aDynamicPropertyGroup .

fields:submissionType a form:Field ;
    mu:uuid "0827fafe-ad19-49e1-8b2e-105d2c08a54a" ;
    sh:name "Type dossier" ;
    sh:order 1 ;
    sh:path rdf:type ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        sh:resultMessage "Dit veld is verplicht."@nl
      ],
      [ a form:BesluittypeConstraint ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <https://data.vlaanderen.be/id/conceptscheme/BesluitDocumentType> ;
        sh:resultMessage "Er dient exact 1 waarde voor type besluit te worden ingevuld."@nl
      ] ;
    form:displayType displayTypes:typeDossierSelect;
    form:options """{ value: \"http://data.lblod.info/DecisionType/46b254008bbca1354e632dc40cf550c6b313e523799cafd7200a48a19e09249f\" }""" ;
    form:hasConditionalFieldGroup fields:hasBesluitenLijstConditionalFieldGroup;
    form:hasConditionalFieldGroup fields:hasNotulenConditionalFieldGroup;
    sh:group fields:propertyGroupSubmissionType.

fields:hasBesluitenLijstConditionalFieldGroup a form:ConditionalFieldGroup ;
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type;
        form:conceptScheme <https://data.vlaanderen.be/id/conceptscheme/BesluitDocumentType> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/3fa67785-ffdc-4b30-8880-2b99d97b4dee>
      ] ;
    form:hasFieldGroup fieldGroups:besluitenlijstMain .

fields:hasNotulenConditionalFieldGroup a form:ConditionalFieldGroup ;
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type;
        form:conceptScheme <https://data.vlaanderen.be/id/conceptscheme/BesluitDocumentType> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/8e791b27-7600-4577-b24e-c7c29e0eb773>
      ] ;
    form:hasFieldGroup fieldGroups:notulenMain .


fields:administrativeBody a form:Field ;
    mu:uuid "bffbea8d-e55b-4e3d-86e8-ba7aaee7863d" ;
    sh:name "Bestuursorgaan" ;
    sh:order 2 ;
    sh:path eli:passed_by ;
    form:validations
      [ a form:AdminstrativeUnitCodelistConstraint ;
        form:grouping form:MatchEvery ;
        sh:path eli:passed_by ],
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit veld is verplicht."@nl;
        sh:path eli:passed_by ] ;
    form:displayType displayTypes:bestuursorgaanSelect ;
    sh:group fields:anIntermediatePropertyGroup .

fields:meetingDate a form:Field ;
    mu:uuid "3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb" ;
    sh:name "Zittingsdatum" ;
    sh:order 3 ;
    sh:path ( [ sh:inversePath besluit:heeftBesluitenlijst ] prov:startedAtTime ) ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit is een verplicht veld.";
        sh:path ( [ sh:inversePath besluit:heeftBesluitenlijst ] prov:startedAtTime ) ],
      [ a sh:PropertyShape ;
        form:grouping form:MatchEvery ;
        sh:path ( [ sh:inversePath besluit:heeftBesluitenlijst ] prov:startedAtTime ) ;
        sh:dataType xsd:dateTime ;
        sh:resultMessage "Geeft een geldige datum en tijd op.";
        sh:nodeKind sh:Literal ] ;
    form:displayType displayTypes:dateTime ;
    sh:group fields:anIntermediatePropertyGroup .

fields:publicationDate a form:Field ;
    mu:uuid "0a63d06f-235c-463c-9ffb-fe31647517b6" ;
    sh:name "Publicatiedatum" ;
    sh:order 4 ;
    sh:path eli:date_publication ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit is een verplicht veld.";
        sh:path eli:date_publication ],
      [ a sh:PropertyShape ;
        form:grouping form:MatchSome ;
        sh:path eli:date_publication ;
        sh:resultMessage "Geeft een geldige datum op.";
        sh:dataType xsd:date ;
        sh:nodeKind sh:Literal ] ;
    form:displayType displayTypes:date ;
    form:hasConditionalFieldGroup fields:humanPublicationConditionalGroup ;
    sh:group fields:anIntermediatePropertyGroup .

fields:humanPublicationConditionalGroup a form:ConditionalFieldGroup ;
    form:conditions
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path eli:date_publication ] ;
    form:hasFieldGroup
      [ a form:FieldGroup ;
        form:hasField fields:humanPublicationUrl ] .

fields:humanPublicationUrl a form:Field ;
    mu:uuid "aff7faf3-361a-4723-b3f3-0ad8d431eb95" ;
    sh:name "Menselijke URL voor publicatie" ;
    sh:order 5 ;
    sh:path ext:humanPublicationUrl ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit veld is verplicht";
        sh:path ext:humanPublicationUrl ],
      [ a form:UriConstraint ;
        form:grouping form:MatchEvery ;
        sh:resultMessage "Gelieve een geldige URI op te geven.";
        sh:path ext:humanPublicationUrl ];
    form:displayType displayTypes:defaultInput ;
    sh:group fields:aDynamicPropertyGroup .

fields:filesAndLinks a form:Field ;
    mu:uuid "fd7422a5-da17-4b20-a4dd-a364b77178bf" ;
    sh:name "Bestanden of URLs" ;
    sh:order 10 ;
    form:validations [
        a form:FilesOrLinksConstraint ;
        form:grouping form:Bag ] ;
    form:displayType displayTypes:filesAndLinks ;
    sh:group fields:anIntermediatePropertyGroup .

fields:propertyGroupSubmissionType a form:PropertyGroup;
    mu:uuid "8aa843d6-edc5-408a-a807-c12d13ac4f16";
    sh:description "The first propertyGroup for type submission";
    sh:order 1;
    sh:name "PropertyGroup for submission type".

fields:anIntermediatePropertyGroup a form:PropertyGroup;
    mu:uuid "517df1bd-e23a-4d16-9e8f-8e428e095078";
    sh:description "An intermediate property group";
    sh:order 2;
    sh:name "intermediatePropertyGroup".

fields:aDynamicPropertyGroup a form:PropertyGroup;
    mu:uuid "8c71b3db-db4b-45ea-8333-ab000adcca4e";
    sh:description "A dynamic property group";
    sh:order 3;
    sh:name "aDynamicPropertyGroup".

`;
