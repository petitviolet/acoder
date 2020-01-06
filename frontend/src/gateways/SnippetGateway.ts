import { Token } from '../models/Authentication';
import Gateway from './Gateway';
import Snippet from '../models/Snippet';

class SnippetGateway extends Gateway {
  async feed(limit: number, offset: number) {
    const res = await this.axios.get<Snippet[]>(`/snippets?page[limit]=${limit}&page[offset]=${offset}`);
    this.responseLogging('feed', res);
    return res.data.map(Snippet.fromJson);
  }

  async search(userId: string) {
    const res = await this.axios.get<Snippet[]>('/snippets/search', {
      params: {
        userId: userId,
      },
    });
    this.responseLogging('currentSnippet', res);
    return res.data.map(Snippet.fromJson);
  }

  async findById(snippetId: string) {
    const res = await this.axios.get<Snippet>(`/snippets/${snippetId}`);
    this.responseLogging('user', res);
    return Snippet.fromJson(res.data);
  }

  async create(snippet: Snippet) {
    const res = await this.axios.post<Snippet>(`/snippets`, {
      snippet: {
        title: snippet.title,
        description: snippet.description,
        fileType: snippet.fileType,
        content: snippet.content,
      },
    });
    this.responseLogging(`created snippet`, res);
    return res.data;
  }

  async update(snippet: Snippet) {
    const res = await this.axios.patch<Snippet>(`/snippets/${snippet.id}`, {
      snippet: {
        title: snippet.title,
        description: snippet.description,
        fileType: snippet.fileType,
        content: snippet.content,
      },
    });
    this.responseLogging(`updated snippet`, res);
    return res.data;
  }
}
export default (token: Token | null = null) => new SnippetGateway(token);
