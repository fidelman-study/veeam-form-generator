import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";
import { FC, MutableRefObject, useCallback } from "react";
import { EditorDidMount, EditorWillMount } from "react-monaco-editor";
import formGenerationSchema from "../monaco-editor-schemas/form-generation.json";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { Editor, IMonaco } from "./Editor";
import { ErrorAlerts } from "./ErrorAlerts";
import { IError } from "../hooks/use-errors-manager";

const EditorWrapper = styled(Box)`
  border: 1px solid ${grey[400]};
  border-radius: 4px;
  padding: 4px;
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

interface IFormConfigurationProps {
  onEditorSubmit: () => void;
  value?: string;
  errors: IError[];
  onChange: (value: string) => void;
  onPrefillClick: () => void;
  onResetClick: () => void;
  monacoRef: MutableRefObject<IMonaco | undefined>;
  editorNotSaved: boolean;
}

export const FormConfiguration: FC<IFormConfigurationProps> = ({
  onEditorSubmit,
  value,
  errors,
  onChange,
  onPrefillClick,
  monacoRef,
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
      monacoRef.current = monaco;
    },
    [monacoRef],
  );

  return (
    <Stack spacing={2} justifyContent="flex-start" alignItems="flex-start">
      <EditorWrapper>
        <Editor
          value={value}
          onChange={onChange}
          onWillMount={handleEditorWillMount}
          onDidMount={handleEditorDidMount}
        />
      </EditorWrapper>
      <Stack spacing={1}>
        <ErrorAlerts errors={errors} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button color="secondary" onClick={onPrefillClick}>
          Prefill
        </Button>
        <Button disabled={!editorNotSaved} onClick={onResetClick}>
          Cancel changes
        </Button>
        <Button disabled={!editorNotSaved} onClick={onEditorSubmit}>
          Apply
        </Button>
      </Stack>
    </Stack>
  );
};
