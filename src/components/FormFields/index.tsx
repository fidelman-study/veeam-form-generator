import {
  Field,
  OptionField,
} from "../../generated-types/form-generation.interface";
import { CheckboxGroup } from "./CheckboxGroup";
import { DatePicker } from "./DatePicker";
import { Input } from "./Input";
import { NumberInput } from "./NumberInput";
import { RadioGroup } from "./RadioGroup";
import { Textarea } from "./Textarea";

type ITypeWithOptions = "checkbox" | "radio";
type ITypeWithoutOptions = Exclude<Field["type"], ITypeWithOptions>;

type IFieldsMap = Record<
  ITypeWithoutOptions,
  (props: { label: string; name: string }) => JSX.Element
> &
  Record<
    ITypeWithOptions,
    (props: {
      options: OptionField[];
      name: string;
      label?: string;
    }) => JSX.Element
  >;

export const fieldsMap: IFieldsMap = {
  number: ({ label, name }) => <NumberInput label={label} name={name} />,
  input: ({ label, name }) => <Input label={label} name={name} />,
  textarea: ({ label, name }) => <Textarea label={label} name={name} />,
  date: ({ label, name }) => <DatePicker label={label} name={name} />,
  radio: ({ label, name, options }) => (
    <RadioGroup label={label} name={name} options={options} />
  ),
  checkbox: ({ label, name, options }) => (
    <CheckboxGroup label={label} name={name} options={options} />
  ),
};
