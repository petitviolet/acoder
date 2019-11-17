import * as React from 'react';
import Snippet from '../../models/Snippet';
import * as Flash from '../Flash';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import SnippetGateway from '../../gateways/SnippetGateway';
import { EditorComponent } from './SnippetEditor';

type SnippetProps = { snippetId: string } | { snippet: Snippet };

export const SnippetComponent = (props: SnippetProps) => {
  const [snippet, setSnippet] = React.useState<Snippet>(null);
  if ('snippetId' in props) {
    React.useMemo(() => {
      SnippetGateway()
        .findById(props.snippetId)
        .then(snippet => {
          console.log(`SnippetGateway#findById: ${JSON.stringify(snippet)}`);
          setSnippet(snippet);
        })
        .catch(err => {
          Flash.error(`Failed to fetch snippet(${props.snippetId}). message = ${err}`);
        });
    }, [props]);
  } else {
    setSnippet(props.snippet);
  }

  if (snippet == null) {
    return <>loading...</>;
  }

  const layout = { span: 8, offset: 2 };

  const Cell = ({children}) => {
    return <bs.Row>
      <bs.Col md={layout}>{children}</bs.Col>
    </bs.Row>;
  };
  return (
    <bs.Container>
      <Cell>
        <bs.Badge variant="info">{snippet.fileType || ''}</bs.Badge>
      </Cell>
      <Cell>{snippet.title}</Cell>
      <Cell>{snippet.description || ''}</Cell>
      <Cell>
        <Content {...snippet} />
      </Cell>
    </bs.Container>
  );
};

const Content = (props: Snippet) => {
  const editorProps = {
    fileType: props.fileType,
    contents: props.content,
    readOnly: true,
    onChange: null,
  };
  return (
    <>
      <ContentViewer {...editorProps} />
    </>
  );
};

const ContentViewer = style(EditorComponent)`
  border: solid 1px #b0b0b0;
`;
