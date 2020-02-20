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
        form:conceptScheme <http://lblod.data.gift/concept-schemes/9cf6fa63-1f49-4d53-af06-e1c235ece10b> ;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/9cf6fa63-1f49-4d53-af06-e1c235ece10b"}""" ;
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
        form:conceptScheme <http://lblod.data.gift/concept-schemes/ac9bc402-c8e6-41fd-ad57-fad15622e560>  ;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/ac9bc402-c8e6-41fd-ad57-fad15622e560"}""" ;
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
        form:conceptScheme <http://lblod.data.gift/concept-schemes/ac9bc402-c8e6-41fd-ad57-fad15622e560>  ;
        sh:resultMessage "De waarde komt niet uit de opgegeven codelijst."@nl
      ] ;
    form:options  """{"conceptScheme":"http://lblod.data.gift/concept-schemes/ac9bc402-c8e6-41fd-ad57-fad15622e560"}""" ;
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

fieldGroups:284bf3aa-dc9e-4feb-bfa2-d02328a491cc a form:FieldGroup ;
    mu:uuid "284bf3aa-dc9e-4feb-bfa2-d02328a491cc" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:7a04645b-e115-4bdb-9ba9-b02d1d028caa.

fields:7a04645b-e115-4bdb-9ba9-b02d1d028caa a form:ConditionalFieldGroup ;
    mu:uuid "7a04645b-e115-4bdb-9ba9-b02d1d028caa";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/a0a709a7-ac07-4457-8d40-de4aea9b1432>
      ] ;
    form:hasFieldGroup fieldGroups:284bf3aa-dc9e-4feb-bfa2-d02328a491cc .



###########Advies-bij-jaarrekening-APB###########

fieldGroups:d5432aa9-06c3-4876-9205-7e18e5f7d214 a form:FieldGroup ;
    mu:uuid "d5432aa9-06c3-4876-9205-7e18e5f7d214" ;
    form:hasField fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:720129f5-8be8-4495-805e-c6da7c83403a.

fields:720129f5-8be8-4495-805e-c6da7c83403a a form:ConditionalFieldGroup ;
    mu:uuid "720129f5-8be8-4495-805e-c6da7c83403a";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/8bdc614a-d2f2-44c0-8cb1-447b1017d312>
      ] ;
    form:hasFieldGroup fieldGroups:d5432aa9-06c3-4876-9205-7e18e5f7d214 .



###########Advies-bij-jaarrekening-eredienstbestuur###########

fieldGroups:02af86b1-46e0-433b-b44e-1676e20c42cd a form:FieldGroup ;
    mu:uuid "02af86b1-46e0-433b-b44e-1676e20c42cd" ;
    form:hasField fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:0e96f848-f14f-4ee9-8f00-84a6d78bbe76.

fields:0e96f848-f14f-4ee9-8f00-84a6d78bbe76 a form:ConditionalFieldGroup ;
    mu:uuid "0e96f848-f14f-4ee9-8f00-84a6d78bbe76";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/79414af4-4f57-4ca3-aaa4-f8f1e015e71c>
      ] ;
    form:hasFieldGroup fieldGroups:02af86b1-46e0-433b-b44e-1676e20c42cd .



###########Advies-jaarrekening-OCMW-vereniging###########

fieldGroups:e71c786e-83c1-4baa-bb28-b296eb3883a5 a form:FieldGroup ;
    mu:uuid "e71c786e-83c1-4baa-bb28-b296eb3883a5" ;
    form:hasField fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:1d5d10a4-b995-4655-ab2c-2bdda6b4b31a.

fields:1d5d10a4-b995-4655-ab2c-2bdda6b4b31a a form:ConditionalFieldGroup ;
    mu:uuid "1d5d10a4-b995-4655-ab2c-2bdda6b4b31a";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/4350cdda-8291-4055-9026-5c7429357fce>
      ] ;
    form:hasFieldGroup fieldGroups:e71c786e-83c1-4baa-bb28-b296eb3883a5 .



