import Stack from "@mui/material/Stack";
import { FC } from "react";
import { FormGeneration } from "../../generated-types/form-generation.interface";
import { formBlocks } from "./form-configuration";
import { EmptyForm } from "./EmptyForm";
import { EditorNotSaved } from "./EditorNotSaved";

export interface IFormProps {
  data?: FormGeneration;
  editorNotSaved: boolean;
}

export const Form: FC<IFormProps> = ({ data, editorNotSaved }) => {
  return (
    <Stack spacing={3}>
      {editorNotSaved && data && <EditorNotSaved />}
      {data ? (
        Object.entries(formBlocks)
          .slice()
          .sort((a, b) => a[1].order - b[1].order)
          .map(([_key, { componentFactory }]) => {
            return componentFactory(data, {});
          })
      ) : (
        <EmptyForm />
      )}
    </Stack>
  );
};
