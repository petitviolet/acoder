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

const MIN_LINE = 10;
const MAX_LINE = 50;

const fileTypes = [];
const THEME = 'monokai';

// This is only for 'Editor', not for 'Snippet'
export const EditorComponent = (props: EditorProps) => {
  console.log(`Editor props: ${JSON.stringify(props)}`);
  React.useEffect(() => {
    if (props.fileType == null || fileTypes.includes(props.fileType)) {
      return;
    }
    try {
      // require(`ace-builds/src-noconflict/mode-${props.fileType}`);
      require(`brace/mode/${props.fileType}`);
      console.log(`new mode: ${props.fileType}`);
      fileTypes.push(props.fileType);
    } catch (e) {
      console.log(`error new mode(${props.fileType}): ${e}`);
    }
  }, [props.fileType]);
  const onChange: (string) => void = (() => {
    if (props.onChange) {
      return (content: string) => {
        props.onChange(content);
      };
    } else {
      return () => {};
    }
  })();
  if (props.readOnly) {
    return (
      <AceEditor
        mode={props.fileType}
        theme={THEME}
        value={props.contents}
        width={null}
        minLines={MIN_LINE}
        maxLines={MAX_LINE}
        readOnly={true}
        focus={false}
        highlightActiveLine={false}
        enableBasicAutocompletion={false}
        onLoad={(editor) => {
          editor.renderer.$cursorLayer.element.style.opacity=0
        }}
      />
    );
  } else {
    return (
      <AceEditor
        mode={props.fileType}
        theme={THEME}
        value={props.contents}
        width={null}
        minLines={MIN_LINE}
        maxLines={MAX_LINE}
        readOnly={props.readOnly}
        enableBasicAutocompletion={true}
        onChange={onChange}
      />
    );
  }
};
