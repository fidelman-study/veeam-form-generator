import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormGeneration } from "../../generated-types/form-generation.interface";
import { actionButtonsMap } from "../FormButtons";
import { fieldsMap } from "../FormFields";

// Great place to pass any services
type IContext = {};

export const formBlocks: {
  [key in keyof FormGeneration]: {
    order: number;
    componentFactory: (data: FormGeneration, context: IContext) => JSX.Element;
  };
} = {
  title: {
    order: 0,
    componentFactory: (data: FormGeneration, _ctx: IContext) => (
      <Typography key="title" variant="h3">
        {data.title}
      </Typography>
    ),
  },
  fields: {
    order: 1,
    componentFactory: (data: FormGeneration, _ctx: IContext) => (
      <Stack key="fields" spacing={2}>
        {data.fields.map((field) => {
          const Component = fieldsMap[field.type];
          return <Component key={field.name} {...field} />;
        })}
      </Stack>
    ),
  },
  actions: {
    order: 2,
    componentFactory: (data: FormGeneration, _ctx: IContext) => (
      <Stack key="actions" direction="row" spacing={2}>
        {data.actions.map((action) => {
          const componentFacory = actionButtonsMap[action.type];
          return componentFacory(action, {});
        })}
      </Stack>
    ),
  },
};
