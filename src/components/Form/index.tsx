import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { FormGeneration } from "../../generated-types/form-generation.interface";
import { formBlocks } from "./form-configuration";

interface IFormProps {
  data: FormGeneration;
}

const ContainerStack = styled(Stack)`
  width: 500px;
`;

export const Form: FC<IFormProps> = (props) => {
  return (
    <ContainerStack spacing={3}>
      {Object.entries(formBlocks)
        .slice()
        .sort((a, b) => a[1].order - b[1].order)
        .map(([key, { componentFactory }]) => {
          // @ts-ignore
          return componentFactory(props.data[key as keyof FormGeneration], {});
        })}
    </ContainerStack>
  );
};
