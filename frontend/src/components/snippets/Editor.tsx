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

const loadLib = (libType: string, lib: string, cache: string[]) => {
  React.useMemo(() => {
    if (!lib || cache.includes(lib)) {
      return;
    }
    try {
      // somehow, compile error
      // require(`ace-builds/src-noconflict/${libType}-${lib}`);
      switch (libType) {
        case 'mode':
          require(`ace-builds/src-noconflict/mode-${lib}`);
          break;
        case 'theme':
          require(`ace-builds/src-noconflict/theme-${lib}`);
          break;
      }
      cache.push(lib);
    } catch (e) {
      console.log(`error new ${libType}(${lib}): ${e}`);
    }
  }, [libType, lib]);
};

// This is only for 'Editor', not for 'Snippet'
export const EditorComponent = (props: EditorProps) => {
  console.log(`Editor props: ${JSON.stringify(props)}`);
  const theme = props.theme || DEFAULT_THEME;

  // load theme & mode
  loadLib('theme', theme, THEMES);
  loadLib('mode', props.fileType, FILE_TYPES);

  const onChange: (string) => void = props.onChange ? props.onChange : () => {};
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
