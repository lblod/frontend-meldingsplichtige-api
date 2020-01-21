import { helper } from '@ember/component/helper';

export default helper(function componentForDisplayTypeEdit(displayTypeUri) {
  const mapping = {
    'http://lblod.data.gift/display-types/defaultInput' : `form/input-fields/input/edit`,
    'http://lblod.data.gift/display-types/bestuursorgaanSelect' : `form/input-fields/dynamic-select/edit`,
    'http://lblod.data.gift/display-types/dateTime' : `form/input-fields/date/edit`, //TODO: make datetime component
    'http://lblod.data.gift/display-types/date' : `form/input-fields/date/edit`,
    'http://lblod.data.gift/display-types/typeDossierSelect': `form/input-fields/type-dossier-select/edit`
  };

  //TODO: files and links component
  return mapping[displayTypeUri] || '';
});