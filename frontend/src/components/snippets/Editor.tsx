import * as React from 'react';
import ReactAce from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import style from 'styled-components';

export type EditorProps = {
  fileType: string;
  contents: string;
  readOnly: boolean;
  onChange?: (content: string) => void;
  theme?: string;
};

// Label -> Mode name
export const AVAILABLE_FILE_TYPES = new Map([
  ['Plain Text', 'text'],
  ['Shell', 'sh'],
  ['Java', 'java'],
  ['Scala', 'scala'],
  ['JavaScript', 'javascript'],
  ['TypeScript', 'typescript'],
  ['Ruby', 'ruby'],
  ['Perl', 'perl'],
  ['Python', 'python'],
  ['PHP', 'php'],
  ['HTML', 'html'],
  ['Markdown', 'md'],
  ['CSS', 'css'],
  ['C', 'c_cpp'],
  ['C++', 'c_cpp'],
  ['C#', 'csharp'],
  ['SQL', 'sql'],
  ['YAML', 'yaml'],
]);

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
      console.log(`Loaded: ${libType}.${lib}`);
      cache.push(lib);
    } catch (e) {
      console.log(`error new ${libType}(${lib}): ${e}`);
    }
  }, [libType, lib]);
};

// This is only for 'Editor', not for 'Snippet'
export const EditorComponent = (props: EditorProps) => {
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

const AceEditor = style(ReactAce)`
  font-size: 16px;
`;
