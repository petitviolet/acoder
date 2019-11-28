import * as React from 'react';
import AceEditor from 'react-ace';

export type EditorProps = {
  fileType: string;
  contents: string;
  readOnly: boolean;
  onChange?: (content: string) => void;
  theme?: string;
};

const MIN_LINE = 10;
const MAX_LINE = 50;

const FILE_TYPES = [];
const THEMES = [];
const DEFAULT_THEME = 'monokai';

// This is only for 'Editor', not for 'Snippet'
export const EditorComponent = (props: EditorProps) => {
  console.log(`Editor props: ${JSON.stringify(props)}`);
  const theme = props.theme || DEFAULT_THEME;
  React.useMemo(() => {
    if (THEMES.includes(props.theme)) {
      return;
    }
    try {
      require(`ace-builds/src-noconflict/theme-${theme}`);
      console.log(`new theme: ${theme}`);
      THEMES.push(theme);
    } catch (e) {
      console.log(`error new theme(${theme}): ${e}`);
    }
  }, [props.theme]);

  React.useMemo(() => {
    if (!props.fileType || FILE_TYPES.includes(props.fileType)) {
      return;
    }
    try {
      require(`ace-builds/src-noconflict/mode-${props.fileType}`);
      console.log(`new mode: ${props.fileType}`);
      FILE_TYPES.push(props.fileType);
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
        theme={theme}
        value={props.contents}
        width={null}
        minLines={MIN_LINE}
        maxLines={MAX_LINE}
        readOnly={true}
        focus={false}
        highlightActiveLine={false}
        enableBasicAutocompletion={false}
        onLoad={editor => {
          editor.renderer.$cursorLayer.element.style.opacity = 0;
        }}
      />
    );
  } else {
    return (
      <AceEditor
        mode={props.fileType}
        theme={theme}
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
