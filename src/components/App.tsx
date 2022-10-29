import Box from "@mui/material/Box";
import { TabContent } from "./TabContent";
import { useTabManager } from "../hooks/use-tab-manager";
import { Tabs } from "./Tabs";
import { Form } from "./Form";
import { FormGeneration } from "../generated-types/form-generation.interface";
import { Editor } from "./Editor";
import { useState } from "react";
import { editor, MarkerSeverity } from "monaco-editor";

const defaultData: FormGeneration = {
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
  const [data, setData] = useState<FormGeneration | null>(defaultData);
  const [markers, setMarkers] = useState<editor.IMarker[]>([]);
  const [editorNotSaved, setEditorNotSaved] = useState(false);

  const status = markers.length ? "error" : editorNotSaved ? "info" : "success";
  const message = markers.length
    ? `${markers.length} validation errors`
    : editorNotSaved
    ? "Unsaved changes"
    : "All good";

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        activeTabIndex={activeTabIndex}
        onChangeActiveTab={handleChangeActiveTab}
        configurationStatusInfo={
          status
            ? {
                status,
                message,
              }
            : undefined
        }
      />
      <TabContent value={activeTabIndex} index={0}>
        <Editor
          editorValue={JSON.stringify(data, null, 2)}
          onChange={() => setEditorNotSaved(true)}
          onEditorSubmit={(data) => {
            setData(data);
            setEditorNotSaved(false);
          }}
          markers={markers}
          setMarkers={setMarkers}
        />
      </TabContent>
      <TabContent value={activeTabIndex} index={1}>
        {data && <Form data={data} />}
      </TabContent>
    </Box>
  );
}
