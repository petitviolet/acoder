import { Token } from '../models/Authentication';
import Gateway from './Gateway';
import User from '../models/User';

class UserGateway extends Gateway {
  login(email: string, password: string): Promise<{token: Token, user: User}> {
    return this.axios
      .post<{token: string, user: User}>('/login', {
        email: email,
        password: password,
      })
      .then(res => {
        this.responseLogging('login', res);
        return { token: new Token(res.data.token), user: res.data.user };
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
