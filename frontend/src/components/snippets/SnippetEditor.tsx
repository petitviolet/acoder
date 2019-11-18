import * as React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-monokai';

export interface EditorProps {
  fileType: string;
  contents: string;
  readOnly: boolean;
  onChange?: (content: string) => void;
}

const MIN_LINE = 30;

const fileTypes = [];

export const EditorComponent = (props: EditorProps) => {
  console.log(`Editor props: ${JSON.stringify(props)}`);
  React.useEffect(() => {
    if (props.fileType == null || fileTypes.includes(props.fileType)) {
      return;
    }
    try {
      require(`ace-builds/src-noconflict/mode-${props.fileType}`);
      console.log(`new mode: ${props.fileType}`);
      fileTypes.push(props.fileType);
    } catch (e) {
      console.log('error new mode: ' + e);
    }
  }, [props.fileType]);
  const maxLines = (() => {
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
      minLines={MIN_LINE}
      maxLines={maxLines}
      readOnly={props.readOnly}
      onChange={onChange}
    />
  );
};

