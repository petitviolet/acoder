import * as React from 'react';
import Snippet from '../models/Snippet';
import User from '../models/User';
import UserGateway from '../gateways/UserGateway';
import * as Flash from './Flash';
import style from 'styled-components';
import * as bs from 'react-bootstrap';

const SnippetComponent = (snippet: Snippet) => {
  return (
    <bs.Container>
      <bs.Row>
        <bs.Col md={{ span: 6, offset: 3 }}>
            <SnippetContainer {...snippet} />
        </bs.Col>
      </bs.Row>
    </bs.Container>
  );
};

const SnippetContainer = (snippet: Snippet) => {
  const [user, setUser] = React.useState<User>(null);
  React.useEffect(() => {
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
    </div>
  );
};

const SnippetWrapper = style.div`
`;

export default SnippetComponent;
