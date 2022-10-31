import { Action } from "../../generated-types/form-generation.interface";
import { Button } from "./Button";

// Great place to pass any services
type IContext = {};

type IActionButtonsMap = Record<
  Action["type"],
  (props: Action, ctx: IContext) => JSX.Element
>;

export const actionButtonsMap: IActionButtonsMap = {
  default: ({ label, name }, _ctx) => (
    <Button key={name} label={label} name={name} />
  ),
};
