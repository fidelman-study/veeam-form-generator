import { editor } from "monaco-editor";
import { FC } from "react";
import Alert from "@mui/material/Alert";

interface IValidationAlertsProps {
  markers: editor.IMarker[];
}

export const ValidationAlerts: FC<IValidationAlertsProps> = ({ markers }) => (
  <>
    {markers.map(({ message, endLineNumber }) => (
      <Alert key={message} severity="error">
        [Line #{endLineNumber}] {message}
      </Alert>
    ))}
  </>
);
