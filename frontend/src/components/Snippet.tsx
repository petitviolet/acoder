import * as React from 'react';
import Snippet from '../models/Snippet';
import User from '../models/User';
import UserGateway from '../gateways/UserGateway';
import * as Flash from './Flash';
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

  return (
    <bs.Container>
      <bs.Row>
        <bs.Col md={{ span: 6, offset: 3 }}>
          <bs.Badge variant="info">{snippet.fileType || 'unknown'}</bs.Badge>
        </bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={{ span: 6, offset: 3 }}>{snippet.title}</bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={{ span: 6, offset: 3 }}>{snippet.description || '-'}</bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md={{ span: 6, offset: 3 }}>{snippet.content}</bs.Col>
      </bs.Row>
    </bs.Container>
  );
};

const Container = style(bs.Container)`
`;

export default SnippetComponent;
