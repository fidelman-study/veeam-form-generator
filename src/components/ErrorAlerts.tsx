import { FC } from "react";
import Alert from "@mui/material/Alert";
import { IError } from "../hooks/use-errors-manager";

interface IErrorAlertsProps {
  errors: IError[];
}

export const ErrorAlerts: FC<IErrorAlertsProps> = ({ errors }) => (
  <>
    {errors.map(({ message, type }) => (
      <Alert
        key={message}
        severity={type === "validation" ? "error" : "warning"}
      >
        {message}
      </Alert>
    ))}
  </>
);
