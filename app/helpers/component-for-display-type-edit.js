import { helper } from '@ember/component/helper';

export default helper(function componentForDisplayTypeEdit(displayTypeUri) {
  const mapping = {
    'http://lblod.data.gift/display-types/defaultInput' : `form/input-fields/input/edit`,
    'http://lblod.data.gift/display-types/bestuursorgaanSelect' : `form/input-fields/toezicht-bestuursorgaan-select/edit`,
    'http://lblod.data.gift/display-types/dateTime' : `form/input-fields/date-time/edit`,
    'http://lblod.data.gift/display-types/date' : `form/input-fields/date/edit`,
    'http://lblod.data.gift/display-types/typeDossierSelect': `form/input-fields/type-dossier-select/edit`,
    'http://lblod.data.gift/display-types/textArea': `form/input-fields/text-area/edit`,
    'http://lblod.data.gift/display-types/conceptSchemeSelector': `form/input-fields/concept-scheme-selector/edit`
    'http://lblod.data.gift/display-types/files': `form/input-fields/files/edit`,
    'http://lblod.data.gift/display-types/fileAddresses': `form/input-fields/file-addresses/edit`
  };

  //TODO: files and links component
  return mapping[displayTypeUri] || '';
});