###########Advies-samenvoeging-eredienstbesturen###########

fieldGroups:ac4ecc09-47e7-417d-a432-92beda279cd7 a form:FieldGroup ;
    mu:uuid "ac4ecc09-47e7-417d-a432-92beda279cd7" ;
    form:hasField fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:b9de3c06-40ef-40df-a05c-6b69d6baee40.

fields:b9de3c06-40ef-40df-a05c-6b69d6baee40 a form:ConditionalFieldGroup ;
    mu:uuid "b9de3c06-40ef-40df-a05c-6b69d6baee40";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/4efa4632-efc6-40d5-815a-dec785fbceac>
      ] ;
    form:hasFieldGroup fieldGroups:ac4ecc09-47e7-417d-a432-92beda279cd7 .



###########Agenda###########

fieldGroups:2ac7d834-b538-4d63-855a-014e82801995 a form:FieldGroup ;
    mu:uuid "2ac7d834-b538-4d63-855a-014e82801995" ;
    form:hasField fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:6e6956ca-744b-4a8e-a3a9-9f69b32a735e.

fields:6e6956ca-744b-4a8e-a3a9-9f69b32a735e a form:ConditionalFieldGroup ;
    mu:uuid "6e6956ca-744b-4a8e-a3a9-9f69b32a735e";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/13fefad6-a9d6-4025-83b5-e4cbee3a8965>
      ] ;
    form:hasFieldGroup fieldGroups:2ac7d834-b538-4d63-855a-014e82801995 .



###########Andere-documenten-BBC###########

fieldGroups:deb7902e-d50b-4c4d-96c1-7ca5509c54e8 a form:FieldGroup ;
    mu:uuid "deb7902e-d50b-4c4d-96c1-7ca5509c54e8" ;
    form:hasField fields:0cdfe85f-ec65-498f-bd26-0ec611967de0, fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac, fields:0cdfe85f-ec65-498f-bd26-0ec611967de0, fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:b5a82242-8b0a-44c9-8c9c-50a04866af87.

fields:b5a82242-8b0a-44c9-8c9c-50a04866af87 a form:ConditionalFieldGroup ;
    mu:uuid "b5a82242-8b0a-44c9-8c9c-50a04866af87";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/0ee460b1-5ef4-4d4a-b5e1-e2d7c1d5086e>
      ] ;
    form:hasFieldGroup fieldGroups:deb7902e-d50b-4c4d-96c1-7ca5509c54e8 .



###########Besluit-budget-AGB###########

fieldGroups:c8649da5-6737-492b-acee-e6d037a9fa40 a form:FieldGroup ;
    mu:uuid "c8649da5-6737-492b-acee-e6d037a9fa40" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:b0e2d7ce-c0a0-42d9-90d4-88bbb9170866.

fields:b0e2d7ce-c0a0-42d9-90d4-88bbb9170866 a form:ConditionalFieldGroup ;
    mu:uuid "b0e2d7ce-c0a0-42d9-90d4-88bbb9170866";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/9f12dc58-18ba-4a1f-9e7a-cf73d0b4f025>
      ] ;
    form:hasFieldGroup fieldGroups:c8649da5-6737-492b-acee-e6d037a9fa40 .



###########Besluit-meerjarenplan(aanpassing)-AGB###########

fieldGroups:30b7e808-70da-404c-80d1-5f83030a1718 a form:FieldGroup ;
    mu:uuid "30b7e808-70da-404c-80d1-5f83030a1718" ;
    form:hasField fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:caf3bc49-8f02-4ab9-999a-9c4a841a322d.

fields:caf3bc49-8f02-4ab9-999a-9c4a841a322d a form:ConditionalFieldGroup ;
    mu:uuid "caf3bc49-8f02-4ab9-999a-9c4a841a322d";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/849c66c2-ba33-4ac1-a693-be48d8ac7bc7>
      ] ;
    form:hasFieldGroup fieldGroups:30b7e808-70da-404c-80d1-5f83030a1718 .



