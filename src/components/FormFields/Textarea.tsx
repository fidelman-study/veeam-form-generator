import TextField from "@mui/material/TextField";
import { IFormField } from "./index.interface";

interface ITextareaProps extends IFormField {}

export const Textarea = ({ name, label }: ITextareaProps) => (
  <TextField name={name} label={label} multiline rows={4} />
);
