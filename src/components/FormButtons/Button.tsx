import MaterialButton from "@mui/material/Button";
import { IFormAction } from "./index.interface";

export const Button = ({ label, name }: IFormAction) => (
  <MaterialButton name={name} variant="contained">
    {label}
  </MaterialButton>
);
