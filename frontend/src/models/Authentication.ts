import User from "./User";

export class SessionStore {
  static readonly KEY = 'Session';

  static save(user: User, token: Token): void {
    if (!!user && !!token) {
      localStorage.setItem(SessionStore.KEY, JSON.stringify({user: user, token: token}));
    }
  }

  static load(): { user: User; token: Token } | null {
    const values = localStorage.getItem(SessionStore.KEY);
    if (values) {
      return JSON.parse(values);
    }
    return null;
  }

  static clear(): void {
    localStorage.removeItem(SessionStore.KEY);
  }
}

export class Token {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}
