import { FC, useCallback } from "react";
import MonacoEditor, { EditorWillMount } from "react-monaco-editor";
import formGenerationSchema from "../monaco-editor-schemas/form-generation.json";

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

export const Editor: FC = () => {
  const handleEditorWillMount: EditorWillMount = useCallback((monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(
      jsonDiagnosticsOptions,
    );
    monaco.editor.onDidChangeMarkers(() => {
      const markers = monaco.editor.getModelMarkers({});
      // TODO: update markers
    });
  }, []);

  const handleOnChange = useCallback((x: unknown, e: unknown) => {
    // TODO: update state
  }, []);

  return (
    <MonacoEditor
      width="800"
      height="600"
      language="json"
      onChange={handleOnChange}
      editorWillMount={handleEditorWillMount}
      options={monacoEditorOptions}
    />
  );
};
