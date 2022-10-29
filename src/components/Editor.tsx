import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";
import { editor } from "monaco-editor";
import { FC, useCallback, useRef, useState } from "react";
import MonacoEditor, {
  EditorDidMount,
  EditorWillMount,
} from "react-monaco-editor";
import formGenerationSchema from "../monaco-editor-schemas/form-generation.json";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import { FormGeneration } from "../generated-types/form-generation.interface";

const EditorWrapper = styled(Box)`
  border: 1px solid ${blue[500]};
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

const monacoEditorOptions = {
  minimap: { enabled: false },
};

interface IEditorProps {
  onEditorSubmit: (data: FormGeneration) => void;
  editorValue: string;
  markers: editor.IMarker[];
  setMarkers: (markers: editor.IMarker[]) => void;
  onChange: () => void;
}

export const Editor: FC<IEditorProps> = ({
  onEditorSubmit,
  editorValue,
  markers,
  setMarkers,
  onChange,
}) => {
  const [value, setValue] = useState(editorValue);

  const handleEditorWillMount: EditorWillMount = useCallback(
    (monaco) => {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions(
        jsonDiagnosticsOptions,
      );
      monaco.editor.onDidChangeMarkers(() => {
        const markers = monaco.editor.getModelMarkers({});
        setMarkers(markers);
      });
    },
    [setMarkers],
  );

  const handleSubmit = useCallback(() => {
    if (!markers.length) {
      onEditorSubmit(JSON.parse(value));
    }
  }, [onEditorSubmit, markers.length, value]);

  return (
    <Container spacing={2} justifyContent="flex-start" alignItems="flex-start">
      <EditorWrapper>
        <MonacoEditor
          width={500}
          height="400"
          language="json"
          editorWillMount={handleEditorWillMount}
          options={monacoEditorOptions}
          value={value}
          onChange={(value) => {
            setValue(value);
            onChange();
          }}
        />
      </EditorWrapper>
      <Stack spacing={1}>
        {markers.map(({ message, endLineNumber }) => (
          <Alert key={message} severity="error">
            [Line #{endLineNumber}] {message}
          </Alert>
        ))}
      </Stack>
      <Button
        disabled={!!markers.length}
        onClick={handleSubmit}
        variant="contained"
      >
        Apply
      </Button>
    </Container>
  );
};
