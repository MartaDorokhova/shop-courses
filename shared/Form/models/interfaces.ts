import { TList } from "./types";
import { ETypeForm } from "./enums";

export interface IForm {
  formContent: TList[];
  typeForm: ETypeForm;
  onSubmitForm(data: unknown): void;
  defaultValues?: { [x: string]: string };
  onExtraHandler?(value?: unknown): void;
}
