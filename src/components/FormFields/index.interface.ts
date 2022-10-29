import { OptionField } from "../../generated-types/form-generation.interface";

export interface IFormFieldWithoutOptions {
  name: string;
  label: string;
}

export interface IFormFieldWithOptions {
  name: string;
  label?: string;
  options: OptionField[];
}
