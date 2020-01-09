import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  publicationDate: attr('date'),
  reportYear: attr('gyear'),
  firstDateInForce: attr('date'),
  dateNoLongerInForce: attr('date'),
  hasAdditionalTaxRate: attr('boolean'),
  beschrijving: attr('string'),
  opmerking: attr('string'),
  passedBy: belongsTo('bestuursorgaan'),
  subject: belongsTo('bestuurseenheid'),
  agendaItemTreatment: belongsTo('behandeling-van-agendapunt'),
  authenticityType: belongsTo('authenticity-type'),
  chartOfAccount: belongsTo('chart-of-account'),
  taxRate: belongsTo('tax-rate'),
  taxType: belongsTo('tax-type')
});
