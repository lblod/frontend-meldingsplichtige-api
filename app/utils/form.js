export default `@prefix form: <http://lblod.data.gift/vocabularies/forms/> .
@prefix sh: <http://www.w3.org/ns/shacl#>.
@prefix dct: <http://purl.org/dc/terms/> .
@prefix mu: <http://mu.semte.ch/vocabularies/core/> .
@prefix ext: <http://mu.semte.ch/vocabularies/ext/> .
@prefix fieldGroups: <http://data.lblod.info/field-groups/> .
@prefix fields: <http://data.lblod.info/fields/> .
@prefix displayTypes: <http://lblod.data.gift/display-types/> .
@prefix eli: <http://data.europa.eu/eli/ontology#>.
@prefix besluit: <http://data.vlaanderen.be/ns/besluit#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix prov: <http://www.w3.org/ns/prov#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix lblodBesluit: <http://lblod.data.gift/vocabularies/besluit/> .
@prefix besluit: <http://data.vlaanderen.be/ns/besluit#>.
@prefix mandaat: <http://data.vlaanderen.be/ns/mandaat#>.
@prefix elod: <http://linkedeconomy.org/ontology#>.
@prefix skos: <http://www.w3.org/2004/02/skos/core#>.
@prefix nfo: <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#> .
@prefix nie: <http://www.semanticdesktop.org/ontologies/2007/01/19/nie#>.
# conditional fields are dynamic
# TODO: fix groups (probably) too

# TODO: extra validation: Only specific type of dossier should be availible to specific type of bestuurseenheid.
# TODO: the list of dossiers to propose should differ from bestuurseenheidType to bestuurseenheidtype
fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a a form:Field ;
    mu:uuid "0827fafe-ad19-49e1-8b2e-105d2c08a54a" ;
    sh:name "Type dossier" ;
    sh:order 100 ;
    sh:path rdf:type ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        sh:resultMessage "Dit veld is verplicht."@nl
      ],
      [ a form:ConceptSchemeConstraint ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        sh:resultMessage "Er dient exact 1 waarde voor type besluit te worden ingevuld."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5"}""" ;
    form:displayType displayTypes:conceptSchemeSelector ;
    sh:group fields:aDynamicPropertyGroup .

fields:0cdfe85f-ec65-498f-bd26-0ec611967de0 a form:Field ;
    mu:uuid "0cdfe85f-ec65-498f-bd26-0ec611967de0" ;
    sh:name "Opmerking" ;
    sh:order 500 ;
    sh:path rdfs:comment ;
    form:displayType displayTypes:textArea ;
    sh:group fields:aDynamicPropertyGroup .

fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac a form:Field ;
    mu:uuid "bd6ee5ac-22d6-4279-bcba-3ed279021aac" ;
    sh:name "Dossieromschrijving" ;
    sh:order 600 ;
    sh:path dct:description ;
    form:displayType displayTypes:textArea ;
    sh:group fields:aDynamicPropertyGroup .

fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb a form:Field ;
    mu:uuid "a8f6a6cb-dbb8-488c-878d-05603791a9eb" ;
    sh:name "Gaat het over het origineel document of over een wijziging?" ;
    sh:order 700 ;
    sh:path lblodBesluit:authenticityType ;
    form:validations
      [ a form:ConceptSchemeConstraint ; #TODO
        form:grouping form:Bag ;
        sh:path lblodBesluit:authenticityType ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/5cecec47-ba66-4d7a-ac9d-a1e7962ca4e2> ;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/5cecec47-ba66-4d7a-ac9d-a1e7962ca4e2"}""" ;
    form:displayType displayTypes:conceptSchemeSelector ;
    sh:group fields:aDynamicPropertyGroup .

fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235 a form:Field ;
    mu:uuid "6ffb0ed7-769a-41e4-b5a9-f6fb0287b235" ;
    sh:name "Ondernemingsnummer betreffend bedrijf/bestuur" ;
    sh:order 900 ;
    sh:path ( eli:is_about dct:identifier) ;
    form:displayType displayTypes:defaultInput;
    sh:group fields:aDynamicPropertyGroup .

fields:78bfbd91-0778-4573-a52d-4c53b3c512eb a form:Field ;
    mu:uuid "78bfbd91-0778-4573-a52d-4c53b3c512eb" ;
    sh:name "Naam betreffend bedrijf/bestuur" ;
    sh:order 1000 ;
    sh:path ( eli:is_about skos:prefLabel) ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path ( eli:is_about skos:prefLabel ) ;
        sh:resultMessage "Dit veld is verplicht."@nl
      ];
    form:displayType displayTypes:defaultInput;
    sh:group fields:aDynamicPropertyGroup .

fields:41737f90-02d6-4036-8d60-5d5b6ccf939c a form:Field ;
    mu:uuid "41737f90-02d6-4036-8d60-5d5b6ccf939c" ;
    sh:name "Rapportjaar" ;
    sh:order 1800 ;
    sh:path elod:financialYear ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path elod:financialYear ;
        sh:resultMessage "Dit veld is verplicht."@nl
      ],
      [ a form:ValidYear ;
        form:grouping form:MatchEvery ;
        sh:path elod:financialYear ;
        sh:resultMessage "Geef een geldig jaar op."@n ] ;
    form:displayType displayTypes:defaultInput ;
    sh:group fields:aDynamicPropertyGroup .

fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d a form:Field ;
    mu:uuid "bffbea8d-e55b-4e3d-86e8-ba7aaee7863d" ;
    sh:name "Welk beslissingsorgaan nam het besluit?" ;
    sh:order 2000 ;
    sh:path eli:passed_by ;
    form:validations
      [ a form:AdminstrativeUnitCodelistConstraint ; #TODO
        form:grouping form:MatchEvery ;
        sh:path eli:passed_by ],
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit veld is verplicht."@nl;
        sh:path eli:passed_by ] ;
    form:displayType displayTypes:bestuursorgaanSelect ;
    sh:group fields:aDynamicPropertyGroup .

fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb a form:Field ;
    mu:uuid "3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb" ;
    sh:name "Datum zitting/besluit" ;
    sh:order 2600 ;
    sh:path ( [ sh:inversePath besluit:heeftBesluitenlijst ] prov:startedAtTime ) ;  # see https://www.w3.org/TR/shacl/#property-paths for syntax
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit is een verplicht veld.";
        sh:path ( [ sh:inversePath besluit:heeftBesluitenlijst ] prov:startedAtTime ) ],
      [ a form:ValidDateTime ;
        form:grouping form:MatchEvery ;
        sh:path ( [ sh:inversePath besluit:heeftBesluitenlijst ] prov:startedAtTime ) ;
        sh:resultMessage "Geeft een geldige datum en tijd op."] ;
    form:displayType displayTypes:dateTime ;
    sh:group fields:aDynamicPropertyGroup .

fields:ef31b839-c461-4732-b35c-a8b6c7507cf1 a form:Field ;
    mu:uuid "ef31b839-c461-4732-b35c-a8b6c7507cf1" ;
    sh:name "MAR-code" ;
    sh:order 5100 ;
    sh:path lblodBesluit:chartOfAccount ;
    form:validations
      [ a form:ConceptSchemeConstraint ; #TODO
        form:grouping form:Bag ;
        sh:path lblodBesluit:chartOfAccount ;
        form:conceptScheme  <http://lblod.data.gift/concept-schemes/b65b15ba-6755-4cd2-bd07-2c2cf3c0e4d3>;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/b65b15ba-6755-4cd2-bd07-2c2cf3c0e4d3"}""" ;
    form:displayType displayTypes:conceptSchemeSelector ;
    sh:group fields:aDynamicPropertyGroup .

fields:a1b6c2e1-c1c3-45fb-84e7-cdd241a3130d a form:Field ;
    mu:uuid "a1b6c2e1-c1c3-45fb-84e7-cdd241a3130d" ;
    sh:name "MAR-code" ;
    sh:order 5100 ;
    sh:path lblodBesluit:chartOfAccount ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit is een verplicht veld.";
        sh:path lblodBesluit:chartOfAccount ],
      [ a form:ConceptSchemeConstraint ; #TODO
        form:grouping form:Bag ;
        sh:path lblodBesluit:chartOfAccount ;
        form:conceptScheme  <http://lblod.data.gift/concept-schemes/b65b15ba-6755-4cd2-bd07-2c2cf3c0e4d3>;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/b65b15ba-6755-4cd2-bd07-2c2cf3c0e4d3"}""" ;
    form:displayType displayTypes:conceptSchemeSelector ;
    sh:group fields:aDynamicPropertyGroup .

fields:7793c27f-a41b-4665-a876-da9d94075a70 a form:Field ;
    mu:uuid "7793c27f-a41b-4665-a876-da9d94075a70" ;
    sh:name "Geldt vanaf" ;
    sh:order 5101 ;
    sh:path eli:first_date_entry_in_force ;
    form:validations
      [ a form:ValidDate ;
        form:grouping form:MatchEvery ;
        sh:path eli:first_date_entry_in_force ;
        sh:resultMessage "Geef een geldige datum op."] ;
    form:displayType displayTypes:date ;
    sh:group fields:aDynamicPropertyGroup .

fields:4b32c8fb-9725-4f9f-9872-b04198732483 a form:Field ;
    mu:uuid "4b32c8fb-9725-4f9f-9872-b04198732483" ;
    sh:name "Geldt vanaf" ;
    sh:order 5101 ;
    sh:path eli:first_date_entry_in_force ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path eli:first_date_entry_in_force ;
        sh:resultMessage "Dit veld is verplicht."@nl
      ],
      [ a form:ValidDate ;
        form:grouping form:MatchEvery ;
        sh:path eli:first_date_entry_in_force ;
        sh:resultMessage "Geef een geldige datum op."@nl ] ;
    form:displayType displayTypes:date ;
    sh:group fields:aDynamicPropertyGroup .

fields:eeacea67-d327-4952-bbfa-31207823ba87 a form:Field ;
    mu:uuid "eeacea67-d327-4952-bbfa-31207823ba87" ;
    sh:name "Geldt tot" ;
    sh:order 5102 ;
    sh:path eli:date_no_longer_in_force ;
    form:validations
      [ a form:ValidDate ;
        form:grouping form:MatchEvery ;
        sh:path eli:date_no_longer_in_force ;
        sh:resultMessage "Geef een geldige datum op."@nl ] ;
    form:displayType displayTypes:date ;
    sh:group fields:aDynamicPropertyGroup .

fields:3a9f6f7d-2952-4128-84cc-bc8dc3d1ee44 a form:Field ;
    mu:uuid "3a9f6f7d-2952-4128-84cc-bc8dc3d1ee44" ;
    sh:name "Geldt tot" ;
    sh:order 5102 ;
    sh:path eli:date_no_longer_in_force ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path eli:date_no_longer_in_force ;
        sh:resultMessage "Dit veld is verplicht."@nl
      ],
      [ a form:ValidDate ;
        form:grouping form:MatchEvery ;
        sh:path eli:date_no_longer_in_force ;
        sh:resultMessage "Geef een geldige datum op."@nl] ;
    form:displayType displayTypes:date ;
    sh:group fields:aDynamicPropertyGroup .

fields:7cd14dfd-81ff-4a5d-8374-5879c5877c4c a form:Field ;
    mu:uuid "7cd14dfd-81ff-4a5d-8374-5879c5877c4c" ;
    sh:name "Soort Belasting" ;
    sh:order 5000 ;
    sh:path lblodBesluit:taxType ;
    form:validations
    [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path lblodBesluit:taxType ;
        sh:resultMessage "Dit veld is verplicht."@nl
    ],
    [ a form:ConceptSchemeConstraint ; #TODO
        form:grouping form:Bag ;
        sh:path lblodBesluit:taxType ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/3037c4f4-1c63-43ac-bfc4-b41d098b15a6>  ;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/3037c4f4-1c63-43ac-bfc4-b41d098b15a6"}""" ;
    form:displayType displayTypes:conceptSchemeSelector ;
    sh:group fields:aDynamicPropertyGroup .

fields:49dbe1be-877a-4890-8465-1510ff18ce18 a form:Field ;
    mu:uuid "49dbe1be-877a-4890-8465-1510ff18ce18" ;
    sh:name "Datum van publicatie op webtoepassing" ;
    sh:order 3700 ;
    sh:path eli:date_publication ;
    form:validations
      [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:resultMessage "Dit is een verplicht veld.";
        sh:path eli:date_publication ],
      [ a form:ValidDate ;
        form:grouping form:MatchEvery ;
        sh:path eli:date_publication ;
        sh:resultMessage "Geeft een geldige datum op."@nl ] ;
    form:displayType displayTypes:date ;
    sh:group fields:aDynamicPropertyGroup .

fields:e834ec56-2db3-43d8-8a54-baf6cc0463c6 a form:Field ;
    mu:uuid "e834ec56-2db3-43d8-8a54-baf6cc0463c6" ;
    sh:name "Type reglement/verordening" ;
    sh:order 3800 ;
    sh:path rdf:type ;
    form:validations
    [ a form:RequiredConstraint ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        sh:resultMessage "Dit veld is verplicht."@nl
    ],
    [ a form:ConceptSchemeConstraint ; #TODO
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/c93ccd41-aee7-488f-86d3-038de890d05a>  ;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/c93ccd41-aee7-488f-86d3-038de890d05a"}""" ;
    form:displayType displayTypes:conceptSchemeSelector ;
    sh:group fields:aDynamicPropertyGroup .

fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b a form:Field ;
    mu:uuid "c955d641-b9b3-4ec7-9838-c2a477c7e95b" ;
    sh:name "Links naar documenten" ;
    sh:order 10000 ;
    sh:path ( dct:hasPart nie:url ) ;
    form:validations
     [ a form:UriConstraint ;
        form:grouping form:MatchEvery ;
        sh:resultMessage "Gelieve een geldige URL op te geven.";
         sh:path ( dct:hasPart nie:url ) ];
    form:displayType displayTypes:remoteUrls;
    sh:group fields:aDynamicPropertyGroup .

fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a a form:Field ;
    mu:uuid "c955d641-b9b3-4ec7-9838-c2a477c7e95a" ;
    sh:name "Bestanden" ;
    sh:order 10001 ;
    sh:path nfo:FileDataObject ;
    form:displayType displayTypes:files;
    sh:group fields:aDynamicPropertyGroup .

fields:1ee5132e-28c0-4292-9fe6-24c7be456580 a form:Field ;
    mu:uuid "1ee5132e-28c0-4292-9fe6-24c7be456580" ;
    sh:name "Opcentiem" ;
    sh:order 5001 ;
    sh:path lblodBesluit:taxRate ;
    #form:validations [];
    form:displayType displayTypes:vLabelOpcentiem ;
    sh:group fields:aDynamicPropertyGroup .

###########Advies-bij-jaarrekening-AGB###########

fieldGroups:b8c40ca1-b2c4-416c-bc3f-e0e4bd50a493 a form:FieldGroup ;
    mu:uuid "b8c40ca1-b2c4-416c-bc3f-e0e4bd50a493" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:c13981d3-33a2-4105-9ac0-9823aa52073a.

fields:c13981d3-33a2-4105-9ac0-9823aa52073a a form:ConditionalFieldGroup ;
    mu:uuid "c13981d3-33a2-4105-9ac0-9823aa52073a";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/a0a709a7-ac07-4457-8d40-de4aea9b1432>
      ] ;
    form:hasFieldGroup fieldGroups:b8c40ca1-b2c4-416c-bc3f-e0e4bd50a493 .



###########Advies-bij-jaarrekening-APB###########

fieldGroups:70fe1278-738f-4edf-b1a1-94056579c7a4 a form:FieldGroup ;
    mu:uuid "70fe1278-738f-4edf-b1a1-94056579c7a4" ; 
    form:hasField 
                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:24e1615a-7ee1-4f55-9aab-baa9140c3024.

fields:24e1615a-7ee1-4f55-9aab-baa9140c3024 a form:ConditionalFieldGroup ;
    mu:uuid "24e1615a-7ee1-4f55-9aab-baa9140c3024";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/8bdc614a-d2f2-44c0-8cb1-447b1017d312>
      ] ;
    form:hasFieldGroup fieldGroups:70fe1278-738f-4edf-b1a1-94056579c7a4 .



###########Advies-bij-jaarrekening-eredienstbestuur###########

fieldGroups:91045004-2066-40f3-aac1-bf2309eb2b99 a form:FieldGroup ;
    mu:uuid "91045004-2066-40f3-aac1-bf2309eb2b99" ; 
    form:hasField 
                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d6fee4ff-91f7-4a8d-873f-5394eb43c017.

fields:d6fee4ff-91f7-4a8d-873f-5394eb43c017 a form:ConditionalFieldGroup ;
    mu:uuid "d6fee4ff-91f7-4a8d-873f-5394eb43c017";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/79414af4-4f57-4ca3-aaa4-f8f1e015e71c>
      ] ;
    form:hasFieldGroup fieldGroups:91045004-2066-40f3-aac1-bf2309eb2b99 .



###########Advies-jaarrekening-OCMW-vereniging###########

fieldGroups:e5d8713c-338a-4775-a745-f6f4bad7189e a form:FieldGroup ;
    mu:uuid "e5d8713c-338a-4775-a745-f6f4bad7189e" ; 
    form:hasField 
                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:22646d67-09ad-49ab-8f09-e9948c18cbec.

fields:22646d67-09ad-49ab-8f09-e9948c18cbec a form:ConditionalFieldGroup ;
    mu:uuid "22646d67-09ad-49ab-8f09-e9948c18cbec";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/4350cdda-8291-4055-9026-5c7429357fce>
      ] ;
    form:hasFieldGroup fieldGroups:e5d8713c-338a-4775-a745-f6f4bad7189e .



###########Advies-samenvoeging-eredienstbesturen###########

fieldGroups:53505d5d-d28c-49d2-afaf-910f673d34e1 a form:FieldGroup ;
    mu:uuid "53505d5d-d28c-49d2-afaf-910f673d34e1" ; 
    form:hasField 
                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:c2331741-8d43-4fcd-8aae-c2d102e714ff.

fields:c2331741-8d43-4fcd-8aae-c2d102e714ff a form:ConditionalFieldGroup ;
    mu:uuid "c2331741-8d43-4fcd-8aae-c2d102e714ff";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/4efa4632-efc6-40d5-815a-dec785fbceac>
      ] ;
    form:hasFieldGroup fieldGroups:53505d5d-d28c-49d2-afaf-910f673d34e1 .



###########Agenda###########

fieldGroups:0945ac20-fec2-4a08-8cb5-ddec808e0c4c a form:FieldGroup ;
    mu:uuid "0945ac20-fec2-4a08-8cb5-ddec808e0c4c" ; 
    form:hasField 
                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:e14b7ae5-f527-4fb8-b1b8-84779bac960b.

fields:e14b7ae5-f527-4fb8-b1b8-84779bac960b a form:ConditionalFieldGroup ;
    mu:uuid "e14b7ae5-f527-4fb8-b1b8-84779bac960b";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/13fefad6-a9d6-4025-83b5-e4cbee3a8965>
      ] ;
    form:hasFieldGroup fieldGroups:0945ac20-fec2-4a08-8cb5-ddec808e0c4c .



###########Andere-documenten-BBC###########

fieldGroups:35396e31-45cf-4382-a254-e74bba37ae4c a form:FieldGroup ;
    mu:uuid "35396e31-45cf-4382-a254-e74bba37ae4c" ; 
    form:hasField 
                      ###Opmerking###
                      fields:0cdfe85f-ec65-498f-bd26-0ec611967de0,

                      ###Dossieromschrijving###
                      fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac,

                      ###Opmerking###
                      fields:0cdfe85f-ec65-498f-bd26-0ec611967de0,

                      ###Dossieromschrijving###
                      fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:17b66f1d-eb1f-4014-af8f-fe436e149662.

fields:17b66f1d-eb1f-4014-af8f-fe436e149662 a form:ConditionalFieldGroup ;
    mu:uuid "17b66f1d-eb1f-4014-af8f-fe436e149662";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/0ee460b1-5ef4-4d4a-b5e1-e2d7c1d5086e>
      ] ;
    form:hasFieldGroup fieldGroups:35396e31-45cf-4382-a254-e74bba37ae4c .



###########Besluit-budget-AGB###########

fieldGroups:0cb3ea99-0555-4529-a367-0a76de0fc448 a form:FieldGroup ;
    mu:uuid "0cb3ea99-0555-4529-a367-0a76de0fc448" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:40384e53-5fa2-49a8-aa52-fabcae68bc62.

fields:40384e53-5fa2-49a8-aa52-fabcae68bc62 a form:ConditionalFieldGroup ;
    mu:uuid "40384e53-5fa2-49a8-aa52-fabcae68bc62";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/9f12dc58-18ba-4a1f-9e7a-cf73d0b4f025>
      ] ;
    form:hasFieldGroup fieldGroups:0cb3ea99-0555-4529-a367-0a76de0fc448 .



###########Besluit-meerjarenplan(aanpassing)-AGB###########

fieldGroups:c305e982-fbca-4142-b3d9-88f37aa5a9a0 a form:FieldGroup ;
    mu:uuid "c305e982-fbca-4142-b3d9-88f37aa5a9a0" ; 
    form:hasField 
                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:e6e3271a-a6c9-4a8e-82f2-606856b063c7.

fields:e6e3271a-a6c9-4a8e-82f2-606856b063c7 a form:ConditionalFieldGroup ;
    mu:uuid "e6e3271a-a6c9-4a8e-82f2-606856b063c7";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/849c66c2-ba33-4ac1-a693-be48d8ac7bc7>
      ] ;
    form:hasFieldGroup fieldGroups:c305e982-fbca-4142-b3d9-88f37aa5a9a0 .



###########Besluit-over-budget(wijziging)-eredienstbestuur###########

fieldGroups:09fd371f-2afe-4b14-81a9-e780876de077 a form:FieldGroup ;
    mu:uuid "09fd371f-2afe-4b14-81a9-e780876de077" ; 
    form:hasField 
                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:a262ac48-1511-4744-a332-164f471c150d.

fields:a262ac48-1511-4744-a332-164f471c150d a form:ConditionalFieldGroup ;
    mu:uuid "a262ac48-1511-4744-a332-164f471c150d";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/df261490-cc74-4f80-b783-41c35e720b46>
      ] ;
    form:hasFieldGroup fieldGroups:09fd371f-2afe-4b14-81a9-e780876de077 .



###########Besluit-over-budget-APB###########

fieldGroups:a0759a1e-ef65-4e39-8cc4-2787ff40d2c9 a form:FieldGroup ;
    mu:uuid "a0759a1e-ef65-4e39-8cc4-2787ff40d2c9" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:fe5ba124-5298-473f-a74b-3fa1237c3520.

fields:fe5ba124-5298-473f-a74b-3fa1237c3520 a form:ConditionalFieldGroup ;
    mu:uuid "fe5ba124-5298-473f-a74b-3fa1237c3520";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/82d0696e-1225-4684-826a-923b2453f5e3>
      ] ;
    form:hasFieldGroup fieldGroups:a0759a1e-ef65-4e39-8cc4-2787ff40d2c9 .



###########Besluit-over-meerjarenplan(aanpassing)-eredienstbestuur###########

fieldGroups:ae168679-82cf-4df6-8803-cbcbc6610f47 a form:FieldGroup ;
    mu:uuid "ae168679-82cf-4df6-8803-cbcbc6610f47" ; 
    form:hasField 
                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:c5541662-1c03-446f-837c-8c56d3db5a27.

fields:c5541662-1c03-446f-837c-8c56d3db5a27 a form:ConditionalFieldGroup ;
    mu:uuid "c5541662-1c03-446f-837c-8c56d3db5a27";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/3fcf7dba-2e5b-4955-a489-6dd8285c013b>
      ] ;
    form:hasFieldGroup fieldGroups:ae168679-82cf-4df6-8803-cbcbc6610f47 .



###########Besluit-over-meerjarenplan-APB###########

fieldGroups:deb4e777-eb33-4884-a2cd-859e20c9cf71 a form:FieldGroup ;
    mu:uuid "deb4e777-eb33-4884-a2cd-859e20c9cf71" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:7b7368be-3f98-4a56-993f-39443d92cc1d.

fields:7b7368be-3f98-4a56-993f-39443d92cc1d a form:ConditionalFieldGroup ;
    mu:uuid "7b7368be-3f98-4a56-993f-39443d92cc1d";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/c417f3da-a3bd-47c5-84bf-29007323a362>
      ] ;
    form:hasFieldGroup fieldGroups:deb4e777-eb33-4884-a2cd-859e20c9cf71 .



###########Besluitenlijst###########

fieldGroups:64b712f3-c061-4368-919e-6ea6afb45192 a form:FieldGroup ;
    mu:uuid "64b712f3-c061-4368-919e-6ea6afb45192" ; 
    form:hasField 
                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d75438e8-a4c5-4b39-a606-e198fdeb7aec.

fields:d75438e8-a4c5-4b39-a606-e198fdeb7aec a form:ConditionalFieldGroup ;
    mu:uuid "d75438e8-a4c5-4b39-a606-e198fdeb7aec";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/3fa67785-ffdc-4b30-8880-2b99d97b4dee>
      ] ;
    form:hasFieldGroup fieldGroups:64b712f3-c061-4368-919e-6ea6afb45192 .



###########Budget###########

fieldGroups:8e826b62-3bce-4a9c-b8c1-e84db510c6a3 a form:FieldGroup ;
    mu:uuid "8e826b62-3bce-4a9c-b8c1-e84db510c6a3" ; 
    form:hasField 
                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:8640f3ff-2302-40eb-85c6-d932628250ed.

fields:8640f3ff-2302-40eb-85c6-d932628250ed a form:ConditionalFieldGroup ;
    mu:uuid "8640f3ff-2302-40eb-85c6-d932628250ed";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/40831a2c-771d-4b41-9720-0399998f1873>
      ] ;
    form:hasFieldGroup fieldGroups:8e826b62-3bce-4a9c-b8c1-e84db510c6a3 .



###########Goedkeuringstoezicht-Voeren###########

fieldGroups:7e841b1c-64a4-48a6-b39d-c18fe1a9394f a form:FieldGroup ;
    mu:uuid "7e841b1c-64a4-48a6-b39d-c18fe1a9394f" ; 
    form:hasField 
                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Dossieromschrijving###
                      fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:e929ed9d-3a37-4bf1-9b6c-d8285fa0ec0c.

fields:e929ed9d-3a37-4bf1-9b6c-d8285fa0ec0c a form:ConditionalFieldGroup ;
    mu:uuid "e929ed9d-3a37-4bf1-9b6c-d8285fa0ec0c";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/6af621e2-c807-479e-a6f2-2d64d8339491>
      ] ;
    form:hasFieldGroup fieldGroups:7e841b1c-64a4-48a6-b39d-c18fe1a9394f .



###########Jaarrekening###########

fieldGroups:7d5f1a08-598c-4a67-a102-a8bc07ac2f13 a form:FieldGroup ;
    mu:uuid "7d5f1a08-598c-4a67-a102-a8bc07ac2f13" ; 
    form:hasField 
                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:887f0b61-cbb6-41a9-a4d3-62d980760aa6.

fields:887f0b61-cbb6-41a9-a4d3-62d980760aa6 a form:ConditionalFieldGroup ;
    mu:uuid "887f0b61-cbb6-41a9-a4d3-62d980760aa6";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/e44c535d-4339-4d15-bdbf-d4be6046de2c>
      ] ;
    form:hasFieldGroup fieldGroups:7d5f1a08-598c-4a67-a102-a8bc07ac2f13 .



###########Meerjarenplan(aanpassing)###########

fieldGroups:e0925be1-bdce-4890-b6e4-4f7640700581 a form:FieldGroup ;
    mu:uuid "e0925be1-bdce-4890-b6e4-4f7640700581" ; 
    form:hasField 
                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:8ba3d4c6-022e-401f-a47f-847b1220f669.

fields:8ba3d4c6-022e-401f-a47f-847b1220f669 a form:ConditionalFieldGroup ;
    mu:uuid "8ba3d4c6-022e-401f-a47f-847b1220f669";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/f56c645d-b8e1-4066-813d-e213f5bc529f>
      ] ;
    form:hasFieldGroup fieldGroups:e0925be1-bdce-4890-b6e4-4f7640700581 .



###########Meerjarenplan(aanpassing)-BBC2020###########

fieldGroups:25818169-35e6-4798-bb78-c9bc4ea894d8 a form:FieldGroup ;
    mu:uuid "25818169-35e6-4798-bb78-c9bc4ea894d8" ; 
    form:hasField 
                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Gaat-het-over-het-origineel-document-of-over-een-wijziging?###
                      fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb,

                      ###Rapportjaar###
                      fields:41737f90-02d6-4036-8d60-5d5b6ccf939c,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:66d433ec-7022-420b-8bf8-e718a8ecb795.

fields:66d433ec-7022-420b-8bf8-e718a8ecb795 a form:ConditionalFieldGroup ;
    mu:uuid "66d433ec-7022-420b-8bf8-e718a8ecb795";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/2f189152-1786-4b55-a3a9-d7f06de63f1c>
      ] ;
    form:hasFieldGroup fieldGroups:25818169-35e6-4798-bb78-c9bc4ea894d8 .



###########Notulen###########

fieldGroups:2fb408e5-b38a-43fc-8ebe-7c38381312df a form:FieldGroup ;
    mu:uuid "2fb408e5-b38a-43fc-8ebe-7c38381312df" ; 
    form:hasField 
                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d441cb26-ea24-4ff7-b5fb-868e36e7d468.

fields:d441cb26-ea24-4ff7-b5fb-868e36e7d468 a form:ConditionalFieldGroup ;
    mu:uuid "d441cb26-ea24-4ff7-b5fb-868e36e7d468";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/8e791b27-7600-4577-b24e-c7c29e0eb773>
      ] ;
    form:hasFieldGroup fieldGroups:2fb408e5-b38a-43fc-8ebe-7c38381312df .



###########Oprichting-IGS###########

fieldGroups:ba1888ea-8741-4a4c-911b-74e2335a1680 a form:FieldGroup ;
    mu:uuid "ba1888ea-8741-4a4c-911b-74e2335a1680" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:0269fc98-4ba8-476a-b0d5-817f5f6928aa.

fields:0269fc98-4ba8-476a-b0d5-817f5f6928aa a form:ConditionalFieldGroup ;
    mu:uuid "0269fc98-4ba8-476a-b0d5-817f5f6928aa";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/1105564e-30c7-4371-a864-6b7329cdae6f>
      ] ;
    form:hasFieldGroup fieldGroups:ba1888ea-8741-4a4c-911b-74e2335a1680 .



###########Oprichting-autonoom-bedrijf###########

fieldGroups:dc8585b7-891d-465f-b2b5-aea3f5323b48 a form:FieldGroup ;
    mu:uuid "dc8585b7-891d-465f-b2b5-aea3f5323b48" ; 
    form:hasField 
                      ###Dossieromschrijving###
                      fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Dossieromschrijving###
                      fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:f719b1da-c8c5-4a08-bc74-89c63de96961.

fields:f719b1da-c8c5-4a08-bc74-89c63de96961 a form:ConditionalFieldGroup ;
    mu:uuid "f719b1da-c8c5-4a08-bc74-89c63de96961";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/bd0b0c42-ba5e-4acc-b644-95f6aad904c7>
      ] ;
    form:hasFieldGroup fieldGroups:dc8585b7-891d-465f-b2b5-aea3f5323b48 .



###########Oprichting-districtsbestuur###########

fieldGroups:6749f691-29b3-459c-8054-f78a3d816db2 a form:FieldGroup ;
    mu:uuid "6749f691-29b3-459c-8054-f78a3d816db2" ; 
    form:hasField 
                      ###Opmerking###
                      fields:0cdfe85f-ec65-498f-bd26-0ec611967de0,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Opmerking###
                      fields:0cdfe85f-ec65-498f-bd26-0ec611967de0,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:6a56792c-5a47-473d-9db3-3362f96a1cda.

fields:6a56792c-5a47-473d-9db3-3362f96a1cda a form:ConditionalFieldGroup ;
    mu:uuid "6a56792c-5a47-473d-9db3-3362f96a1cda";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/380674ee-0894-4c41-bcc1-9deaeb9d464c>
      ] ;
    form:hasFieldGroup fieldGroups:6749f691-29b3-459c-8054-f78a3d816db2 .



###########Oprichting-ocmw-vereniging###########

fieldGroups:831b8af6-4ce7-4b5c-8261-97a3a9309239 a form:FieldGroup ;
    mu:uuid "831b8af6-4ce7-4b5c-8261-97a3a9309239" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:fbc56ed1-bb0d-44fe-9dee-75d64f722ada.

fields:fbc56ed1-bb0d-44fe-9dee-75d64f722ada a form:ConditionalFieldGroup ;
    mu:uuid "fbc56ed1-bb0d-44fe-9dee-75d64f722ada";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/b69c9f18-967c-4feb-90a8-8eea3c8ce46b>
      ] ;
    form:hasFieldGroup fieldGroups:831b8af6-4ce7-4b5c-8261-97a3a9309239 .



###########Oprichting-of-deelname-EVA###########

fieldGroups:479990ad-12a3-43b1-a3cf-3d9897e59357 a form:FieldGroup ;
    mu:uuid "479990ad-12a3-43b1-a3cf-3d9897e59357" ; 
    form:hasField 
                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:b13143f6-f547-4aa2-9ed0-485a0dc7a354.

fields:b13143f6-f547-4aa2-9ed0-485a0dc7a354 a form:ConditionalFieldGroup ;
    mu:uuid "b13143f6-f547-4aa2-9ed0-485a0dc7a354";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/f8c070bd-96e4-43a1-8c6e-532bcd771251>
      ] ;
    form:hasFieldGroup fieldGroups:479990ad-12a3-43b1-a3cf-3d9897e59357 .



###########Rechtspositieregeling-(RPR)###########

fieldGroups:02ffc029-d60c-49f7-8b13-5250a41615a6 a form:FieldGroup ;
    mu:uuid "02ffc029-d60c-49f7-8b13-5250a41615a6" ; 
    form:hasField 
                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d4a51632-72d3-459b-b6e5-0d87fbac188a.

fields:d4a51632-72d3-459b-b6e5-0d87fbac188a a form:ConditionalFieldGroup ;
    mu:uuid "d4a51632-72d3-459b-b6e5-0d87fbac188a";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/fb21d14b-734b-48f4-bd4e-888163fd08e8>
      ] ;
    form:hasFieldGroup fieldGroups:02ffc029-d60c-49f7-8b13-5250a41615a6 .

###########Aanvullende Belasting###########

fieldGroups:487e5f38-72ff-4afa-a41b-5fcd840969a7 a form:FieldGroup ;
    mu:uuid "487e5f38-72ff-4afa-a41b-5fcd840969a7" ;
    form:hasField
                      ###Mar code###
                      fields:a1b6c2e1-c1c3-45fb-84e7-cdd241a3130d,

                      ###Geldt vanaf###
                      fields:4b32c8fb-9725-4f9f-9872-b04198732483,

                      ###Geldt tot####
                      fields:3a9f6f7d-2952-4128-84cc-bc8dc3d1ee44.

fields:7cd14dfd-81ff-4a5d-8374-5879c5877c4c form:hasConditionalFieldGroup fields:98b9fcb9-492c-467c-a2b5-94fc4123dd4e.

fields:98b9fcb9-492c-467c-a2b5-94fc4123dd4e a form:ConditionalFieldGroup ;
    mu:uuid "98b9fcb9-492c-467c-a2b5-94fc4123dd4e";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path lblodBesluit:taxType ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/3037c4f4-1c63-43ac-bfc4-b41d098b15a6> ;
        form:customValue <http://lblod.data.gift/concepts/3a815e496cadcc497ead75d7ceea376a4a523f3ff765b32abf1ec608fe6b6746>
      ] ;
    form:hasFieldGroup fieldGroups:487e5f38-72ff-4afa-a41b-5fcd840969a7 .###########Contantbelasting###########

fieldGroups:35f82f0e-a28a-4e46-836f-5ea8b21bd36a a form:FieldGroup ;
    mu:uuid "35f82f0e-a28a-4e46-836f-5ea8b21bd36a" ;
    form:hasField
                      ###Mar code###
                      fields:ef31b839-c461-4732-b35c-a8b6c7507cf1,

                      ###Geldt vanaf###
                      fields:7793c27f-a41b-4665-a876-da9d94075a70,

                      ###Geldt tot####
                      fields:eeacea67-d327-4952-bbfa-31207823ba87.

fields:7cd14dfd-81ff-4a5d-8374-5879c5877c4c form:hasConditionalFieldGroup fields:b9b99ee9-9b29-4b05-b024-79e56c5d52c9.

fields:b9b99ee9-9b29-4b05-b024-79e56c5d52c9 a form:ConditionalFieldGroup ;
    mu:uuid "b9b99ee9-9b29-4b05-b024-79e56c5d52c9";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path lblodBesluit:taxType ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/3037c4f4-1c63-43ac-bfc4-b41d098b15a6> ;
        form:customValue <http://lblod.data.gift/concepts/50dcd5efc1a21ccb619bb761eef40e300eed9e6b59eb9cc9d49e9b47bbb57779>
      ] ;
    form:hasFieldGroup fieldGroups:35f82f0e-a28a-4e46-836f-5ea8b21bd36a .###########Kohierbelasting###########

fieldGroups:577dcadb-89fb-4365-af2c-93a61c1b9264 a form:FieldGroup ;
    mu:uuid "577dcadb-89fb-4365-af2c-93a61c1b9264" ;
    form:hasField
                      ###Mar code###
                      fields:ef31b839-c461-4732-b35c-a8b6c7507cf1,

                      ###Geldt vanaf###
                      fields:7793c27f-a41b-4665-a876-da9d94075a70,

                      ###Geldt tot####
                      fields:eeacea67-d327-4952-bbfa-31207823ba87.

fields:7cd14dfd-81ff-4a5d-8374-5879c5877c4c form:hasConditionalFieldGroup fields:0c7d6a0d-146e-40bf-b834-12941feac885.

fields:0c7d6a0d-146e-40bf-b834-12941feac885 a form:ConditionalFieldGroup ;
    mu:uuid "0c7d6a0d-146e-40bf-b834-12941feac885";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path lblodBesluit:taxType ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/3037c4f4-1c63-43ac-bfc4-b41d098b15a6> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/efa4ec5a-b006-453f-985f-f986ebae11bc>
      ] ;
    form:hasFieldGroup fieldGroups:577dcadb-89fb-4365-af2c-93a61c1b9264 .###########Belastingsreglement###########

fieldGroups:ea903e93-a1c9-4542-ab11-8a274af5ee1c a form:FieldGroup ;
    mu:uuid "ea903e93-a1c9-4542-ab11-8a274af5ee1c" ; 
    form:hasField 
                      ###Soort Belasting###
                      fields:7cd14dfd-81ff-4a5d-8374-5879c5877c4c,

                      ###Vlabel opcentiem###
                      fields:1ee5132e-28c0-4292-9fe6-24c7be456580.

fields:e834ec56-2db3-43d8-8a54-baf6cc0463c6 form:hasConditionalFieldGroup fields:92a18a28-444e-49e9-8b45-4967c5c18d66.

fields:92a18a28-444e-49e9-8b45-4967c5c18d66 a form:ConditionalFieldGroup ;
    mu:uuid "92a18a28-444e-49e9-8b45-4967c5c18d66";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/c93ccd41-aee7-488f-86d3-038de890d05a> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/efa4ec5a-b006-453f-985f-f986ebae11bc>
      ] ;
    form:hasFieldGroup fieldGroups:ea903e93-a1c9-4542-ab11-8a274af5ee1c .

###########Reglementen-en-verordeningen###########

fieldGroups:a5964067-defb-48ca-8cb2-04db3d6ecd13 a form:FieldGroup ;
    mu:uuid "a5964067-defb-48ca-8cb2-04db3d6ecd13" ; 
    form:hasField 
                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Type-reglement/verordening###
                      fields:e834ec56-2db3-43d8-8a54-baf6cc0463c6,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:4f8e79e3-3b13-4a6a-b6e0-1909ab6cfa2a.

fields:4f8e79e3-3b13-4a6a-b6e0-1909ab6cfa2a a form:ConditionalFieldGroup ;
    mu:uuid "4f8e79e3-3b13-4a6a-b6e0-1909ab6cfa2a";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/67378dd0-5413-474b-8996-d992ef81637a>
      ] ;
    form:hasFieldGroup fieldGroups:a5964067-defb-48ca-8cb2-04db3d6ecd13 .



###########Schorsing-beslissing-eredienstbesturen###########

fieldGroups:6745c3c5-ed83-45e2-a9e7-ca77c18f0d05 a form:FieldGroup ;
    mu:uuid "6745c3c5-ed83-45e2-a9e7-ca77c18f0d05" ; 
    form:hasField 
                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:40f6d026-11f0-44b3-8594-58210f2860c5.

fields:40f6d026-11f0-44b3-8594-58210f2860c5 a form:ConditionalFieldGroup ;
    mu:uuid "40f6d026-11f0-44b3-8594-58210f2860c5";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/b25faa84-3ab5-47ae-98c0-1b389c77b827>
      ] ;
    form:hasFieldGroup fieldGroups:6745c3c5-ed83-45e2-a9e7-ca77c18f0d05 .



###########Statutenwijziging-IGS###########

fieldGroups:81f3de49-f87b-46a7-97ad-8d3c1ba34f9d a form:FieldGroup ;
    mu:uuid "81f3de49-f87b-46a7-97ad-8d3c1ba34f9d" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:8f4d113b-ac51-4579-a2d7-ac77caedc303.

fields:8f4d113b-ac51-4579-a2d7-ac77caedc303 a form:ConditionalFieldGroup ;
    mu:uuid "8f4d113b-ac51-4579-a2d7-ac77caedc303";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/dbc58656-b0a5-4e43-8e9e-701acb75f9b0>
      ] ;
    form:hasFieldGroup fieldGroups:81f3de49-f87b-46a7-97ad-8d3c1ba34f9d .



###########Toetreding-rechtspersoon###########

fieldGroups:46888726-9bc4-49ac-a0ef-848e37731a13 a form:FieldGroup ;
    mu:uuid "46888726-9bc4-49ac-a0ef-848e37731a13" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:4d879983-4c39-4742-a3af-690ca3b84004.

fields:4d879983-4c39-4742-a3af-690ca3b84004 a form:ConditionalFieldGroup ;
    mu:uuid "4d879983-4c39-4742-a3af-690ca3b84004";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/e27ef237-29de-49b8-be22-4ee2ab2d4e5b>
      ] ;
    form:hasFieldGroup fieldGroups:46888726-9bc4-49ac-a0ef-848e37731a13 .



###########Verslag-lokale-betrokkenheid-eredienstbesturen###########

fieldGroups:319fc495-408d-4b3d-b217-dcbdf6f414d5 a form:FieldGroup ;
    mu:uuid "319fc495-408d-4b3d-b217-dcbdf6f414d5" ; 
    form:hasField 
                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d99c663e-32ae-4865-bdeb-f961fda68d61.

fields:d99c663e-32ae-4865-bdeb-f961fda68d61 a form:ConditionalFieldGroup ;
    mu:uuid "d99c663e-32ae-4865-bdeb-f961fda68d61";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/e274f1b1-7e84-457d-befe-070afec6b752>
      ] ;
    form:hasFieldGroup fieldGroups:319fc495-408d-4b3d-b217-dcbdf6f414d5 .



###########Wijziging-autonoom-bedrijf###########

fieldGroups:d450b149-4372-40d9-bd31-ee1f1402c630 a form:FieldGroup ;
    mu:uuid "d450b149-4372-40d9-bd31-ee1f1402c630" ; 
    form:hasField 
                      ###Dossieromschrijving###
                      fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Dossieromschrijving###
                      fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:70be2b17-d91e-454b-8fda-a041432d94e8.

fields:70be2b17-d91e-454b-8fda-a041432d94e8 a form:ConditionalFieldGroup ;
    mu:uuid "70be2b17-d91e-454b-8fda-a041432d94e8";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/c945b531-4742-43fe-af55-b13da6ecc6fe>
      ] ;
    form:hasFieldGroup fieldGroups:d450b149-4372-40d9-bd31-ee1f1402c630 .



###########Wijziging-ocmw-vereniging###########

fieldGroups:8f69f627-e0f0-44e9-95f2-7db5e421f0fc a form:FieldGroup ;
    mu:uuid "8f69f627-e0f0-44e9-95f2-7db5e421f0fc" ; 
    form:hasField 
                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Datum-van-publicatie-op-webtoepassing###
                      fields:49dbe1be-877a-4890-8465-1510ff18ce18,

                      ###Datum-zitting/besluit###
                      fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb,

                      ###Ondernemingsnummer-betreffend-bedrijf/bestuur###
                      fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235,

                      ###Naam-betreffend-bedrijf/bestuur###
                      fields:78bfbd91-0778-4573-a52d-4c53b3c512eb,

                      ###Welk-beslissingsorgaan-nam-het-besluit?###
                      fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d,

                      ###Links-naar-documenten###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b,

                      ###Bestanden###
                      fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:0ae400e4-6897-4d86-982a-e1f74ead1f93.

fields:0ae400e4-6897-4d86-982a-e1f74ead1f93 a form:ConditionalFieldGroup ;
    mu:uuid "0ae400e4-6897-4d86-982a-e1f74ead1f93";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/d9c3d177-6dc6-4775-8c6a-1055a9cbdcc6>
      ] ;
    form:hasFieldGroup fieldGroups:8f69f627-e0f0-44e9-95f2-7db5e421f0fc .

form:a0a120d2-87a8-4f45-a61b-61654997cf1e a form:Form ;
    mu:uuid "a0a120d2-87a8-4f45-a61b-61654997cf1e" ;
    form:hasFieldGroup fieldGroups:allForms .
fieldGroups:allForms a form:FieldGroup;
    mu:uuid "3a60def6-107e-4716-bc5f-2f2e108f7fab" ;
    form:hasField fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a.

fields:aDynamicPropertyGroup a form:PropertyGroup;
    mu:uuid "8c71b3db-db4b-45ea-8333-ab000adcca4e";
    sh:description "A dynamic property group";
    sh:order 3;
    sh:name "aDynamicPropertyGroup".
`;