###########Besluit-over-budget(wijziging)-eredienstbestuur###########

fieldGroups:b27b9ecc-024b-473b-b684-79e676502615 a form:FieldGroup ;
    mu:uuid "b27b9ecc-024b-473b-b684-79e676502615" ;
    form:hasField fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:1633d6d9-ff7d-4fa9-b164-d300d0a2f3d5.

fields:1633d6d9-ff7d-4fa9-b164-d300d0a2f3d5 a form:ConditionalFieldGroup ;
    mu:uuid "1633d6d9-ff7d-4fa9-b164-d300d0a2f3d5";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/df261490-cc74-4f80-b783-41c35e720b46>
      ] ;
    form:hasFieldGroup fieldGroups:b27b9ecc-024b-473b-b684-79e676502615 .



###########Besluit-over-budget-APB###########

fieldGroups:8fab9198-5dc2-42ee-84c0-a160ed06ccb5 a form:FieldGroup ;
    mu:uuid "8fab9198-5dc2-42ee-84c0-a160ed06ccb5" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:cc08e6dd-4a0c-4c52-9c4a-d8980e3104f6.

fields:cc08e6dd-4a0c-4c52-9c4a-d8980e3104f6 a form:ConditionalFieldGroup ;
    mu:uuid "cc08e6dd-4a0c-4c52-9c4a-d8980e3104f6";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/82d0696e-1225-4684-826a-923b2453f5e3>
      ] ;
    form:hasFieldGroup fieldGroups:8fab9198-5dc2-42ee-84c0-a160ed06ccb5 .



###########Besluit-over-meerjarenplan(aanpassing)-eredienstbestuur###########

fieldGroups:a7c27a38-ac0e-46a9-a4e6-7bcb20a3c27e a form:FieldGroup ;
    mu:uuid "a7c27a38-ac0e-46a9-a4e6-7bcb20a3c27e" ;
    form:hasField fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d2f7a9c9-d9b6-4d08-b060-175e3babc486.

fields:d2f7a9c9-d9b6-4d08-b060-175e3babc486 a form:ConditionalFieldGroup ;
    mu:uuid "d2f7a9c9-d9b6-4d08-b060-175e3babc486";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/3fcf7dba-2e5b-4955-a489-6dd8285c013b>
      ] ;
    form:hasFieldGroup fieldGroups:a7c27a38-ac0e-46a9-a4e6-7bcb20a3c27e .



###########Besluit-over-meerjarenplan-APB###########

fieldGroups:e50654b7-9bd7-44f6-b3c5-93e184400cee a form:FieldGroup ;
    mu:uuid "e50654b7-9bd7-44f6-b3c5-93e184400cee" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:61c2382d-425f-4b2c-b8a7-06dee1592772.

fields:61c2382d-425f-4b2c-b8a7-06dee1592772 a form:ConditionalFieldGroup ;
    mu:uuid "61c2382d-425f-4b2c-b8a7-06dee1592772";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/c417f3da-a3bd-47c5-84bf-29007323a362>
      ] ;
    form:hasFieldGroup fieldGroups:e50654b7-9bd7-44f6-b3c5-93e184400cee .



###########Besluitenlijst###########

fieldGroups:106d60dc-b438-4dbf-ac56-137f29e7f5cf a form:FieldGroup ;
    mu:uuid "106d60dc-b438-4dbf-ac56-137f29e7f5cf" ;
    form:hasField fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:e1804fdf-3f39-4898-9e93-2dad0e6572ad.

fields:e1804fdf-3f39-4898-9e93-2dad0e6572ad a form:ConditionalFieldGroup ;
    mu:uuid "e1804fdf-3f39-4898-9e93-2dad0e6572ad";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/3fa67785-ffdc-4b30-8880-2b99d97b4dee>
      ] ;
    form:hasFieldGroup fieldGroups:106d60dc-b438-4dbf-ac56-137f29e7f5cf .



