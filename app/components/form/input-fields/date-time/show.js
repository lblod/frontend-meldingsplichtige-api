import FormInputFieldsDateTimeEditComponent from "./edit";

export default class FormInputFieldsDateTimeShowComponent extends FormInputFieldsDateTimeEditComponent {
  get isRequiredField() {
    return true;
  }
}
