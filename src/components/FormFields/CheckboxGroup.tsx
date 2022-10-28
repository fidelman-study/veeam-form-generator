import Checkbox from "@mui/material/Checkbox";
import MaterialRadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { IFormField } from "./index.interface";

type IOption = {
  label: string;
  value: string;
};

interface ICheckboxGroupProps extends IFormField {
  options: IOption[];
}

export const CheckboxGroup = ({
  name,
  label,
  options,
}: ICheckboxGroupProps) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <MaterialRadioGroup name={name}>
      {options.map(({ label, value }) => (
        <FormControlLabel
          key={value}
          value={value}
          control={<Checkbox />}
          label={label}
        />
      ))}
    </MaterialRadioGroup>
  </FormControl>
);
