import { FC } from "react";
import MonacoEditor, {
  EditorDidMount,
  EditorWillMount,
} from "react-monaco-editor";

const monacoEditorOptions = {
  minimap: { enabled: false },
};

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
