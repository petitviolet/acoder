import * as React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-monokai';

interface EditorProps {
  fileType: string;
  contents: string;
  readOnly: boolean;
  onChange?: (content: string) => void;
}

export const EditorComponent = (props: EditorProps) => {
  const [fileTypes, addFileTypes] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (props.fileType == null || fileTypes.includes(props.fileType)) {
      return;
    }
    try {
      require(`ace-builds/src-noconflict/mode-${props.fileType}`);
      console.log(`new mode: ${props.fileType}`);
      addFileTypes(fileTypes.concat([props.fileType]));
    } catch (e) {
      console.log('error new mode: ' + e);
    }
  }, [props.fileType]);
  const lines = (() => {
    const lineNum = props.contents.split('\n').length;
    return lineNum < 50 ? lineNum : 50;
  })();
  const onChange: (string) => void = (() => {
    if (props.onChange) {
      return (content: string) => {
        props.onChange(content);
      };
    } else {
      return () => {};
    }
  })();
  return (
    <AceEditor
      mode={props.fileType}
      theme="monokai"
      value={props.contents}
      maxLines={lines}
      readOnly={props.readOnly}
      onChange={onChange}
    />
  );
};

