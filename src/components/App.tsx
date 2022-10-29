import Box from "@mui/material/Box";
import { TabContent } from "./TabContent";
import { useTabManager } from "../hooks/use-tab-manager";
import { Tabs } from "./Tabs";
import { Form } from "./Form";
import { FormGeneration } from "../generated-types/form-generation.interface";
import { FormGenerator } from "./FormGenerator";
import { useCallback, useRef, useState } from "react";
import { editor } from "monaco-editor";
import { defaultConfiguration } from "../default-configuration";
import { useConfigurationStatus } from "../hooks/use-configuration-status";

export default function App() {
  const { activeTabIndex, handleChangeActiveTab } = useTabManager();
  const [editorContent, setEditorContent] = useState<string>();
  const [markers, setMarkers] = useState<editor.IMarker[]>([]);
  const [editorNotSaved, setEditorNotSaved] = useState(false);
  const [data, setData] = useState<FormGeneration>();
  const getModelMarkersRef = useRef();
  const [editorTouch, setEditorTouch] = useState(false);

  const handleEditorSubmit = useCallback(() => {
    // @ts-ignore
    const markers = getModelMarkersRef.current();
    if (!markers.length) {
      setData(editorContent ? JSON.parse(editorContent) : undefined);
      setEditorNotSaved(false);
      setMarkers([]);
    } else {
      setMarkers(markers);
    }
  }, [setData, setEditorNotSaved, editorContent, getModelMarkersRef]);

  const handleEditorChange = useCallback(
    (editorContent: string) => {
      setEditorNotSaved(true);
      setEditorContent(editorContent);
      setEditorTouch(true);
    },
    [setEditorNotSaved, setEditorContent],
  );

  const handlePrefillClick = useCallback(() => {
    setEditorNotSaved(true);
    setEditorContent(JSON.stringify(defaultConfiguration, null, 2));
    setEditorTouch(true);
  }, [setEditorNotSaved, setEditorContent]);

  const handleResetClick = useCallback(() => {
    setEditorNotSaved(false);
    setEditorContent(JSON.stringify(data, null, 2));
    setMarkers([]);
  }, [setEditorContent, setEditorNotSaved, data, setMarkers]);

  const configurationStatusInfo = useConfigurationStatus({
    editorNotSaved,
    editorTouch,
    errorsNumber: markers.length,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        activeTabIndex={activeTabIndex}
        onChangeActiveTab={handleChangeActiveTab}
        configurationStatusInfo={configurationStatusInfo}
      />
      <TabContent value={activeTabIndex} index={0}>
        <FormGenerator
          getModelMarkersRef={getModelMarkersRef}
          value={editorContent}
          onChange={handleEditorChange}
          onEditorSubmit={handleEditorSubmit}
          markers={markers}
          onPrefillClick={handlePrefillClick}
          onResetClick={handleResetClick}
          editorNotSaved={editorNotSaved}
        />
      </TabContent>
      <TabContent value={activeTabIndex} index={1}>
        <Form data={data} editorNotSaved={editorNotSaved} />
      </TabContent>
    </Box>
  );
}
