import * as React from 'react';
import Snippet from '../models/Snippet';
import * as Flash from './Flash';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import SnippetGateway from '../gateways/SnippetGateway';
import { TrixEditor } from 'react-trix';

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
          <bs.Badge variant="info">{snippet.fileType || 'unknown'}</bs.Badge>
        </bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={layout}>{snippet.title}</bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={layout}>{snippet.description || '-'}</bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={layout}>
          <Editor {...{ snippet: snippet, edit: false }} />
        </bs.Col>
      </bs.Row>
    </bs.Container>
  );
};

const Container = style(bs.Container)`
`;

const Editor = (props: { snippet: Snippet; edit: boolean }) => {
  // https://github.com/dstpierre/react-trix
  const { snippet, edit } = props;
  const handleEditorReady = editor => {
    console.log('ready!');
    editor.insertString(snippet.content);
  };
  const handleChange = (html, text) => {
    console.log(`text: ${text}`);
  };
  const mergeTags = [];
  console.log(`editor: ${snippet.content}`);

  return (<>
      <TrixEditorComponent
          onChange={handleChange}
          onEditorReady={handleEditorReady}
          mergeTags={mergeTags} />
      <bs.ButtonToolbar>
          <bs.Button className="mr-1" variant={"info"} size={"sm"}>Save</bs.Button>
          <bs.Button variant={"outline-dark"} size={"sm"}>Cancel</bs.Button>
      </bs.ButtonToolbar>

      </>);
};

const TrixEditorComponent = style(TrixEditor)`
  border: solid 1px #b0b0b0;
`;

export default SnippetComponent;
