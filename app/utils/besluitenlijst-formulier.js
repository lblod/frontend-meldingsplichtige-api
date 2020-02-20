export default `
@prefix form: <http://lblod.data.gift/vocabularies/forms/> .
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
        form:conceptScheme <http://lblod.data.gift/concept-schemes/26be3ec9-5b2e-405a-8e64-ca88d2b13adc> ;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/26be3ec9-5b2e-405a-8e64-ca88d2b13adc"}""" ;
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
    sh:order 3100 ;
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
    sh:order 3101 ;
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
    sh:order 3200 ;
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
    sh:order 3201 ;
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
    sh:order 3300 ;
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
    sh:order 3301 ;
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

# TODO: complex skos scheme
fields:7cd14dfd-81ff-4a5d-8374-5879c5877c4c a form:Field ;
    mu:uuid "7cd14dfd-81ff-4a5d-8374-5879c5877c4c" ;
    sh:name "Soort Belasting" ;
    sh:order 3400 ;
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

# TODO: complex skos scheme
# They come from the same code list, but have a broader range.
# some complex validation will occur here
# https://github.com/Informatievlaanderen/OSLOthema-lokaleBesluiten/blob/master/codelijsten/besluit-type.ttl#L433
fields:e834ec56-2db3-43d8-8a54-baf6cc0463c6 a form:Field ;
    mu:uuid "e834ec56-2db3-43d8-8a54-baf6cc0463c6" ;
    sh:name "Type reglement/verordening" ;
    sh:order 3800 ;
    sh:path rdf:type ;
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

fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b a form:Field ;
    mu:uuid "c955d641-b9b3-4ec7-9838-c2a477c7e95b" ;
    sh:name "Links naar documenten" ;
    sh:order 3900 ;
    sh:path prov:atLocation ;
    form:validations
     [ a form:UriConstraint ;
        form:grouping form:MatchEvery ;
        sh:resultMessage "Gelieve een geldige URL op te geven.";
         sh:path prov:atLocation ];
    form:displayType displayTypes:remoteUrls;
    sh:group fields:aDynamicPropertyGroup .

fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a a form:Field ;
    mu:uuid "c955d641-b9b3-4ec7-9838-c2a477c7e95a" ;
    sh:name "Bestanden" ;
    sh:order 3900 ;
    sh:path nfo:FileDataObject ;
    form:displayType displayTypes:files;
    sh:group fields:aDynamicPropertyGroup .

# TODO: this is also a highly custom component
fields:1ee5132e-28c0-4292-9fe6-24c7be456580 a form:Field ;
    mu:uuid "1ee5132e-28c0-4292-9fe6-24c7be456580" ;
    sh:name "Opcentiem" ;
    sh:order 3502 ;
    sh:path lblodBesluit:taxRate ;
    #form:validations [];
    form:displayType displayTypes:vLabelOpcentiem ;
    sh:group fields:aDynamicPropertyGroup .

###########Advies-bij-jaarrekening-AGB###########

fieldGroups:a4d22c18-d7c6-48a3-b74e-87979373eee9 a form:FieldGroup ;
    mu:uuid "a4d22c18-d7c6-48a3-b74e-87979373eee9" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:faec18ab-126c-44b7-a78c-3044182693b2.

fields:faec18ab-126c-44b7-a78c-3044182693b2 a form:ConditionalFieldGroup ;
    mu:uuid "faec18ab-126c-44b7-a78c-3044182693b2";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/a0a709a7-ac07-4457-8d40-de4aea9b1432>
      ] ;
    form:hasFieldGroup fieldGroups:a4d22c18-d7c6-48a3-b74e-87979373eee9 .



###########Advies-bij-jaarrekening-APB###########

fieldGroups:5f4ff3e7-2882-4cdc-8acd-da441ff77aca a form:FieldGroup ;
    mu:uuid "5f4ff3e7-2882-4cdc-8acd-da441ff77aca" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d386de5d-4883-415e-865f-e118a1242390.

fields:d386de5d-4883-415e-865f-e118a1242390 a form:ConditionalFieldGroup ;
    mu:uuid "d386de5d-4883-415e-865f-e118a1242390";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/8bdc614a-d2f2-44c0-8cb1-447b1017d312>
      ] ;
    form:hasFieldGroup fieldGroups:5f4ff3e7-2882-4cdc-8acd-da441ff77aca .



###########Advies-bij-jaarrekening-eredienstbestuur###########

fieldGroups:1625015f-577b-40dc-b0b0-3c310763695c a form:FieldGroup ;
    mu:uuid "1625015f-577b-40dc-b0b0-3c310763695c" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:ecdfb13e-016e-4c4e-8f7e-e94460477b0d.

fields:ecdfb13e-016e-4c4e-8f7e-e94460477b0d a form:ConditionalFieldGroup ;
    mu:uuid "ecdfb13e-016e-4c4e-8f7e-e94460477b0d";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/79414af4-4f57-4ca3-aaa4-f8f1e015e71c>
      ] ;
    form:hasFieldGroup fieldGroups:1625015f-577b-40dc-b0b0-3c310763695c .



###########Advies-jaarrekening-OCMW-vereniging###########

fieldGroups:0919f9e1-fb72-426e-9175-9422019bd1b7 a form:FieldGroup ;
    mu:uuid "0919f9e1-fb72-426e-9175-9422019bd1b7" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:e6ccf4d6-3ef0-4ee2-8f83-fcc7fcbe507e.

fields:e6ccf4d6-3ef0-4ee2-8f83-fcc7fcbe507e a form:ConditionalFieldGroup ;
    mu:uuid "e6ccf4d6-3ef0-4ee2-8f83-fcc7fcbe507e";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/4350cdda-8291-4055-9026-5c7429357fce>
      ] ;
    form:hasFieldGroup fieldGroups:0919f9e1-fb72-426e-9175-9422019bd1b7 .



###########Advies-samenvoeging-eredienstbesturen###########

fieldGroups:478c2b54-6906-4b1d-93ef-a6f61256ef5f a form:FieldGroup ;
    mu:uuid "478c2b54-6906-4b1d-93ef-a6f61256ef5f" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:bf099740-380f-4e41-92f5-4f6b3dd746de.

fields:bf099740-380f-4e41-92f5-4f6b3dd746de a form:ConditionalFieldGroup ;
    mu:uuid "bf099740-380f-4e41-92f5-4f6b3dd746de";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/4efa4632-efc6-40d5-815a-dec785fbceac>
      ] ;
    form:hasFieldGroup fieldGroups:478c2b54-6906-4b1d-93ef-a6f61256ef5f .



###########Agenda###########

fieldGroups:bad7c939-4218-458b-b826-b8e4cd5ef438 a form:FieldGroup ;
    mu:uuid "bad7c939-4218-458b-b826-b8e4cd5ef438" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:a54751bd-2ee2-43b8-bcbc-1a154460191a.

fields:a54751bd-2ee2-43b8-bcbc-1a154460191a a form:ConditionalFieldGroup ;
    mu:uuid "a54751bd-2ee2-43b8-bcbc-1a154460191a";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/13fefad6-a9d6-4025-83b5-e4cbee3a8965>
      ] ;
    form:hasFieldGroup fieldGroups:bad7c939-4218-458b-b826-b8e4cd5ef438 .



###########Andere-documenten-BBC###########

fieldGroups:58334814-fe92-4f68-85d6-0b732b0327bf a form:FieldGroup ;
    mu:uuid "58334814-fe92-4f68-85d6-0b732b0327bf" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:8d34c28e-5e6b-40ff-90e9-f7892aea6d98.

fields:8d34c28e-5e6b-40ff-90e9-f7892aea6d98 a form:ConditionalFieldGroup ;
    mu:uuid "8d34c28e-5e6b-40ff-90e9-f7892aea6d98";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/0ee460b1-5ef4-4d4a-b5e1-e2d7c1d5086e>
      ] ;
    form:hasFieldGroup fieldGroups:58334814-fe92-4f68-85d6-0b732b0327bf .



###########Besluit-budget-AGB###########

fieldGroups:78f36ee4-424e-44a9-afca-2bd6f51f0f99 a form:FieldGroup ;
    mu:uuid "78f36ee4-424e-44a9-afca-2bd6f51f0f99" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:af82671d-9fb6-439b-a6f2-09c17a81332b.

fields:af82671d-9fb6-439b-a6f2-09c17a81332b a form:ConditionalFieldGroup ;
    mu:uuid "af82671d-9fb6-439b-a6f2-09c17a81332b";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/9f12dc58-18ba-4a1f-9e7a-cf73d0b4f025>
      ] ;
    form:hasFieldGroup fieldGroups:78f36ee4-424e-44a9-afca-2bd6f51f0f99 .



###########Besluit-meerjarenplan(aanpassing)-AGB###########

fieldGroups:30cd990e-1ef8-4d5e-829d-4902172774fe a form:FieldGroup ;
    mu:uuid "30cd990e-1ef8-4d5e-829d-4902172774fe" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:b11158cc-fb48-4e6e-b308-44e737c4b9c5.

fields:b11158cc-fb48-4e6e-b308-44e737c4b9c5 a form:ConditionalFieldGroup ;
    mu:uuid "b11158cc-fb48-4e6e-b308-44e737c4b9c5";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/849c66c2-ba33-4ac1-a693-be48d8ac7bc7>
      ] ;
    form:hasFieldGroup fieldGroups:30cd990e-1ef8-4d5e-829d-4902172774fe .



###########Besluit-over-budget(wijziging)-eredienstbestuur###########

fieldGroups:71120433-de39-4e63-9a37-d74becab91ab a form:FieldGroup ;
    mu:uuid "71120433-de39-4e63-9a37-d74becab91ab" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:6a552f93-e6de-4675-8b05-ed3c04a215be.

fields:6a552f93-e6de-4675-8b05-ed3c04a215be a form:ConditionalFieldGroup ;
    mu:uuid "6a552f93-e6de-4675-8b05-ed3c04a215be";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/df261490-cc74-4f80-b783-41c35e720b46>
      ] ;
    form:hasFieldGroup fieldGroups:71120433-de39-4e63-9a37-d74becab91ab .



###########Besluit-over-budget-APB###########

fieldGroups:99facf31-8173-48c3-ba08-47d3e5266117 a form:FieldGroup ;
    mu:uuid "99facf31-8173-48c3-ba08-47d3e5266117" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d43992ef-2896-4ea3-9d42-bca129f15223.

fields:d43992ef-2896-4ea3-9d42-bca129f15223 a form:ConditionalFieldGroup ;
    mu:uuid "d43992ef-2896-4ea3-9d42-bca129f15223";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/82d0696e-1225-4684-826a-923b2453f5e3>
      ] ;
    form:hasFieldGroup fieldGroups:99facf31-8173-48c3-ba08-47d3e5266117 .



###########Besluit-over-meerjarenplan(aanpassing)-eredienstbestuur###########

fieldGroups:6922b487-a9e1-471c-aa06-f2431d84c634 a form:FieldGroup ;
    mu:uuid "6922b487-a9e1-471c-aa06-f2431d84c634" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:96c5e893-09b0-4ea2-b43c-a30aee033265.

fields:96c5e893-09b0-4ea2-b43c-a30aee033265 a form:ConditionalFieldGroup ;
    mu:uuid "96c5e893-09b0-4ea2-b43c-a30aee033265";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/3fcf7dba-2e5b-4955-a489-6dd8285c013b>
      ] ;
    form:hasFieldGroup fieldGroups:6922b487-a9e1-471c-aa06-f2431d84c634 .



###########Besluit-over-meerjarenplan-APB###########

fieldGroups:ae059c98-1e3a-4ad8-8952-440396c8ee43 a form:FieldGroup ;
    mu:uuid "ae059c98-1e3a-4ad8-8952-440396c8ee43" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:ffc0f3f7-9d7a-47f2-a82e-4693e12c4644.

fields:ffc0f3f7-9d7a-47f2-a82e-4693e12c4644 a form:ConditionalFieldGroup ;
    mu:uuid "ffc0f3f7-9d7a-47f2-a82e-4693e12c4644";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/c417f3da-a3bd-47c5-84bf-29007323a362>
      ] ;
    form:hasFieldGroup fieldGroups:ae059c98-1e3a-4ad8-8952-440396c8ee43 .



###########Besluitenlijst###########

fieldGroups:b4f15082-37c4-4279-9337-40a323ac603e a form:FieldGroup ;
    mu:uuid "b4f15082-37c4-4279-9337-40a323ac603e" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:0343c36a-6cd8-4efd-8787-f8649f09cbda.

fields:0343c36a-6cd8-4efd-8787-f8649f09cbda a form:ConditionalFieldGroup ;
    mu:uuid "0343c36a-6cd8-4efd-8787-f8649f09cbda";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/3fa67785-ffdc-4b30-8880-2b99d97b4dee>
      ] ;
    form:hasFieldGroup fieldGroups:b4f15082-37c4-4279-9337-40a323ac603e .



###########Budget###########

fieldGroups:a290a045-30f2-4c2e-ac36-03f6f90d4af5 a form:FieldGroup ;
    mu:uuid "a290a045-30f2-4c2e-ac36-03f6f90d4af5" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:72abbdfe-d146-485d-89b5-92c834de5d23.

fields:72abbdfe-d146-485d-89b5-92c834de5d23 a form:ConditionalFieldGroup ;
    mu:uuid "72abbdfe-d146-485d-89b5-92c834de5d23";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/40831a2c-771d-4b41-9720-0399998f1873>
      ] ;
    form:hasFieldGroup fieldGroups:a290a045-30f2-4c2e-ac36-03f6f90d4af5 .



###########Goedkeuringstoezicht-Voeren###########

fieldGroups:660f7a76-fad0-4c26-97d2-dae29e981a32 a form:FieldGroup ;
    mu:uuid "660f7a76-fad0-4c26-97d2-dae29e981a32" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:3cfbd2c1-a3e5-47cb-8417-702ebcdbd2b2.

fields:3cfbd2c1-a3e5-47cb-8417-702ebcdbd2b2 a form:ConditionalFieldGroup ;
    mu:uuid "3cfbd2c1-a3e5-47cb-8417-702ebcdbd2b2";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/6af621e2-c807-479e-a6f2-2d64d8339491>
      ] ;
    form:hasFieldGroup fieldGroups:660f7a76-fad0-4c26-97d2-dae29e981a32 .



###########Jaarrekening###########

fieldGroups:bec59b74-fbee-4f3b-95a5-4537a9055688 a form:FieldGroup ;
    mu:uuid "bec59b74-fbee-4f3b-95a5-4537a9055688" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:419b3190-0198-4a7f-b1fc-af304606aa31.

fields:419b3190-0198-4a7f-b1fc-af304606aa31 a form:ConditionalFieldGroup ;
    mu:uuid "419b3190-0198-4a7f-b1fc-af304606aa31";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/e44c535d-4339-4d15-bdbf-d4be6046de2c>
      ] ;
    form:hasFieldGroup fieldGroups:bec59b74-fbee-4f3b-95a5-4537a9055688 .



###########Meerjarenplan(aanpassing)###########

fieldGroups:3942b733-4e2b-4865-87b6-09b91a635ee7 a form:FieldGroup ;
    mu:uuid "3942b733-4e2b-4865-87b6-09b91a635ee7" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:38ade4d1-8a28-4151-843b-a9a2ac1104a9.

fields:38ade4d1-8a28-4151-843b-a9a2ac1104a9 a form:ConditionalFieldGroup ;
    mu:uuid "38ade4d1-8a28-4151-843b-a9a2ac1104a9";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/f56c645d-b8e1-4066-813d-e213f5bc529f>
      ] ;
    form:hasFieldGroup fieldGroups:3942b733-4e2b-4865-87b6-09b91a635ee7 .



###########Meerjarenplan(aanpassing)-BBC2020###########

fieldGroups:7c4c78c2-62bc-4bdf-ad48-49fd11de065d a form:FieldGroup ;
    mu:uuid "7c4c78c2-62bc-4bdf-ad48-49fd11de065d" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:05e28aeb-be0e-44a0-9a8c-78a0d2142c7a.

fields:05e28aeb-be0e-44a0-9a8c-78a0d2142c7a a form:ConditionalFieldGroup ;
    mu:uuid "05e28aeb-be0e-44a0-9a8c-78a0d2142c7a";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/2f189152-1786-4b55-a3a9-d7f06de63f1c>
      ] ;
    form:hasFieldGroup fieldGroups:7c4c78c2-62bc-4bdf-ad48-49fd11de065d .



###########Notulen###########

fieldGroups:1ca98210-03c4-448f-af9d-63a0507a8c47 a form:FieldGroup ;
    mu:uuid "1ca98210-03c4-448f-af9d-63a0507a8c47" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:b4cb6fd8-3805-405c-ab0a-5e9cc269b732.

fields:b4cb6fd8-3805-405c-ab0a-5e9cc269b732 a form:ConditionalFieldGroup ;
    mu:uuid "b4cb6fd8-3805-405c-ab0a-5e9cc269b732";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/8e791b27-7600-4577-b24e-c7c29e0eb773>
      ] ;
    form:hasFieldGroup fieldGroups:1ca98210-03c4-448f-af9d-63a0507a8c47 .



###########Oprichting-IGS###########

fieldGroups:7c3e88d9-bd51-4976-a54c-44fc33e4a935 a form:FieldGroup ;
    mu:uuid "7c3e88d9-bd51-4976-a54c-44fc33e4a935" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:71a95146-4510-4a77-a696-e655c9df7f3b.

fields:71a95146-4510-4a77-a696-e655c9df7f3b a form:ConditionalFieldGroup ;
    mu:uuid "71a95146-4510-4a77-a696-e655c9df7f3b";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/1105564e-30c7-4371-a864-6b7329cdae6f>
      ] ;
    form:hasFieldGroup fieldGroups:7c3e88d9-bd51-4976-a54c-44fc33e4a935 .



###########Oprichting-autonoom-bedrijf###########

fieldGroups:a550b494-ba1c-4e57-8667-7cedccd3a2d2 a form:FieldGroup ;
    mu:uuid "a550b494-ba1c-4e57-8667-7cedccd3a2d2" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:ccb0b863-1159-41df-ba3b-8e2ec07438bd.

fields:ccb0b863-1159-41df-ba3b-8e2ec07438bd a form:ConditionalFieldGroup ;
    mu:uuid "ccb0b863-1159-41df-ba3b-8e2ec07438bd";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/bd0b0c42-ba5e-4acc-b644-95f6aad904c7>
      ] ;
    form:hasFieldGroup fieldGroups:a550b494-ba1c-4e57-8667-7cedccd3a2d2 .



###########Oprichting-districtsbestuur###########

fieldGroups:02dbbff7-2af7-4baa-8880-ad324d0d49a6 a form:FieldGroup ;
    mu:uuid "02dbbff7-2af7-4baa-8880-ad324d0d49a6" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:47879a2b-af0b-4cca-b0c6-45fac3212519.

fields:47879a2b-af0b-4cca-b0c6-45fac3212519 a form:ConditionalFieldGroup ;
    mu:uuid "47879a2b-af0b-4cca-b0c6-45fac3212519";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/380674ee-0894-4c41-bcc1-9deaeb9d464c>
      ] ;
    form:hasFieldGroup fieldGroups:02dbbff7-2af7-4baa-8880-ad324d0d49a6 .



###########Oprichting-ocmw-vereniging###########

fieldGroups:070cfa07-3806-45b0-8dc2-c1ac6aaa5275 a form:FieldGroup ;
    mu:uuid "070cfa07-3806-45b0-8dc2-c1ac6aaa5275" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:22b56ff2-9d86-42fe-91b7-3a98fe0da085.

fields:22b56ff2-9d86-42fe-91b7-3a98fe0da085 a form:ConditionalFieldGroup ;
    mu:uuid "22b56ff2-9d86-42fe-91b7-3a98fe0da085";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/b69c9f18-967c-4feb-90a8-8eea3c8ce46b>
      ] ;
    form:hasFieldGroup fieldGroups:070cfa07-3806-45b0-8dc2-c1ac6aaa5275 .



###########Oprichting-of-deelname-EVA###########

fieldGroups:4d05c276-213f-48ae-a3ad-454537dbca23 a form:FieldGroup ;
    mu:uuid "4d05c276-213f-48ae-a3ad-454537dbca23" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:27818959-4c3b-47b7-9cf4-b78a68cab20d.

fields:27818959-4c3b-47b7-9cf4-b78a68cab20d a form:ConditionalFieldGroup ;
    mu:uuid "27818959-4c3b-47b7-9cf4-b78a68cab20d";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/f8c070bd-96e4-43a1-8c6e-532bcd771251>
      ] ;
    form:hasFieldGroup fieldGroups:4d05c276-213f-48ae-a3ad-454537dbca23 .



###########Rechtspositieregeling-(RPR)###########

fieldGroups:513ad026-49e7-475e-b9e8-094923996517 a form:FieldGroup ;
    mu:uuid "513ad026-49e7-475e-b9e8-094923996517" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:474008b2-ac82-4579-844e-9204c1c9d484.

fields:474008b2-ac82-4579-844e-9204c1c9d484 a form:ConditionalFieldGroup ;
    mu:uuid "474008b2-ac82-4579-844e-9204c1c9d484";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/fb21d14b-734b-48f4-bd4e-888163fd08e8>
      ] ;
    form:hasFieldGroup fieldGroups:513ad026-49e7-475e-b9e8-094923996517 .



###########Reglementen-en-verordeningen###########

fieldGroups:79c54e95-04cb-4297-9db0-e85fd251c660 a form:FieldGroup ;
    mu:uuid "79c54e95-04cb-4297-9db0-e85fd251c660" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:4806594c-636c-4fd2-a589-73086d9f1cfe.

fields:4806594c-636c-4fd2-a589-73086d9f1cfe a form:ConditionalFieldGroup ;
    mu:uuid "4806594c-636c-4fd2-a589-73086d9f1cfe";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/67378dd0-5413-474b-8996-d992ef81637a>
      ] ;
    form:hasFieldGroup fieldGroups:79c54e95-04cb-4297-9db0-e85fd251c660 .



###########Schorsing-beslissing-eredienstbesturen###########

fieldGroups:b919c21f-2021-4d6e-9f0b-d5dd8a1816c2 a form:FieldGroup ;
    mu:uuid "b919c21f-2021-4d6e-9f0b-d5dd8a1816c2" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:a2ea0ad5-3d73-4ed4-bdbe-e1a7648183c0.

fields:a2ea0ad5-3d73-4ed4-bdbe-e1a7648183c0 a form:ConditionalFieldGroup ;
    mu:uuid "a2ea0ad5-3d73-4ed4-bdbe-e1a7648183c0";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/b25faa84-3ab5-47ae-98c0-1b389c77b827>
      ] ;
    form:hasFieldGroup fieldGroups:b919c21f-2021-4d6e-9f0b-d5dd8a1816c2 .



###########Statutenwijziging-IGS###########

fieldGroups:db74eb08-27be-40f3-9b3e-82ce0a6ec6d8 a form:FieldGroup ;
    mu:uuid "db74eb08-27be-40f3-9b3e-82ce0a6ec6d8" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:ee02c1a7-37af-446c-af3d-1a44b8db9258.

fields:ee02c1a7-37af-446c-af3d-1a44b8db9258 a form:ConditionalFieldGroup ;
    mu:uuid "ee02c1a7-37af-446c-af3d-1a44b8db9258";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/dbc58656-b0a5-4e43-8e9e-701acb75f9b0>
      ] ;
    form:hasFieldGroup fieldGroups:db74eb08-27be-40f3-9b3e-82ce0a6ec6d8 .



###########Toetreding-rechtspersoon###########

fieldGroups:8faa33d8-8aef-47a9-b002-a3de4d130379 a form:FieldGroup ;
    mu:uuid "8faa33d8-8aef-47a9-b002-a3de4d130379" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:731a86a2-6685-4115-8edd-acbeddd49043.

fields:731a86a2-6685-4115-8edd-acbeddd49043 a form:ConditionalFieldGroup ;
    mu:uuid "731a86a2-6685-4115-8edd-acbeddd49043";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/e27ef237-29de-49b8-be22-4ee2ab2d4e5b>
      ] ;
    form:hasFieldGroup fieldGroups:8faa33d8-8aef-47a9-b002-a3de4d130379 .



###########Verslag-lokale-betrokkenheid-eredienstbesturen###########

fieldGroups:8d69a19e-1107-4229-b4c5-233f06a21eae a form:FieldGroup ;
    mu:uuid "8d69a19e-1107-4229-b4c5-233f06a21eae" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:3971086b-dc4a-4eab-bbec-c0292ebd2233.

fields:3971086b-dc4a-4eab-bbec-c0292ebd2233 a form:ConditionalFieldGroup ;
    mu:uuid "3971086b-dc4a-4eab-bbec-c0292ebd2233";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/e274f1b1-7e84-457d-befe-070afec6b752>
      ] ;
    form:hasFieldGroup fieldGroups:8d69a19e-1107-4229-b4c5-233f06a21eae .



###########Wijziging-autonoom-bedrijf###########

fieldGroups:25fbc04c-cc00-4405-9c9a-c52b4be3d268 a form:FieldGroup ;
    mu:uuid "25fbc04c-cc00-4405-9c9a-c52b4be3d268" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:a32848ef-3a00-4ca5-b962-0891252dc23f.

fields:a32848ef-3a00-4ca5-b962-0891252dc23f a form:ConditionalFieldGroup ;
    mu:uuid "a32848ef-3a00-4ca5-b962-0891252dc23f";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/c945b531-4742-43fe-af55-b13da6ecc6fe>
      ] ;
    form:hasFieldGroup fieldGroups:25fbc04c-cc00-4405-9c9a-c52b4be3d268 .



###########Wijziging-ocmw-vereniging###########

fieldGroups:d69f47d7-4d6b-43fa-924b-211cab4a6735 a form:FieldGroup ;
    mu:uuid "d69f47d7-4d6b-43fa-924b-211cab4a6735" ;
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


fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:217dc74c-21e1-4527-822e-c2a1df62a643.

fields:217dc74c-21e1-4527-822e-c2a1df62a643 a form:ConditionalFieldGroup ;
    mu:uuid "217dc74c-21e1-4527-822e-c2a1df62a643";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/d9c3d177-6dc6-4775-8c6a-1055a9cbdcc6>
      ] ;
    form:hasFieldGroup fieldGroups:d69f47d7-4d6b-43fa-924b-211cab4a6735 .

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
