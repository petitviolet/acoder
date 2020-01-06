import * as React from 'react';
import Snippet from '../../models/Snippet';
import style from 'styled-components';
import * as bs from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export const SnippetListComponent = (props: { snippets: Snippet[] }) => {
  const { snippets } = props;
  if (snippets.length == 0) {
    return <>No snippets</>;
  }
  console.dir(snippets);

  return (
    <SnippetList responsive bordered hover>
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
  const history = useHistory();
  const detailLink = `/snippets/${snippet.id}`;
  return (
    <Container
      onClick={() => {
        history.push(detailLink);
      }}
    >
      <Title>{snippet.title}</Title>
      <FileType>{snippet.fileType}</FileType>
      <Description>{snippet.description || '-'}</Description>
      <UpdatedAt>{snippet.updatedAt.toLocaleString('jp-JP')}</UpdatedAt>
    </Container>
  );
};

const SnippetList = style(bs.Table)`
  table-layout: fixed; 
`;

const Container = style.tr` 
  margin-bottom: 2px;
  padding: 1px;
  cursor: pointer;
`;
const Title = style.td`
  max-width: 12em;
  text-overflow: ellipsis;
  overflow: hidden; 
`;
const Description = style.td`
  max-width: 16em;
  text-overflow: ellipsis;
  overflow: hidden; 
`;
const FileType = style.td`
`;
const UpdatedAt = style.td`
`;
