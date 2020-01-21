export default `
@prefix besluit: <http://data.vlaanderen.be/ns/besluit#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix eli: <http://data.europa.eu/eli/ontology#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix generiek: <http://data.vlaanderen.be/ns/generiek#> .
@prefix lblod: <http://data.lblod.info/vocabularies/lblod/> .
@prefix mandaat: <http://data.vlaanderen.be/ns/mandaat#> .
@prefix ns1: <http://www.w3.org/ns/rdfa#> .
@prefix org: <http://www.w3.org/ns/org#> .
@prefix person: <http://www.w3.org/ns/person#> .
@prefix persoon: <http://data.vlaanderen.be/ns/persoon#> .
@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<> ns1:usesVocabulary besluit: .

<http://data.lblod.info/id/besluiten/e8771ac9-b659-4449-be41-889985e48110> a besluit:Besluit ;
    eli:description """
            op vrijdag worden er veel dingen gedaan
          """@nl ;
    eli:title """
          We gaan veel dingen doen
        """@nl ;
    prov:wasGeneratedBy <http://data.lblod.info/id/behandelingen-van-agendapunten/9e5d9ca2-be79-4d53-b4b3-797de6831c3b> .

<http://data.lblod.info/id/zittingen/9043a12e-eaf2-4622-8ef6-57e1a1382dcc> a besluit:Zitting ;
    besluit:heeftBesluitenlijst <http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069> ;
    besluit:isGehoudenDoor <http://data.lblod.info/id/bestuursorganen/6b4945e1679b127d12ea8c9c70ba06b77abd0213d2e15c1300c7f232e49daa65> ;
    prov:startedAtTime "Fri Dec 27 2019 13:53:06 GMT+0000 (Coordinated Universal Time)"^^xsd:dateTime .

<http://data.lblod.info/id/bestuurseenheden/4968b47120d51c329a12c6bd6742ab220cbef8f6720da3ad8e6a499150a1168d> a besluit:Bestuurseenheid ;
    skos:prefLabel """
              Gemeente
            """@nl,
        """
            Dilbeek
          """@nl ;
    org:classification <http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001> .

<http://data.lblod.info/id/bestuursorganen/ed04026321d1ae83e687f621dd5b055f7eeaccb112a5c37d939c402e8f9ed9cf> a besluit:Bestuursorgaan ;
    besluit:bestuurt <http://data.lblod.info/id/bestuurseenheden/4968b47120d51c329a12c6bd6742ab220cbef8f6720da3ad8e6a499150a1168d> ;
    skos:prefLabel "Gemeenteraad Dilbeek"@nl .

<http://mu.semte.ch/vocabularies/ext/besluitenlijsten/208ee6e0-28b1-11ea-972c-8915ff690069> a foaf:Document,
        <https://data.vlaanderen.be/id/concept/BesluitDocumentType/8e791b27-7600-4577-b24e-c7c29e0eb773>, #notulen
        <https://data.vlaanderen.be/id/concept/BesluitDocumentType/3fa67785-ffdc-4b30-8880-2b99d97b4dee> ; #besluitenlijst
    eli:date_publication "2019-12-27"^^xsd:date ;
    eli:passed_by <http://data.lblod.info/id/bestuursorganen/6b4945e1679b127d12ea8c9c70ba06b77abd0213d2e15c1300c7f232e49daa65> ;
    dct:type <https://data.vlaanderen.be/id/concept/BesluitDocumentType/3fa67785-ffdc-4b30-8880-2b99d97b4dee> .

<http://data.lblod.info/id/bestuursorganen/6b4945e1679b127d12ea8c9c70ba06b77abd0213d2e15c1300c7f232e49daa65> a besluit:Bestuursorgaan ;
    mandaat:isTijdspecialisatieVan <http://data.lblod.info/id/bestuursorganen/ed04026321d1ae83e687f621dd5b055f7eeaccb112a5c37d939c402e8f9ed9cf> .

`;
