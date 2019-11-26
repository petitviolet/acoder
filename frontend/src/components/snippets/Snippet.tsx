import * as React from 'react';
import Snippet from '../../models/Snippet';
import * as Flash from '../Flash';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import SnippetGateway from '../../gateways/SnippetGateway';
import { EditorComponent, EditorProps } from './Editor';

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

  const Cell = (props: { children: any }) => {
    return (
      <bs.Row>
        <bs.Col md={layout}>{props.children}</bs.Col>
      </bs.Row>
    );
  };
  return (
    <bs.Container>
      <Row>
        <bs.Col md={{ span: 5, offset: 2 }}>{snippet.title}</bs.Col>
        <bs.Col md={{ span: 3 }}>
          <bs.Badge variant="info">{snippet.fileType || ''}</bs.Badge>
        </bs.Col>
      </Row>
      <Row>
        <bs.Col md={{ span: 8, offset: 2 }}>{snippet.description}</bs.Col>
      </Row>
      <Row>
        <bs.Col md={{ span: 8, offset: 2 }}>
          <Content {...snippet} />
        </bs.Col>
      </Row>
      <Row>
        <bs.Col md={{ span: 2, offset: 8 }}>
          <RightButton>Edit</RightButton>
        </bs.Col>
      </Row>
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

const Row = style(bs.Row)`
  padding-bottom: 0.5em;
`;

const RightButton = style(bs.Button)`
  float: right;
  padding-left: 1.5em !important;
  padding-right: 1.5em !important;
`;
