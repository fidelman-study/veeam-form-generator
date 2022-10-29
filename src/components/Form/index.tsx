import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { FormGeneration } from "../../generated-types/form-generation.interface";
import { formBlocks } from "./form-configuration";
import { EmptyForm } from "./EmptyForm";
import { EditorNotSaved } from "./EditorNotSaved";

interface IFormProps {
  data?: FormGeneration;
  editorNotSaved: boolean;
}

const ContainerStack = styled(Stack)`
  width: 500px;
`;

export const Form: FC<IFormProps> = ({ data, editorNotSaved }) => {
  return (
    <ContainerStack spacing={3}>
      {editorNotSaved && data && <EditorNotSaved />}
      {data ? (
        Object.entries(formBlocks)
          .slice()
          .sort((a, b) => a[1].order - b[1].order)
          .map(([key, { componentFactory }]) => {
            // @ts-ignore
            return componentFactory(data[key as keyof FormGeneration], {});
          })
      ) : (
        <EmptyForm />
      )}
    </ContainerStack>
  );
};
