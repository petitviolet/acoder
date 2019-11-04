import { Token } from '../models/Authentication';
import Gateway from './Gateway';
import User from '../models/User';

class UserGateway extends Gateway {
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
