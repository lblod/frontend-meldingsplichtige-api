import { helper } from '@ember/component/helper';

export default helper(function componentForDisplayTypeShow(displayTypeUri) {
  const mapping = {
    'http://lblod.data.gift/display-types/defaultInput' : `form/input-fields/input/show`,
    'http://lblod.data.gift/display-types/textArea' : `form/input-fields/text-area/show`,
    'http://lblod.data.gift/display-types/typeDossierSelect': `form/input-fields/type-dossier-select/show`,
    'http://lblod.data.gift/display-types/date' : `form/input-fields/date/show`,
    'http://lblod.data.gift/display-types/dateTime' : `form/input-fields/date-time/show`,
    'http://lblod.data.gift/display-types/files' : `form/input-fields/files/show`,
    'http://lblod.data.gift/display-types/remoteUrls' : `form/input-fields/remote-urls/show`,
    'http://lblod.data.gift/display-types/conceptSchemeSelector': `form/input-fields/concept-scheme-selector/show`,
    'http://lblod.data.gift/display-types/vLabelOpcentiem': `form/input-fields/vlabel-opcentiem/show`
  };

  //TODO: files and links component
  return mapping[displayTypeUri] || '';
});
