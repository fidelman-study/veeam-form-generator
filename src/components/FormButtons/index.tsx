import { Action } from "../../generated-types/form-generation.interface";
import { Button } from "./Button";

type IActionButtonsMap = Record<
  Action["type"],
  (props: { label: string; name: string }) => JSX.Element
>;

export const actionButtonsMap: IActionButtonsMap = {
  default: ({ label, name }) => <Button label={label} name={name} />,
};
