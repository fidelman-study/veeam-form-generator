import TextField from "@mui/material/TextField";
import { IFormField } from "./index.interface";

interface IInputProps extends IFormField {}

export const Input = ({ name, label }: IInputProps) => (
  <TextField name={name} variant="outlined" label={label} />
);
