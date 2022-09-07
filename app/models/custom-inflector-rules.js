import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.plural(/$/, 'en');
inflector.plural(/e$/, 'es');
inflector.plural(/e([lnr])$/, 'e$1s');
inflector.plural(/([aiuo])$/, '$1s');
inflector.plural(/([^aiuoe])([aiuo])([a-z])$/, '$1$2$3$3en'); // TODO: this is a bit hack
inflector.plural(/uis$/, 'uizen');
inflector.plural(/ief$/, 'ieven');
inflector.plural(/or$/, 'oren');
inflector.plural(/ie$/, 'ies');
inflector.plural(/eid$/, 'eden');
inflector.plural(/aa([a-z])$/, 'a$1en');
inflector.plural(/uu([a-z])$/, 'u$1en');
inflector.plural(/oo([a-z])$/, 'o$1en');
inflector.singular(/en$/, '');
inflector.singular(/es$/, 'e');
inflector.singular(/e([lnr])s$/, 'e$1');
inflector.singular(/([aiuo])s$/, '$1');
inflector.singular(/([^aiuoe])([aiuo])([a-z])\3en$/, '$1$2$3'); // TODO: this is a bit hack
inflector.singular(/uizen$/, 'uis');
inflector.singular(/ieven$/, 'ief');
inflector.singular(/ies$/, 'ie');
inflector.singular(/eden$/, 'eid');
inflector.singular(/a([a-z])en$/, 'aa$1');
inflector.singular(/u([a-z])en$/, 'uu$1');
inflector.singular(/o([a-z])en$/, 'oo$1');
inflector.singular(/([auio])s$/, '$1s');
inflector.irregular(
  'behandeling-van-agendapunt',
  'behandelingen-van-agendapunten'
);
inflector.irregular('rechtsgrond-aanstelling', 'rechtsgronden-aanstelling');
inflector.irregular('rechtsgrond-artikel', 'rechtsgronden-artikel');
inflector.irregular('rechtsgrond-beeindiging', 'rechtsgronden-beeindiging');
inflector.irregular('rechtsgrond-besluit', 'rechtsgronden-besluit');
inflector.irregular('editor-document', 'editor-documents');
inflector.irregular('editor-document-status', 'editor-document-statuses');
inflector.irregular('export', 'exports');
inflector.irregular('account', 'accounts');
inflector.irregular('identificator', 'identificatoren');
inflector.irregular('file', 'files');
inflector.irregular('document-status', 'document-statuses');
inflector.irregular('bbcdr-report', 'bbcdr-reports');
inflector.irregular('validation', 'validations');
inflector.irregular('validation-execution', 'validation-executions');
inflector.irregular('validation-error', 'validation-errors');
inflector.irregular('inzending-voor-toezicht', 'inzendingen-voor-toezicht');
inflector.irregular(
  'toezicht-account-acceptance-status',
  'toezicht-account-acceptance-statuses'
);
inflector.irregular('toezicht-fiscal-period', 'toezicht-fiscal-periods');
inflector.irregular('form-solution', 'form-solutions');
inflector.irregular('dynamic-subform', 'dynamic-subforms');
inflector.irregular('form-input', 'form-inputs');
inflector.irregular(
  'inzending-voor-toezicht-form-version',
  'inzending-voor-toezicht-form-versions'
);
inflector.irregular('file-address', 'file-addresses');
inflector.irregular('submission', 'submissions');
inflector.irregular('remote-url', 'remote-urls'); // TODO check if this could be done better or generalised
inflector.irregular('submission-document', 'submission-documents');
inflector.irregular('form-data', 'form-data');
inflector.irregular('concept', 'concepts');
inflector.irregular('concept-scheme', 'concept-schemes');
// Meet Ember Inspector's expectation of an export
export default {};
