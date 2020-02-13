import { helper } from '@ember/component/helper';

export default helper(function componentForDisplayTypeShow(displayTypeUri) {
  const mapping = {
    'http://lblod.data.gift/display-types/defaultInput' : `form/input-fields/input/show`,
    'http://lblod.data.gift/display-types/textArea' : `form/input-fields/text-area/show`,
    'http://lblod.data.gift/display-types/bestuursorgaanSelect' : `form/input-fields/toezicht-bestuursorgaan-select/show`,
    'http://lblod.data.gift/display-types/typeDossierSelect': `form/input-fields/type-dossier-select/show`,
    'http://lblod.data.gift/display-types/date' : `form/input-fields/date/show`,
  };

  //TODO: files and links component
  return mapping[displayTypeUri] || '';
});