###########Budget###########

fieldGroups:43ca356e-3b0b-45e8-9c8d-43cabdbd4fb5 a form:FieldGroup ;
    mu:uuid "43ca356e-3b0b-45e8-9c8d-43cabdbd4fb5" ;
    form:hasField fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:2863537d-25d9-49cd-ae3d-73f24c0edbce.

fields:2863537d-25d9-49cd-ae3d-73f24c0edbce a form:ConditionalFieldGroup ;
    mu:uuid "2863537d-25d9-49cd-ae3d-73f24c0edbce";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/40831a2c-771d-4b41-9720-0399998f1873>
      ] ;
    form:hasFieldGroup fieldGroups:43ca356e-3b0b-45e8-9c8d-43cabdbd4fb5 .



###########Goedkeuringstoezicht-Voeren###########

fieldGroups:c18d9943-b3ec-43ba-8c71-d4a18dbc5678 a form:FieldGroup ;
    mu:uuid "c18d9943-b3ec-43ba-8c71-d4a18dbc5678" ;
    form:hasField fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:f95ce957-86fc-4edd-a8da-915cf7c7c4eb.

fields:f95ce957-86fc-4edd-a8da-915cf7c7c4eb a form:ConditionalFieldGroup ;
    mu:uuid "f95ce957-86fc-4edd-a8da-915cf7c7c4eb";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/6af621e2-c807-479e-a6f2-2d64d8339491>
      ] ;
    form:hasFieldGroup fieldGroups:c18d9943-b3ec-43ba-8c71-d4a18dbc5678 .



###########Jaarrekening###########

fieldGroups:43549c21-91c2-46fe-bccd-6ad9aa17627e a form:FieldGroup ;
    mu:uuid "43549c21-91c2-46fe-bccd-6ad9aa17627e" ;
    form:hasField fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:a8a97008-deed-4732-84be-887a81a23b3c.

fields:a8a97008-deed-4732-84be-887a81a23b3c a form:ConditionalFieldGroup ;
    mu:uuid "a8a97008-deed-4732-84be-887a81a23b3c";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/e44c535d-4339-4d15-bdbf-d4be6046de2c>
      ] ;
    form:hasFieldGroup fieldGroups:43549c21-91c2-46fe-bccd-6ad9aa17627e .



###########Meerjarenplan(aanpassing)###########

fieldGroups:085133bf-9b3d-4e3d-a373-1c04715c37de a form:FieldGroup ;
    mu:uuid "085133bf-9b3d-4e3d-a373-1c04715c37de" ;
    form:hasField fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:52b431e5-7586-47be-a737-928afdda1b22.

fields:52b431e5-7586-47be-a737-928afdda1b22 a form:ConditionalFieldGroup ;
    mu:uuid "52b431e5-7586-47be-a737-928afdda1b22";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/f56c645d-b8e1-4066-813d-e213f5bc529f>
      ] ;
    form:hasFieldGroup fieldGroups:085133bf-9b3d-4e3d-a373-1c04715c37de .



###########Meerjarenplan(aanpassing)-BBC2020###########

fieldGroups:f24c34ae-b206-42f9-9a47-8bb040c723a8 a form:FieldGroup ;
    mu:uuid "f24c34ae-b206-42f9-9a47-8bb040c723a8" ;
    form:hasField fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:a8f6a6cb-dbb8-488c-878d-05603791a9eb, fields:41737f90-02d6-4036-8d60-5d5b6ccf939c, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:3e41baf4-3f1d-4ee3-b00d-bae1db3a94ca.

fields:3e41baf4-3f1d-4ee3-b00d-bae1db3a94ca a form:ConditionalFieldGroup ;
    mu:uuid "3e41baf4-3f1d-4ee3-b00d-bae1db3a94ca";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/2f189152-1786-4b55-a3a9-d7f06de63f1c>
      ] ;
    form:hasFieldGroup fieldGroups:f24c34ae-b206-42f9-9a47-8bb040c723a8 .



