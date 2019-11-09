import { Token } from '../models/Authentication';
import Gateway from './Gateway';
import User from '../models/User';

class UserGateway extends Gateway {
  signUp(name: string, email: string, password: string): Promise<{ user: User }> {
    return this.axios
      .post<User>('/users/sign_up', {
        user: {
          name: name,
          email: email,
          password: password,
        },
      })
      .then(res => {
        this.responseLogging('sign_up', res);
        return { user: res.data };
      })
      .catch(error => {
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
      });
  }

  login(email: string, password: string): Promise<{ token: Token; user: User }> {
    return this.axios
      .post<User>('/users/sign_in', {
        email: email,
        password: password,
      })
      .then(res => {
        const token = res.headers['x-access-token'];
        this.responseLogging('login', res);
        return { token: new Token(token), user: res.data };
      });
  }

  currentUser() {
    return this.axios.get<User>('/whoami').then(res => {
      this.responseLogging('currentUser', res);
      return res.data;
    });
  }

  findById(userId: string) {
    return this.axios.get<User>(`/users/${userId}`).then(res => {
      this.responseLogging('user', res);
      return res.data;
    });
  }
}
export default (token: Token | null = null) => new UserGateway(token);
