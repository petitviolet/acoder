import * as React from 'react';
import * as Auth from './Auth';
import * as Flash from '../components/Flash';
import Snippet from '../models/Snippet';
import SnippetGateway from '../gateways/SnippetGateway';
import * as bs from 'react-bootstrap';
import {SnippetListComponent} from './snippets';

const FeedComponent = () => {
  const {
    authState: { token },
  } = React.useContext(Auth.Context);
  const [page, setPage] = React.useState<{ limit: number, offset: number} >({ limit: 30, offset: 0 });
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);

  React.useEffect(() => {
    SnippetGateway(token)
      .feed(30, 0)
      .then(snippets => {
        console.log(`SnippetGateway#feed: ${JSON.stringify(snippets)}`);
        setLoading(false);
        setSnippets(snippets);
        // setPage({ limit: page.limit + 30, offset: page.offset })
      })
      .catch(err => {
        Flash.error(`Failed to fetch snippets. message = ${err}`);
      });
  }, [page]);

  return (
    <bs.Container>
      <bs.Row>
        <bs.Col md={{ span: 10, offset: 1 }}>
          {isLoading ? <>loading...</> : <SnippetListComponent {...{ snippets: snippets }} /> }
        </bs.Col>
      </bs.Row>
    </bs.Container>
  );
};

export default FeedComponent;