###########Notulen###########

fieldGroups:0abfec20-df07-4179-97b4-5082cc4ea7d1 a form:FieldGroup ;
    mu:uuid "0abfec20-df07-4179-97b4-5082cc4ea7d1" ;
    form:hasField fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:35346394-3dd5-4444-be62-94cc5c9eb4fc.

fields:35346394-3dd5-4444-be62-94cc5c9eb4fc a form:ConditionalFieldGroup ;
    mu:uuid "35346394-3dd5-4444-be62-94cc5c9eb4fc";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/8e791b27-7600-4577-b24e-c7c29e0eb773>
      ] ;
    form:hasFieldGroup fieldGroups:0abfec20-df07-4179-97b4-5082cc4ea7d1 .



###########Oprichting-IGS###########

fieldGroups:65804ac4-7a1a-4c1e-9b03-f7c735fbb047 a form:FieldGroup ;
    mu:uuid "65804ac4-7a1a-4c1e-9b03-f7c735fbb047" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:6e8bb4ec-1b16-478c-b85c-2cff10385647.

fields:6e8bb4ec-1b16-478c-b85c-2cff10385647 a form:ConditionalFieldGroup ;
    mu:uuid "6e8bb4ec-1b16-478c-b85c-2cff10385647";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/1105564e-30c7-4371-a864-6b7329cdae6f>
      ] ;
    form:hasFieldGroup fieldGroups:65804ac4-7a1a-4c1e-9b03-f7c735fbb047 .



###########Oprichting-autonoom-bedrijf###########

fieldGroups:39b837da-67cd-4db6-b715-457d5df6764f a form:FieldGroup ;
    mu:uuid "39b837da-67cd-4db6-b715-457d5df6764f" ;
    form:hasField fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:b2c8008a-bd1b-4cff-8eb0-e671d14a31cf.

fields:b2c8008a-bd1b-4cff-8eb0-e671d14a31cf a form:ConditionalFieldGroup ;
    mu:uuid "b2c8008a-bd1b-4cff-8eb0-e671d14a31cf";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/bd0b0c42-ba5e-4acc-b644-95f6aad904c7>
      ] ;
    form:hasFieldGroup fieldGroups:39b837da-67cd-4db6-b715-457d5df6764f .



###########Oprichting-districtsbestuur###########

fieldGroups:14491060-a6b2-42d1-964e-e7e45b704fbf a form:FieldGroup ;
    mu:uuid "14491060-a6b2-42d1-964e-e7e45b704fbf" ;
    form:hasField fields:0cdfe85f-ec65-498f-bd26-0ec611967de0, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:0cdfe85f-ec65-498f-bd26-0ec611967de0, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:0c421e64-973d-4391-9a53-173150df0b78.

fields:0c421e64-973d-4391-9a53-173150df0b78 a form:ConditionalFieldGroup ;
    mu:uuid "0c421e64-973d-4391-9a53-173150df0b78";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/380674ee-0894-4c41-bcc1-9deaeb9d464c>
      ] ;
    form:hasFieldGroup fieldGroups:14491060-a6b2-42d1-964e-e7e45b704fbf .



###########Oprichting-ocmw-vereniging###########

fieldGroups:c29f9197-3f07-47c2-8b0b-6817466f9fbe a form:FieldGroup ;
    mu:uuid "c29f9197-3f07-47c2-8b0b-6817466f9fbe" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:6421b98f-74ec-414b-a638-89fd913e08f2.

fields:6421b98f-74ec-414b-a638-89fd913e08f2 a form:ConditionalFieldGroup ;
    mu:uuid "6421b98f-74ec-414b-a638-89fd913e08f2";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/b69c9f18-967c-4feb-90a8-8eea3c8ce46b>
      ] ;
    form:hasFieldGroup fieldGroups:c29f9197-3f07-47c2-8b0b-6817466f9fbe .



###########Oprichting-of-deelname-EVA###########

