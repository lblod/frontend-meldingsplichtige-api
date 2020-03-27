import FormInputFieldsDateEditComponent from "./edit";

export default class FormInputFieldsDateShowComponent extends FormInputFieldsDateEditComponent {
  get isRequiredField() {
    return true;
  }
}
