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
  const [user, setUser] = React.useState<User>(null);
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

  React.useMemo(() => {
    if (!snippet) {
      return;
    }
    console.log(JSON.stringify(snippet));
    UserGateway()
      .findById(snippet.userId)
      .then(user => {
        console.log(`UserGateway#findById: ${JSON.stringify(user)}`);
        setUser(user);
      })
      .catch(err => {
        Flash.error(`Failed to fetch user(id: ${snippet.userId}). message = ${err}`);
      });
  }, [snippet]);

    if (snippet == null) {
        return <>loading...</>;
    }

  return (
    <div>
      <div>
        <div>createdBy:</div>
        <div>{user ? user.name : 'loading'}</div>
      </div>
      <div>
        <div>id:</div>
        <div>{snippet.id}</div>
      </div>
      <div>
        <div>title:</div>
        <div>{snippet.title}</div>
      </div>
      <div>
        <div>fileType:</div>
        <div>{snippet.fileType}</div>
      </div>
      <div>
        <div>description:</div>
        <div>{snippet.description}</div>
      </div>
      <div>
        <div>content:</div>
        <div>{snippet.content}</div>
      </div>
    </div>
  );
};

const Container = style.div`
`;

export default SnippetComponent;
