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

  const onSubmit = (snippet: Snippet) => {
    SnippetGateway()
      .create(snippet)
      .then(response => {
        Flash.success('Created snippet successfully');
        return;
      })
      .catch(err => {
        Flash.error(`Failed to create snippet. message = ${err}`);
      });
  };

  const { state: snippet, errors, disabled, handleChange, handleSubmit } = useForm<Snippet>(
    onSubmit,
    Snippet.create(currentUser),
    validator,
  );
  const setContent = (content: string) => {
    handleChange({ target: { name: 'content', value: content } });
  };

  return (
    <bs.Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <bs.Col md={{ span: 5, offset: 2 }}>
            <TextInput
              name={'title'}
              value={snippet.title || ''}
              placeholder={'Title'}
              errors={errors}
              onChange={handleChange}
            />
          </bs.Col>
          <bs.Col md={{ span: 3 }}>
            <SelectInput
              candidates={FileTypes}
              name={'fileType'}
              value={snippet.fileType || ''}
              placeholder={'File Type'}
              errors={errors}
              onChange={handleChange}
            />
          </bs.Col>
        </Row>
        <Row>
          <bs.Col md={{ span: 8, offset: 2 }}>
            <TextInput
              name={'description'}
              value={snippet.description || ''}
              placeholder={'Description'}
              errors={errors}
              onChange={handleChange}
            />
          </bs.Col>
        </Row>
        <Row>
          <bs.Col md={{ span: 8, offset: 2 }}>
            <Content {...{ snippet: snippet, onChange: (content: string) => setContent(content) }} />
          </bs.Col>
        </Row>
        <Row>
          <bs.Button type="submit" disabled={disabled}>
            保存
          </bs.Button>
        </Row>
      </form>
    </bs.Container>
  );
};

const Row = style(bs.Row)`
  padding-bottom: 0.5em;
`;

const Content = (props: { snippet: Snippet; onChange: (content: string) => void }) => {
  const { snippet, onChange } = props;
  const editorProps: EditorProps = {
    fileType: snippet.fileType,
    contents: snippet.content,
    readOnly: false,
    onChange: onChange,
  };
  return <Editor {...editorProps} />;
};

const Editor = style(EditorComponent)`
  border: solid 1px #b0b0b0;
`;

const SelectInput = (props: {
  candidates: string[];
  title?: string;
  name: string;
  value: string;
  placeholder: string;
  errors: Errors;
  onChange: (event: any) => void;
}) => {
  const { candidates, title, name, value, placeholder, errors, onChange } = props;
  return (
    <bs.InputGroup>
      {title != null && (
        <label htmlFor={name}>
          <bs.InputGroup.Prepend>
            <bs.InputGroup.Text>{title}</bs.InputGroup.Text>
          </bs.InputGroup.Prepend>
        </label>
      )}

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
