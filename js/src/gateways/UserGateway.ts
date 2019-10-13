import Token from '../models/Token';
import Gateway from './Gateway';
import User from 'models/User';

class UserGateway extends Gateway {
  login(email: string, password: string): Promise<Token> {
    return this.axios
      .post<{ token: Token }>('/login', {
        email: email,
        password: password,
      })
      .then(res => {
        this.responseLogging('login', res);
        return res.data.token;
      });
  }

  currentUser(token: Token) {
    return this.axios.get<User>('/whoami', this.defaultOptions(token)).then(res => {
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
