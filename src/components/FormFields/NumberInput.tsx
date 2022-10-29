import TextField from "@mui/material/TextField";
import { IFormFieldWithoutOptions } from "./index.interface";

interface INumberInputProps extends IFormFieldWithoutOptions {}

export const NumberInput = ({ name, label }: INumberInputProps) => (
  <TextField type="number" name={name} variant="outlined" label={label} />
);
