import {
  Field,
  OptionField,
} from "../../generated-types/form-generation.interface";
import { CheckboxGroup } from "./CheckboxGroup";
import { DatePicker } from "./DatePicker";
import { Merge } from "./index.interface";
import { Input } from "./Input";
import { NumberInput } from "./NumberInput";
import { RadioGroup } from "./RadioGroup";
import { Textarea } from "./Textarea";

type IProps = Merge<Field>;

type IFieldsMap = Record<Field["type"], (props: IProps) => JSX.Element>;

export const fieldsMap: IFieldsMap = {
  number: (props) => (
    <NumberInput
      label={getDefaultLabel(props, props.label)}
      name={props.name}
    />
  ),
  input: (props) => (
    <Input label={getDefaultLabel(props, props.label)} name={props.name} />
  ),
  textarea: (props) => (
    <Textarea label={getDefaultLabel(props, props.label)} name={props.name} />
  ),
  date: (props) => (
    <DatePicker label={getDefaultLabel(props, props.label)} name={props.name} />
  ),
  radio: (props) => (
    <RadioGroup
      label={props.label}
      name={props.name}
      options={getDefaultOptions(props, props.options)}
    />
  ),
  checkbox: (props) => (
    <CheckboxGroup
      label={props.label}
      name={props.name}
      options={getDefaultOptions(props, props.options)}
    />
  ),
};

function getDefaultLabel(field: IProps, label?: string) {
  return label ?? field.name;
}

function getDefaultOptions(_field: IProps, options?: OptionField[]) {
  return options ?? [];
}
