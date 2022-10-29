import { useMemo } from "react";
import { IConfigurationStatus } from "../components/TabStatusIcons";

interface IUseConfigurationStatusArgs {
  editorTouch: boolean;
  errorsNumber: number;
  editorNotSaved: boolean;
}

export const useConfigurationStatus = ({
  editorTouch,
  errorsNumber,
  editorNotSaved,
}: IUseConfigurationStatusArgs) => {
  let status: IConfigurationStatus | undefined;
  let message: string = "";

  if (editorTouch) {
    if (errorsNumber) {
      status = "error";
      message = `${errorsNumber} validation error${
        errorsNumber > 1 ? "s" : ""
      }`;
    } else if (editorNotSaved) {
      status = "info";
      message = "Unsaved changes";
    } else {
      status = "success";
      message = "All good";
    }
  }

  return useMemo(
    () =>
      status
        ? {
            status,
            message,
          }
        : undefined,
    [status, message],
  );
};
