import { Token } from '../models/Authentication';
import Gateway from './Gateway';
import Snippet from '../models/Snippet';

class SnippetGateway extends Gateway {
  search(userId: string) {
    return this.axios
      .get<Snippet[]>('/snippets/search', {
        params: {
          userId: userId,
        },
      })
      .then(res => {
        this.responseLogging('currentSnippet', res);
        return res.data;
      });
  }

  findById(snippetId: string) {
    return this.axios.get<Snippet>(`/snippets/${snippetId}`).then(res => {
      this.responseLogging('user', res);
      return res.data;
    });
  }

  create(snippet: Snippet) {
    return this.axios
      .post<Snippet>(`/snippets`, {
        snippet: {
          title: snippet.title,
          description: snippet.description,
          fileType: snippet.fileType,
          content: snippet.content,
        },
      })
      .then(res => {
        this.responseLogging(`created snippet`, res);
        return res.data;
      });
  }
}
export default (token: Token | null = null) => new SnippetGateway(token);
