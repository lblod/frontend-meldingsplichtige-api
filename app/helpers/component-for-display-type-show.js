import { helper } from '@ember/component/helper';

export default helper(function componentForDisplayTypeShow(displayTypeUri) {
  const mapping = {
    'http://lblod.data.gift/display-types/defaultInput' : `form/input-fields/input/show`,
    'http://lblod.data.gift/display-types/bestuursorgaanSelect' : `form/input-fields/toezicht-bestuursorgaan-select/show`,
    'http://lblod.data.gift/display-types/typeDossierSelect': `form/input-fields/input/show`, // TODO
    'http://lblod.data.gift/display-types/date' : `form/input-fields/input/show`,
  };

  //TODO: files and links component
  return mapping[displayTypeUri] || '';
});
