import { styled } from "@mui/material";
import Alert from "@mui/material/Alert";
import MuiDivider from "@mui/material/Divider";
import { FC } from "react";

const Divider = styled(MuiDivider)`
  margin: 10px 0;
`;

interface IErrorAlertProps {
  error: unknown;
}

export const ErrorAlert: FC<IErrorAlertProps> = ({ error }) => {
  const errorMessage =
    error instanceof Error ? (
      <>
        <Divider />
        {error.message}
        <Divider />
        {error.stack}
      </>
    ) : (
      <>
        <Divider />
        {String(error)}
      </>
    );

  return (
    <Alert severity="warning">
      Error in the form preparation. Please, check your configuration and try
      again.
      {errorMessage}
    </Alert>
  );
};
