import * as React from 'react';
import Snippet from '../models/Snippet';
import * as Flash from './Flash';
import SnippetEditor from './SnippetEditor';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import SnippetGateway from '../gateways/SnippetGateway';

type SnippetProps = { snippetId: string } | { snippet: Snippet };

const SnippetComponent = (props: SnippetProps) => {
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
  return (
    <bs.Container>
      <bs.Row>
        <bs.Col md={layout}>
          <bs.Badge variant="info">{snippet.fileType || ''}</bs.Badge>
        </bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={layout}>{snippet.title}</bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={layout}>{snippet.description || ''}</bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={layout}>
          <Content {...snippet} />
        </bs.Col>
      </bs.Row>
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
      <ContentViewer {...editorProps}/>
    </>
  );
};

const ContentViewer = style(SnippetEditor)`
  border: solid 1px #b0b0b0;
`;

export default SnippetComponent;
