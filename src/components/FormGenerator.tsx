import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";
import { editor } from "monaco-editor";
import { FC, MutableRefObject, useCallback } from "react";
import { EditorDidMount, EditorWillMount } from "react-monaco-editor";
import formGenerationSchema from "../monaco-editor-schemas/form-generation.json";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { Editor } from "./Editor";
import { ValidationAlerts } from "./ValidationAlerts";

const EditorWrapper = styled(Box)`
  border: 1px solid ${grey[400]};
  border-radius: 4px;
  padding: 4px;
`;

const Container = styled(Stack)`
  width: 500px;
`;

const jsonDiagnosticsOptions = {
  validate: true,
  schemas: [
    {
      uri: "http://json-schema.org/draft-04/schema#",
      fileMatch: ["*"],
      schema: formGenerationSchema,
    },
  ],
};

interface IFormGeneratorProps {
  onEditorSubmit: () => void;
  value?: string;
  markers: editor.IMarker[];
  onChange: (value: string) => void;
  onPrefillClick: () => void;
  onResetClick: () => void;
  getModelMarkersRef: MutableRefObject<any>;
  editorNotSaved: boolean;
}

export const FormGenerator: FC<IFormGeneratorProps> = ({
  onEditorSubmit,
  value,
  markers,
  onChange,
  onPrefillClick,
  getModelMarkersRef,
  onResetClick,
  editorNotSaved,
}) => {
  const handleEditorWillMount: EditorWillMount = useCallback((monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(
      jsonDiagnosticsOptions,
    );
  }, []);

  const handleEditorDidMount: EditorDidMount = useCallback(
    (_editor, monaco) => {
      getModelMarkersRef.current = monaco.editor.getModelMarkers;
    },
    [getModelMarkersRef],
  );

  return (
    <Container spacing={2} justifyContent="flex-start" alignItems="flex-start">
      <EditorWrapper>
        <Editor
          value={value}
          onChange={onChange}
          onWillMount={handleEditorWillMount}
          onDidMount={handleEditorDidMount}
        />
      </EditorWrapper>
      <Stack spacing={1}>
        <ValidationAlerts markers={markers} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button color="secondary" onClick={onPrefillClick}>
          Prefill
        </Button>
        <Button disabled={!editorNotSaved} onClick={onResetClick}>
          Cancel changes
        </Button>
        <Button
          disabled={!editorNotSaved}
          onClick={onEditorSubmit}
          variant="contained"
        >
          Apply
        </Button>
      </Stack>
    </Container>
  );
};
