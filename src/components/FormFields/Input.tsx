import TextField from "@mui/material/TextField";
import { IFormFieldWithoutOptions } from "./index.interface";

interface IInputProps extends IFormFieldWithoutOptions {}

export const Input = ({ name, label }: IInputProps) => (
  <TextField name={name} variant="outlined" label={label} />
);
