import { TabContent } from "./TabContent";
import { useTabManager } from "../hooks/use-tab-manager";
import { Tabs } from "./Tabs";
import { FormGenerator } from "./FormGenerator";
import { FormGeneration } from "../generated-types/form-generation.interface";
import { FormConfiguration } from "./FormConfiguration";
import { useCallback, useRef, useState } from "react";
import { defaultConfiguration } from "../default-configuration";
import { useConfigurationStatus } from "../hooks/use-configuration-status";
import { useErrorsManager } from "../hooks/use-errors-manager";
import { IMonaco } from "./Editor";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const Container = styled(Box)`
  width: 100%;
`;

const TabsContent = styled(Box)`
  width: 660px;
`;

export default function App() {
  const { activeTabIndex, handleChangeActiveTab } = useTabManager();
  const { errors, setErrors, addError, cleanErrors } = useErrorsManager();

  const [editorContent, setEditorContent] = useState<string>();
  const [editorNotSaved, setEditorNotSaved] = useState(false);
  const [data, setData] = useState<FormGeneration>();
  const monacoRef = useRef<IMonaco>();
  const [editorTouch, setEditorTouch] = useState(false);

  const configurationStatusInfo = useConfigurationStatus({
    editorNotSaved,
    editorTouch,
    errorsNumber: errors.length,
  });

  const handleEditorSubmit = useCallback(() => {
    const markers = monacoRef.current?.editor.getModelMarkers({}) ?? [];
    if (!markers.length) {
      try {
        const newData = editorContent ? JSON.parse(editorContent) : undefined;

        setData(newData);
        setEditorNotSaved(false);
        cleanErrors();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        addError({
          message,
          type: "parsing",
        });
      }
    } else {
      const newErrors = markers.map((marker) => ({
        type: "validation" as const,
        message: `[Line #${marker.endLineNumber}] ${marker.message}`,
      }));
      setErrors(newErrors);
    }
  }, [
    setData,
    setEditorNotSaved,
    editorContent,
    cleanErrors,
    setErrors,
    monacoRef,
    addError,
  ]);

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
    setEditorContent(data ? JSON.stringify(data, null, 2) : "");
    cleanErrors();
  }, [setEditorContent, setEditorNotSaved, data, cleanErrors]);

  return (
    <Container>
      <Tabs
        activeTabIndex={activeTabIndex}
        onChangeActiveTab={handleChangeActiveTab}
        configurationStatusInfo={configurationStatusInfo}
      />
      <TabsContent>
        <TabContent value={activeTabIndex} index={0}>
          <FormConfiguration
            monacoRef={monacoRef}
            value={editorContent}
            onChange={handleEditorChange}
            onEditorSubmit={handleEditorSubmit}
            errors={errors}
            onPrefillClick={handlePrefillClick}
            onResetClick={handleResetClick}
            editorNotSaved={editorNotSaved}
          />
        </TabContent>
        <TabContent value={activeTabIndex} index={1}>
          <FormGenerator data={data} editorNotSaved={editorNotSaved} />
        </TabContent>
      </TabsContent>
    </Container>
  );
}
