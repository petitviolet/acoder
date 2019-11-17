import * as React from 'react';
import * as Auth from './Auth';
import UserComponent from '../components/User';
import * as Flash from '../components/Flash';
import Snippet from '../models/Snippet';
import SnippetGateway from '../gateways/SnippetGateway';
import * as bs from 'react-bootstrap';
import { SnippetListComponent } from './snippets';

const MyPageComponent = () => {
  const {
    authState: { currentUser, token },
  } = React.useContext(Auth.Context);
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);
  React.useMemo(() => {
    SnippetGateway(token)
      .search(currentUser.id)
      .then(snippets => {
        console.log(`SnippetGateway#search: ${JSON.stringify(snippets)}`);
        setSnippets(snippets);
      })
      .catch(err => {
        Flash.error(`Failed to fetch snippets. message = ${err}`);
      });
  }, [currentUser]);

  console.log('MyPage1');
  console.dir(snippets);
  console.log('MyPage2');

  return (
    <bs.Container>
      <bs.Row>
        <bs.Col md={{ span: 8, offset: 2 }}>
          <UserComponent {...currentUser} />
          <SnippetListComponent {...{ snippets: snippets }} />
        </bs.Col>
      </bs.Row>
    </bs.Container>
  );
};

export default MyPageComponent;
