import { FC } from "react";
import MonacoEditor, {
  EditorDidMount,
  EditorWillMount,
} from "react-monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const monacoEditorOptions = {
  minimap: { enabled: false },
};

export type IMonaco = typeof monaco;

interface IEditorProps {
  value?: string;
  onChange: (value: string) => void;
  onWillMount: EditorWillMount;
  onDidMount: EditorDidMount;
}

export const Editor: FC<IEditorProps> = ({
  value,
  onChange,
  onWillMount,
  onDidMount,
}) => (
  <MonacoEditor
    width={600}
    height={500}
    language="json"
    editorWillMount={onWillMount}
    options={monacoEditorOptions}
    value={value}
    onChange={onChange}
    editorDidMount={onDidMount}
  />
);
