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
    <SnippetList responsive striped bordered hover>
      <thead>
      <tr>
        <th>Title</th>
        <th>FileType</th>
        <th>Description</th>
        <th>Updated At</th>
      </tr>
      </thead>
      <tbody>
        {snippets
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          .map(snippet => (
          <SnippetCompactComponent key={snippet.id} {...snippet} />
        ))}
      </tbody>
    </SnippetList>
  );
};

const SnippetCompactComponent = (snippet: Snippet) => {
  return (
    <Container>
      <Title>
        <Link
          to={{
            pathname: `/snippets/${snippet.id}`,
            state: { snippet: snippet },
          }}
        >
          {snippet.title}
        </Link>
      </Title>
      <FileType>{snippet.fileType}</FileType>
      <Description>{snippet.description || '-' }</Description>
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
const Description = style.td`
  text-overflow: ellipsis;
`;
const FileType = style.td`
`;
const UpdatedAt = style.td`
`;
