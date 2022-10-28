import TextField from "@mui/material/TextField";
import { IFormField } from "./index.interface";

interface INumberInputProps extends IFormField {}

export const NumberInput = ({ name, label }: INumberInputProps) => (
  <TextField type="number" name={name} variant="outlined" label={label} />
);
