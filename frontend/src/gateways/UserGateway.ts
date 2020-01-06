import { Token } from '../models/Authentication';
import Gateway from './Gateway';
import User from '../models/User';

class UserGateway extends Gateway {
  async signUp(name: string, email: string, password: string): Promise<{ user: User }> {
    try {
      const res = await this.axios.post<User>('/users/sign_up', {
        user: {
          name: name,
          email: email,
          password: password,
        },
      });
      this.responseLogging('sign_up', res);
      return { user: res.data };
    } catch (error) {
      const errorMsg = (() => {
        if (!error.response) {
          return error;
        }
        if (error.response.status == 422) {
          return error.response.data.error; // error message
        } else if (error.response.status >= 500) {
          console.log(`Server Error: ${JSON.stringify(error.response.data)}`);
          return 'Server Error';
        } else {
          return JSON.stringify(error.response.data);
        }
      })();

      return Promise.reject(errorMsg);
    }
  }

  async login(email: string, password: string): Promise<{ token: Token; user: User }> {
    const res = await this.axios.post<User>('/users/sign_in', {
      email: email,
      password: password,
    });
    const token = res.headers['x-access-token'];
    this.responseLogging('login', res);
    return { token: new Token(token), user: res.data };
  }

  async currentUser() {
    const res = await this.axios.get<User>('/whoami');
    this.responseLogging('currentUser', res);
    return res.data;
  }

  async findById(userId: string) {
    const res = await this.axios.get<User>(`/users/${userId}`);
    this.responseLogging('user', res);
    return res.data;
  }
}
export default (token: Token | null = null) => new UserGateway(token);
