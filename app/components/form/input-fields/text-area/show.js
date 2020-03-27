import FormInputFieldsTextAreaEditComponent from "./edit";

export default class FormInputFieldsTextAreaShowComponent extends FormInputFieldsTextAreaEditComponent {
  get isRequiredField() {
    return true;
  }
}