fieldGroups:22b4733f-33a7-4778-90e2-4af1988ce791 a form:FieldGroup ;
    mu:uuid "22b4733f-33a7-4778-90e2-4af1988ce791" ;
    form:hasField fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:685e6c74-eb78-4121-b4e3-004716c0acfa.

fields:685e6c74-eb78-4121-b4e3-004716c0acfa a form:ConditionalFieldGroup ;
    mu:uuid "685e6c74-eb78-4121-b4e3-004716c0acfa";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/f8c070bd-96e4-43a1-8c6e-532bcd771251>
      ] ;
    form:hasFieldGroup fieldGroups:22b4733f-33a7-4778-90e2-4af1988ce791 .



###########Rechtspositieregeling-(RPR)###########

fieldGroups:30bc91f8-03bf-429a-b575-280d4e64e768 a form:FieldGroup ;
    mu:uuid "30bc91f8-03bf-429a-b575-280d4e64e768" ;
    form:hasField fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:0800a6b8-03eb-43d1-a568-ec611e90c1a6.

fields:0800a6b8-03eb-43d1-a568-ec611e90c1a6 a form:ConditionalFieldGroup ;
    mu:uuid "0800a6b8-03eb-43d1-a568-ec611e90c1a6";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/fb21d14b-734b-48f4-bd4e-888163fd08e8>
      ] ;
    form:hasFieldGroup fieldGroups:30bc91f8-03bf-429a-b575-280d4e64e768 .



###########Reglementen-en-verordeningen###########

fieldGroups:a6f8b41f-d067-46e3-ac43-ccf97f0a970b a form:FieldGroup ;
    mu:uuid "a6f8b41f-d067-46e3-ac43-ccf97f0a970b" ;
    form:hasField fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:e834ec56-2db3-43d8-8a54-baf6cc0463c6, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:153762a7-aafe-421f-b8f7-0749783682de.

fields:153762a7-aafe-421f-b8f7-0749783682de a form:ConditionalFieldGroup ;
    mu:uuid "153762a7-aafe-421f-b8f7-0749783682de";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/67378dd0-5413-474b-8996-d992ef81637a>
      ] ;
    form:hasFieldGroup fieldGroups:a6f8b41f-d067-46e3-ac43-ccf97f0a970b .



###########Schorsing-beslissing-eredienstbesturen###########

fieldGroups:18d8892c-9ec4-43b1-ba38-11c89300db0f a form:FieldGroup ;
    mu:uuid "18d8892c-9ec4-43b1-ba38-11c89300db0f" ;
    form:hasField fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:1cac2ff1-46c1-49d0-9333-edbd66368ff7.

fields:1cac2ff1-46c1-49d0-9333-edbd66368ff7 a form:ConditionalFieldGroup ;
    mu:uuid "1cac2ff1-46c1-49d0-9333-edbd66368ff7";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/b25faa84-3ab5-47ae-98c0-1b389c77b827>
      ] ;
    form:hasFieldGroup fieldGroups:18d8892c-9ec4-43b1-ba38-11c89300db0f .



###########Statutenwijziging-IGS###########

fieldGroups:92e41454-c38b-4ce4-9bc6-20e374ed31ac a form:FieldGroup ;
    mu:uuid "92e41454-c38b-4ce4-9bc6-20e374ed31ac" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:305969b5-990d-409f-9837-9fa5ba44f777.

fields:305969b5-990d-409f-9837-9fa5ba44f777 a form:ConditionalFieldGroup ;
    mu:uuid "305969b5-990d-409f-9837-9fa5ba44f777";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/dbc58656-b0a5-4e43-8e9e-701acb75f9b0>
      ] ;
    form:hasFieldGroup fieldGroups:92e41454-c38b-4ce4-9bc6-20e374ed31ac .



###########Toetreding-rechtspersoon###########

