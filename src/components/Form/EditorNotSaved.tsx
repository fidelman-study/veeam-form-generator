import Alert from "@mui/material/Alert";

export const EditorNotSaved = () => (
  <Alert severity="info">
    The current form is generated from the old configuration. Save the new
    changes in the "Configuration" tab.
  </Alert>
);
