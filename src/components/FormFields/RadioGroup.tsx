import Radio from "@mui/material/Radio";
import MaterialRadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { IFormFieldWithOptions } from "./index.interface";

interface IRadioGroupProps extends IFormFieldWithOptions {}

export const RadioGroup = ({ name, label, options }: IRadioGroupProps) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <MaterialRadioGroup name={name}>
      {options.map(({ label, value }) => (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio />}
          label={label}
        />
      ))}
    </MaterialRadioGroup>
  </FormControl>
);
