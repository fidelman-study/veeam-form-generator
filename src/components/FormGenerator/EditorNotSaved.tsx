import Alert from "@mui/material/Alert";

export const EditorNotSaved = () => (
  <Alert severity="info">
    The current form is generated from the old configuration. Save the new
    configuration in the "Configuration" tab to see the changes.
  </Alert>
);
