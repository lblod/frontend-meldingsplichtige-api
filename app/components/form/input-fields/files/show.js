import FormInputFieldsFilesEditComponent from "./edit";

export default class FormInputFieldsFilesShowComponent extends FormInputFieldsFilesEditComponent {
  get isRequiredField() {
    return true;
  }
}
