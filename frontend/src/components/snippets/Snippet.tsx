import * as React from 'react';
import Snippet from '../../models/Snippet';
import * as Flash from '../Flash';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import SnippetGateway from '../../gateways/SnippetGateway';
import { EditorComponent } from './Editor';
import { useHistory } from 'react-router-dom';
import * as Auth from "../Auth";

type SnippetProps = { snippetId: string } | { snippet: Snippet };

export const SnippetComponent = (props: SnippetProps) => {
  const {
    authState: { currentUser },
  } = React.useContext(Auth.Context);
  const history = useHistory();
  const [snippet, setSnippet] = React.useState<Snippet>(null);

  React.useMemo(() => {
    if (snippet != null) {
      return;
    } else if ('snippet' in props) {
      setSnippet(props.snippet);
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
  }, [props]);

  if (snippet == null) {
    return <>loading...</>;
  }

  const canEdit: boolean = snippet && snippet.userId == currentUser.id;

  const Cell = (props: { children; layout }) => {
    return (
      <Row>
        <bs.Col md={props.layout}>{props.children}</bs.Col>
      </Row>
    );
  };

  return (
    <bs.Container>
      <Cell layout={{ span: 10, offset: 1 }}>
        <bs.Badge variant="info">{snippet.fileType || ''}</bs.Badge>
      </Cell>
      <Cell layout={{ span: 10, offset: 1 }}>
        <Title>{snippet.title}</Title>
      </Cell>
      <Cell layout={{ span: 10, offset: 1 }}>{snippet.description || '---' }</Cell>
      <Cell layout={{ span: 10, offset: 1 }}>
        <Content {...snippet} />
      </Cell>
      <Cell layout={{ span: 1, offset: 10 }}>
        {canEdit ? <RightButton
            onClick={() => {
              history.push(`/snippets/${snippet.id}/edit`);
            }}
          >Edit</RightButton>
          : <></>
        }
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
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Row = style(bs.Row)`
  padding-bottom: 0.5em;
  vertical-align: middle;
`;

const Title = style.div`
  font-size: 32px;
`;

const RightButton = style(bs.Button)`
  float: right;
  padding-left: 1.5em !important;
  padding-right: 1.5em !important;
`;
