import Token from "../models/Token";
import Gateway from "./Gateway";
import Snippet from "models/Snippet";

class SnippetGateway extends Gateway {
  search(userId: string) {
    this.defaultOptions();
    return this.axios
      .get<Snippet[]>("/snippets/search", {
        params: {
          userId: userId
        },
        headers: this.authHeaders()
      })
      .then(res => {
        this.responseLogging("currentSnippet", res);
        return res.data;
      });
  }

  findById(snippetId: string) {
    return this.axios.get<Snippet>(`/snippets/${snippetId}`).then(res => {
      this.responseLogging("user", res);
      return res.data;
    });
  }

  editor(snippetId: string) {
    return this.axios
      .get<any>(`/snippets/${snippetId}/editor`, {
        headers: Object.assign({}, this.authHeaders(), this.headers.textHtml)
      })
      .then(res => {
        this.responseLogging("snippet editor", res);
        return res.data;
      });
  }
}
export default (token: Token | null = null) => new SnippetGateway(token);
