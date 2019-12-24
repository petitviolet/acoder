import { SessionStore, Token } from '../models/Authentication';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import humps from 'humps';

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

const shared = ((): AxiosInstance => {
  const merge = <T>(arr: T | T[], t: T): T[] => {
    if (Array.isArray(arr)) {
      arr.push(t);
      return arr;
    } else {
      return [arr, t];
    }
  };

  const instance = Axios.create({
    baseURL: `${config.API_HOST}/api`,
    timeout: 5000,
    headers: {
      get: Headers.applicationJson,
      post: Headers.applicationJson,
      patch: Headers.applicationJson,
      put: Headers.applicationJson,
      delete: Headers.applicationJson,
    },
    transformResponse: merge(Axios.defaults.transformResponse, data => humps.camelizeKeys(data)),
    transformRequest: merge(Axios.defaults.transformRequest, data => humps.decamelizeKeys(data)),
  });
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const session = SessionStore.load();
    if (session) {
      config.headers.common = Object.assign({}, config.headers.common, { 'X-Access-Token': session.token.value });
    }
    return config;
  });
  return instance;
})();

export default class Gateway {
  protected readonly axios: AxiosInstance = shared;
  private readonly token: Token;
  protected readonly headers = Headers;

  constructor(token: Token | null) {
    this.token = token;
  }

  protected responseLogging(tag: string, res: AxiosResponse): void {
    console.info(`[${tag}]Response: status: ${res.status}, body: ${JSON.stringify(res.data)}`);
  }
}
