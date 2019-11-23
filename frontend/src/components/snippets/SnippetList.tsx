import * as React from 'react';
import Snippet from '../../models/Snippet';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const SnippetListComponent = (props: { snippets: Snippet[] }) => {
  const { snippets } = props;
  if (snippets.length == 0) {
    return <>No snippets</>;
  }
  console.dir(snippets);

  return (
    <SnippetList>
      <tbody>
        {snippets.map(snippet => (
          <SnippetCompactComponent key={snippet.id} {...snippet} />
        ))}
      </tbody>
    </SnippetList>
  );
};

const SnippetCompactComponent = (snippet: Snippet) => {
  return (
    <Container striped bordered hove>
      <Title>
        <Link to={`/snippets/${snippet.id}`}>{snippet.title}</Link>
      </Title>
      <FileType>{snippet.fileType}</FileType>
      <UpdatedAt>{snippet.updatedAt.toLocaleString('jp-JP')}</UpdatedAt>
    </Container>
  );
};

const SnippetList = style(bs.Table)`
`;

const Container = style.tr` 
    margin-bottom: 2px;
    padding: 1px;
    cursor: pointer;
`;
const Title = style.td`
`;
const FileType = style.td`
`;
const UpdatedAt = style.td`
    background-color: #848;
`;
