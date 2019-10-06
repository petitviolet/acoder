import * as React from "react";
import * as Auth from "./Auth";
import UserComponent from "components/User";
import * as Flash from "components/Flash";
import Snippet from "models/Snippet";
import SnippetGateway from "gateways/SnippetGateway";
import SnippetComponent from "components/Snippet";

const MyPageComponent = () => {
  const {
    authState: { currentUser, token }
  } = React.useContext(Auth.Context);
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);
  React.useEffect(() => {
    SnippetGateway(token)
      .search(currentUser.id)
      .then(snippets => {
        console.log(`SnippetGateway#findById: ${JSON.stringify(snippets)}`);
        setSnippets(snippets);
      })
      .catch(err => {
        Flash.error(`Failed to login. message = ${err}`);
      });
  }, [currentUser]);

  return (
    <>
      <UserComponent {...currentUser} />
      {snippets.map(snippet => (
        <SnippetComponent key={snippet.id} {...snippet} />
      ))}
    </>
  );
};

export default MyPageComponent;
