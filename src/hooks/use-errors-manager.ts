import { useCallback, useState } from "react";

type IErrorType = "validation" | "parsing";
export interface IError {
  type: IErrorType;
  message: string;
}

export const useErrorsManager = () => {
  const [errors, setErrors] = useState<IError[]>([]);

  const addError = useCallback(
    (error: IError) => {
      setErrors([error, ...errors]);
    },
    [setErrors, errors],
  );

  const cleanErrors = useCallback(() => {
    setErrors([]);
  }, [setErrors]);

  return {
    errors,
    setErrors,
    addError,
    cleanErrors,
  };
};
