import * as React from 'react';
import Snippet from 'models/Snippet';
import User from 'models/User';
import UserGateway from 'gateways/UserGateway';
import * as Flash from 'components/Flash';
import SnippetGateway from 'gateways/SnippetGateway';
import style from 'styled-components';

const SnippetComponent = (snippet: Snippet) => {
  const [user, setUser] = React.useState<User>(null);
  const [editor, setEditor] = React.useState<any>(null);
  React.useEffect(() => {
    UserGateway()
      .findById(snippet.userId)
      .then(user => {
        console.log(`UserGateway#findById: ${JSON.stringify(user)}`);
        setUser(user);
      })
      .catch(err => {
        Flash.error(`Failed to fetch user. message = ${err}`);
      });
  }, [snippet]);

  React.useEffect(() => {
    SnippetGateway()
      .editor(snippet.id)
      .then(editor => {
        setEditor(editor);
      })
      .catch(err => {
        Flash.error(`Failed to render snippet editor. message = ${err}`);
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
      {/*<div dangerouslySetInnerHTML={editor}/>*/}
    </div>
  );
};

const SnippetContainer = style.div`
`;

export default SnippetComponent;
