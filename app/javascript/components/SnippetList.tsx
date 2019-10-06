import * as React from "react";
import Snippet from "models/Snippet";
import * as Flash from "components/Flash";
import SnippetGateway from "gateways/SnippetGateway";
import SnippetComponent from "components/Snippet";

export type Query = { userId: string };

const SnippetListComponent = (query: Query) => {
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);

  React.useEffect(() => {
    SnippetGateway()
      .search(query.userId)
      .then(snippets => {
        console.log(`SnippetGateway#search: ${JSON.stringify(snippets)}`);
        setSnippets(snippets);
      })
      .catch(err => {
        Flash.error(`Failed to fetch snippets. message = ${err}`);
      });
  }, [query]);

  return (
    <>
      {snippets.map(snippet => (
        <SnippetComponent key={snippet.id} {...snippet} />
      ))}
    </>
  );
};

export default SnippetListComponent;
