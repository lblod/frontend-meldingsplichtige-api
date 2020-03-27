import FormInputFieldsVlabelOpcentiemEditComponent from "./edit";
import { guidFor } from '@ember/object/internals';

export default class FormInputFieldsVlabelOpcentiemShowComponent extends FormInputFieldsVlabelOpcentiemEditComponent  {
  inputId = 'checkbox-' + guidFor(this);

  get isRequiredField() {
    return true;
  }
}
