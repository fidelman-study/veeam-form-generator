import { FC } from "react";
import { IFormProps, Form } from "./Form";
import { FormErrorBoundary } from "./FormErrorBoundry";

interface IFormGeneratorProps extends IFormProps {}

export const FormGenerator: FC<IFormGeneratorProps> = (props) => {
  return (
    <FormErrorBoundary>
      <Form {...props} />
    </FormErrorBoundary>
  );
};