fieldGroups:9cf70acb-aac9-47d2-9b6e-d1056e02ac4b a form:FieldGroup ;
    mu:uuid "9cf70acb-aac9-47d2-9b6e-d1056e02ac4b" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:585ccdcd-4c75-4cce-b9a2-ce75d946f1f7.

fields:585ccdcd-4c75-4cce-b9a2-ce75d946f1f7 a form:ConditionalFieldGroup ;
    mu:uuid "585ccdcd-4c75-4cce-b9a2-ce75d946f1f7";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/e27ef237-29de-49b8-be22-4ee2ab2d4e5b>
      ] ;
    form:hasFieldGroup fieldGroups:9cf70acb-aac9-47d2-9b6e-d1056e02ac4b .



###########Verslag-lokale-betrokkenheid-eredienstbesturen###########

fieldGroups:7ce97c55-87d6-4778-b189-8fe1762b604a a form:FieldGroup ;
    mu:uuid "7ce97c55-87d6-4778-b189-8fe1762b604a" ;
    form:hasField fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:d513511a-c848-47fe-a26b-6cf5e04587a8.

fields:d513511a-c848-47fe-a26b-6cf5e04587a8 a form:ConditionalFieldGroup ;
    mu:uuid "d513511a-c848-47fe-a26b-6cf5e04587a8";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitDocumentType/e274f1b1-7e84-457d-befe-070afec6b752>
      ] ;
    form:hasFieldGroup fieldGroups:7ce97c55-87d6-4778-b189-8fe1762b604a .



###########Wijziging-autonoom-bedrijf###########

fieldGroups:f3c679c5-95fc-4b4f-87a6-4302efb58f2d a form:FieldGroup ;
    mu:uuid "f3c679c5-95fc-4b4f-87a6-4302efb58f2d" ;
    form:hasField fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:bd6ee5ac-22d6-4279-bcba-3ed279021aac, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:4feea163-69b4-4b15-b429-fba825c78d6b.

fields:4feea163-69b4-4b15-b429-fba825c78d6b a form:ConditionalFieldGroup ;
    mu:uuid "4feea163-69b4-4b15-b429-fba825c78d6b";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/c945b531-4742-43fe-af55-b13da6ecc6fe>
      ] ;
    form:hasFieldGroup fieldGroups:f3c679c5-95fc-4b4f-87a6-4302efb58f2d .



###########Wijziging-ocmw-vereniging###########

fieldGroups:808ad0f2-bbb8-4e09-8911-92f61360e27e a form:FieldGroup ;
    mu:uuid "808ad0f2-bbb8-4e09-8911-92f61360e27e" ;
    form:hasField fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:49dbe1be-877a-4890-8465-1510ff18ce18, fields:3dd6ed93-40f7-4d70-a6cb-f4de53dc8bfb, fields:6ffb0ed7-769a-41e4-b5a9-f6fb0287b235, fields:78bfbd91-0778-4573-a52d-4c53b3c512eb, fields:bffbea8d-e55b-4e3d-86e8-ba7aaee7863d, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95b, fields:c955d641-b9b3-4ec7-9838-c2a477c7e95a.

fields:0827fafe-ad19-49e1-8b2e-105d2c08a54a form:hasConditionalFieldGroup fields:770dec9a-822f-4f4d-a794-82f95d51a0ef.

fields:770dec9a-822f-4f4d-a794-82f95d51a0ef a form:ConditionalFieldGroup ;
    mu:uuid "770dec9a-822f-4f4d-a794-82f95d51a0ef";
    form:conditions
      [ a form:SingleCodelistValue ;
        form:grouping form:Bag ;
        sh:path rdf:type ;
        form:conceptScheme <http://lblod.data.gift/concept-schemes/71e6455e-1204-46a6-abf4-87319f58eaa5> ;
        form:customValue <https://data.vlaanderen.be/id/concept/BesluitType/d9c3d177-6dc6-4775-8c6a-1055a9cbdcc6>
      ] ;
    form:hasFieldGroup fieldGroups:808ad0f2-bbb8-4e09-8911-92f61360e27e .

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
