import Box from "@mui/material/Box";
import { TabContent } from "./TabContent";
import { useTabManager } from "../hooks/use-tab-manager";
import { Tabs } from "./Tabs";
import { Form } from "./Form";
import { FormGeneration } from "../generated-types/form-generation.interface";

const data: FormGeneration = {
  title: "This is the form title",
  actions: [
    { name: "cancel", label: "Cancel", type: "default" },
    { name: "save", label: "Save", type: "default" },
  ],
  fields: [
    { label: "Number", name: "number", type: "number" },
    { label: "Input", name: "input", type: "input" },
    { label: "Textarea", name: "textarea", type: "textarea" },
    { label: "Date", name: "date", type: "date" },
    {
      label: "Checkbox group",
      name: "checkboxgroup",
      type: "checkbox",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      label: "",
      name: "checkbox",
      type: "checkbox",
      options: [{ label: "Agree", value: "agree" }],
    },
    {
      label: "Radio group",
      name: "radio",
      type: "radio",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
    },
  ],
};

export default function App() {
  const { activeTabIndex, handleChangeActiveTab } = useTabManager();

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        activeTabIndex={activeTabIndex}
        onChangeActiveTab={handleChangeActiveTab}
        configurationStatusInfo={{
          status: "info",
          message: "3 validation errors",
        }}
      />
      <TabContent value={activeTabIndex} index={0}>
        <Form data={data} />
      </TabContent>
      <TabContent value={activeTabIndex} index={1}></TabContent>
    </Box>
  );
}
