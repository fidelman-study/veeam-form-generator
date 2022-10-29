import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Field,
  FormGeneration,
  Action,
} from "../../generated-types/form-generation.interface";
import { actionButtonsMap } from "../FormButtons";
import { fieldsMap } from "../FormFields";

type IContext = {};

export const formBlocks: {
  [key in keyof FormGeneration]: {
    order: number;
    componentFactory: (
      data: FormGeneration[key],
      context: IContext,
    ) => JSX.Element;
  };
} = {
  title: {
    order: 0,
    componentFactory: (data: string, _ctx: IContext) => (
      <Typography key="title" variant="h3">
        {data}
      </Typography>
    ),
  },
  fields: {
    order: 1,
    componentFactory: (data: Field[], _ctx: IContext) => (
      <Stack key="fields" spacing={2}>
        {data.map((item) => {
          const Component = fieldsMap[item.type];
          // @ts-ignore
          return <Component key={item.name} {...item} />;
        })}
      </Stack>
    ),
  },
  actions: {
    order: 2,
    componentFactory: (data: Action[], _ctx: IContext) => (
      <Stack key="actions" direction="row" spacing={2}>
        {data.map((item) => {
          const Component = actionButtonsMap[item.type];
          return <Component key={item.name} {...item} />;
        })}
      </Stack>
    ),
  },
};
