import TextField from "@mui/material/TextField";
import { IFormFieldWithoutOptions } from "./index.interface";

interface ITextareaProps extends IFormFieldWithoutOptions {}

export const Textarea = ({ name, label }: ITextareaProps) => (
  <TextField name={name} label={label} multiline rows={4} />
);
