import * as React from 'react';
import Snippet from '../../models/Snippet';
import * as Flash from '../Flash';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import SnippetGateway from '../../gateways/SnippetGateway';
import { EditorComponent, EditorProps } from './SnippetEditor';
import * as Auth from '../Auth';
import { Errors, useForm, Validator } from '../useForm';

const validator: Validator<Snippet> = new (class implements Validator<Snippet> {
  nonEmptyValidator(label: string, text: string): string | null {
    if (text.length == 0) {
      return `${label} is empty.`;
    }
  }
  runAll(state: Snippet): Map<string, string> {
    return new Map([
      ['title', this.nonEmptyValidator('Title', state.title)],
      ['fileType', this.nonEmptyValidator('FileType', state.fileType)],
      ['content', this.nonEmptyValidator('Content', state.content)],
    ]);
  }
})();

const FileTypes: string[] = ['python', 'ruby', 'java', 'scala', 'shell', 'bash', 'perl', 'js', 'ts'];

export const NewSnippetComponent = () => {
  const {
    authState: { currentUser },
  } = React.useContext(Auth.Context);
  const onSubmit = () => {};
  const { state: snippet, errors, disabled, handleChange, handleSubmit } = useForm<Snippet>(
    onSubmit,
    Snippet.create(currentUser),
    validator,
  );
  const [content, setContent] = React.useState<string>(snippet.content);

  const Cell = (props: { children: any }) => {
    const layout = { span: 8, offset: 2 };
    return (
      <bs.Row>
        <bs.Col md={layout}>{props.children}</bs.Col>
      </bs.Row>
    );
  };
  return (
    <bs.Container>
      <Cell>
        <TextInput
          name={'title'}
          value={snippet.title || ''}
          placeholder={'Title'}
          errors={errors}
          onChange={handleChange}
        />
      </Cell>
      <Cell>
        <SelectInput
          candidates={FileTypes}
          title={'File Type'}
          name={'fileType'}
          value={snippet.fileType || ''}
          placeholder={'File Type'}
          errors={errors}
          onChange={handleChange}
        />
      </Cell>
      <Cell>
        <TextInput
          name={'description'}
          value={snippet.description || ''}
          placeholder={'Description'}
          errors={errors}
          onChange={handleChange}
        />
      </Cell>
      <Cell>
        <Content
          {...{ fileType: snippet.fileType, content: content, onChange: (content: string) => setContent(content) }}
        />
      </Cell>
    </bs.Container>
  );
};

const Content = (props: { fileType: string; content: string; onChange: (content: string) => void }) => {
  const { fileType, content, onChange } = props;
  const editorProps: EditorProps = {
    fileType: fileType,
    contents: content,
    readOnly: false,
    onChange: onChange,
  };
  return (
    <>
      <Editor {...editorProps} />
    </>
  );
};

const Editor = style(EditorComponent)`
  border: solid 1px #b0b0b0;
`;

const SelectInput = (props: {
  candidates: string[];
  title: string;
  name: string;
  value: string;
  placeholder: string;
  errors: Errors;
  onChange: (event: any) => void;
}) => {
  const { candidates, title, name, value, placeholder, errors, onChange } = props;
  return (
    <bs.InputGroup>
      <label htmlFor={name}>
        <bs.InputGroup.Prepend>
          <bs.InputGroup.Text>{title}</bs.InputGroup.Text>
        </bs.InputGroup.Prepend>
      </label>

      <bs.Form.Control
        id={name}
        placeholder={placeholder}
        name={name}
        aria-label={name}
        aria-describedby={name}
        onChange={onChange}
        value={value}
        as="select"
      >
        {candidates.map((fileType: string, i: number) => (
          <option key={i}>{fileType}</option>
        ))}
      </bs.Form.Control>
      <div>{errors.get(name)}</div>
    </bs.InputGroup>
  );
};

const TextInput = (props: {
  name: string;
  value: string;
  placeholder: string;
  errors: Errors;
  onChange: (event: any) => void;
}) => {
  const { name, value, placeholder, errors, onChange } = props;
  return (
    <bs.InputGroup>
      <bs.FormControl
        id={name}
        placeholder={placeholder}
        name={name}
        aria-label={name}
        aria-describedby={name}
        onChange={onChange}
        value={value}
      />
      <div>{errors.get(name)}</div>
    </bs.InputGroup>
  );
};
