import * as React from 'react';
import Snippet from '../../models/Snippet';
import * as Flash from '../Flash';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import SnippetGateway from '../../gateways/SnippetGateway';
import { AVAILABLE_FILE_TYPES, EditorComponent, EditorProps } from './Editor';
import * as Auth from '../Auth';
import { Errors, useForm, Validator } from '../useForm';
import { Redirect, useHistory } from 'react-router';
import User from '../../models/User';

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

type SnippetProps = { snippetId: string } | { snippet: Snippet } | null;

export const SnippetEditorComponent = (props: SnippetProps) => {
  const {
    authState: { currentUser },
  } = React.useContext(Auth.Context);

  const [snippet, setSnippet] = React.useState(() => {
    if ('snippetId' in props) {
      return null;
    } else if ('snippet' in props) {
      return props.snippet;
    } else {
      return Snippet.create(currentUser);
    }
  });

  React.useEffect(() => {
    if (!('snippetId' in props)) {
      return;
    }

    SnippetGateway()
      .findById(props.snippetId)
      .then(snippet => {
        console.log(`SnippetGateway#findById: ${JSON.stringify(snippet)}`);
        setSnippet(snippet);
      })
      .catch(err => {
        Flash.error(`Failed to fetch snippet(${props.snippetId}). message = ${err}`);
      });
  }, []);

  if (snippet == null) {
    return <>loading...</>;
  } else {
    return <SnippetEditorComponentInner currentUser={currentUser} snippet={snippet} />;
  }
};

const SnippetEditorComponentInner = ({ currentUser, snippet }: { currentUser: User; snippet: Snippet }) => {
  const history = useHistory();
  React.useEffect(() => {
    if (snippet.userId != currentUser.id) {
      Flash.error('You cannot edit this snippet');
      history.push(`/snippets/${snippet.id}`);
    }
  }, [currentUser.id, snippet.userId]);

  const onSubmit = (snippet: Snippet) => {
    if (snippet.id) {
      SnippetGateway()
        .update(snippet)
        .then((response: Snippet) => {
          Flash.success('Updated snippet successfully');
          return history.push(`/snippets/${response.id}`);
        })
        .catch(err => {
          Flash.error(`Failed to update snippet. message = ${err}`);
        });
    } else {
      SnippetGateway()
        .create(snippet)
        .then((response: Snippet) => {
          Flash.success('Created snippet successfully');
          return history.push(`/snippets/${response.id}`);
        })
        .catch(err => {
          Flash.error(`Failed to create snippet. message = ${err}`);
        });
    }
  };

  const { state, errors, disabled, handleChange, handleSubmit } = useForm<Snippet>(onSubmit, snippet, validator);
  const setContent = (content: string) => {
    handleChange({ target: { name: 'content', value: content } });
  };

  return (
    <bs.Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <bs.Col md={{ span: 7, offset: 1 }}>
            <TextInput
              name={'title'}
              value={state.title || ''}
              placeholder={'Title'}
              errors={errors}
              onChange={handleChange}
            />
          </bs.Col>
          <bs.Col md={{ span: 3 }}>
            <SelectInput
              candidates={AVAILABLE_FILE_TYPES}
              name={'fileType'}
              value={state.fileType || ''}
              placeholder={'File Type'}
              errors={errors}
              onChange={handleChange}
            />
          </bs.Col>
        </Row>
        <Row>
          <bs.Col md={{ span: 10, offset: 1 }}>
            <TextInput
              name={'description'}
              value={state.description || ''}
              placeholder={'Description'}
              errors={errors}
              onChange={handleChange}
            />
          </bs.Col>
        </Row>
        <Row>
          <bs.Col md={{ span: 10, offset: 1 }}>
            <Content {...{ snippet: state, onChange: (content: string) => setContent(content) }} />
          </bs.Col>
        </Row>
        <Row>
          <bs.Col md={{ span: 1, offset: 10 }}>
            <RightButton type="submit" disabled={disabled}>
              Save
            </RightButton>
          </bs.Col>
        </Row>
      </form>
    </bs.Container>
  );
};

const Row = style(bs.Row)`
  padding-bottom: 0.5em;
`;

const RightButton = style(bs.Button)`
  float: right;
  padding-left: 1.5em !important;
  padding-right: 1.5em !important;
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
  candidates: Map<string, string>;
  title?: string;
  name: string;
  value: string;
  placeholder: string;
  errors: Errors;
  onChange: (event: any) => void;
}) => {
  const { candidates, title, name, value, placeholder, errors, onChange } = props;

  // memoize building options
  const options = React.useMemo(() => {
    return [
      <option key={0} value={''}>
        Choose...
      </option>,
    ].concat(
      Array.from(candidates.keys())
        .sort()
        .map((label: string, i: number) => (
          <option key={i + 1} value={candidates.get(label)}>
            {label}
          </option>
        )),
    );
  }, [candidates]);

  return (
    <>
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
        {options}
      </bs.Form.Control>
      <div>{errors.get(name)}</div>
    </>
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
    <>
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
    </>
  );
};
