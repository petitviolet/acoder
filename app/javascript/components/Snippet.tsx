import * as React from "react";
import * as Auth from "./Auth";
import Snippet from "models/Snippet";
import User from "models/User";
import UserGateway from "gateways/UserGateway";
import * as Flash from "components/Flash";

const SnippetComponent = (snippet: Snippet) => {
  const [user, setUser] = React.useState<User>(null);
  React.useEffect(() => {
    UserGateway()
      .findById(snippet.userId)
      .then(user => {
        console.log(`UserGateway#findById: ${JSON.stringify(user)}`);
        setUser(user);
      })
      .catch(err => {
        Flash.error(`Failed to login. message = ${err}`);
      });
  });

  return (
    <div>
      <div>
        <div>createdBy:</div>
        <div>{JSON.stringify(user)}</div>
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

export default SnippetComponent;
