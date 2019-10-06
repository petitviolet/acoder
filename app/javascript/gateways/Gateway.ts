import Token from 'models/Token';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';

class Headers {
  static readonly applicationJson = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  static readonly textHtml = {
    'Content-Type': 'text/html',
    Accept: 'text/html',
  };
}
const shared = Axios.create({
  baseURL: `${process.env.API_HOST}/api`,
  timeout: 1000,
  headers: {
    get: Headers.applicationJson,
    post: Headers.applicationJson,
    put: Headers.applicationJson,
    delete: Headers.applicationJson,
  },
});

export default class Gateway {
  protected readonly axios: AxiosInstance = shared;
  private readonly token: Token;
  protected readonly headers = Headers;

  constructor(token: Token | null) {
    this.token = token;
  }

  protected authHeaders(token: Token = null) {
    return { 'X-Access-Token': token || this.token };
  }

  protected defaultOptions(token: Token = null) {
    const x = {
      headers: { ...this.authHeaders(token), ...Headers.applicationJson },
    };
    return x;
  }

  protected responseLogging(tag: string, res: AxiosResponse) {
    console.debug(`[${tag}]Response: status: ${res.status}, body: ${JSON.stringify(res.data)}`);
  }
}
