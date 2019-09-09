import Token from "models/Token";
import Axios, { AxiosInstance, AxiosResponse } from "axios";

const applicationJson = {
  "Content-Type": "application/json",
  Accept: "application/json"
};
const shared = Axios.create({
  baseURL: `${process.env.API_HOST}/api`,
  timeout: 1000,
  headers: {
    get: applicationJson,
    post: applicationJson,
    put: applicationJson,
    delete: applicationJson
  }
});

export default class Gateway {
  protected readonly axios: AxiosInstance = shared;
  private token: Token;

  constructor(token: Token | null) {
    this.token = token;
  }

  protected authHeaders(token: Token = null) {
    return { "X-Access-Token": token };
  }

  protected defaultOptions(token: Token = null) {
    const x = {
      headers: { ...this.authHeaders(token), ...applicationJson }
    };
    return x;
  }

  protected responseLogging(tag: string, res: AxiosResponse) {
    console.debug(
      `[${tag}]Response: status: ${res.status}, body: ${JSON.stringify(
        res.data
      )}`
    );
  }
}
