import * as React from 'react';
import * as Flash from './Flash';
import { Redirect } from 'react-router-dom';
import User from '../models/User';
import { Token, SessionStore } from '../models/Authentication';

export type Props = {
  readonly currentUser: User;
  readonly token: Token;
};
const INITIAL_STATE: Props = {
  currentUser: null,
  token: null,
};
const initialState = () => {
  const storedState = SessionStore.load();
  if (storedState) {
    return { currentUser: storedState.user, token: storedState.token };
  } else {
    return INITIAL_STATE;
  }
};

enum ActionType {
  Login = 'A',
  Logout = 'B',
}
type Action = LoginAction | LogoutAction;
type LoginAction = {
  readonly type: ActionType.Login;
  readonly token: Token;
  readonly user: User;
};
type LogoutAction = {
  readonly type: ActionType.Logout;
};

const reducer = (state: Props, action: Action) => {
  switch (action.type) {
  case ActionType.Login:
    const newState = {
      ...state,
      token: action.token,
      currentUser: action.user,
    };
    SessionStore.save(newState.currentUser, newState.token);
    return newState;
  case ActionType.Logout:
    SessionStore.clear();
    return INITIAL_STATE;
  }
};
type AuthActions = {
  login: (token: Token, user: User) => void;
  logout: () => void;
};
const AuthActions = (dispatch: (Action) => void) => {
  return {
    login: (token: Token, user: User) => {
      dispatch({ type: ActionType.Login, token, user });
    },
    logout: () => {
      dispatch({ type: ActionType.Logout });
    },
  };
};

type AuthContextProps = {
  authState: Props;
  authActions: AuthActions;
  loggedIn: boolean;
};
export const Context = React.createContext<AuthContextProps>({
  authState: INITIAL_STATE,
  authActions: null,
  loggedIn: false,
});

const NOT_LOGIN_REQUIRED_PATHS = ['/login', '/sign_up'];

export const Component = ({ children }) => {
  const [authState, dispatch] = React.useReducer(reducer, initialState());
  const loggedIn: boolean = !!authState.token && !!authState.currentUser;

  if (loggedIn || NOT_LOGIN_REQUIRED_PATHS.includes(window.location.pathname)) {
    const authActions = AuthActions(dispatch);
    return (
      <Context.Provider value={{ authState, authActions, loggedIn }}>
        {/*<Context.Consumer>*/}
        {children}
        {/*</Context.Consumer>*/}
      </Context.Provider>
    );
  } else {
    Flash.error(`You must login.${window.location.pathname}`);
    return <Redirect to={'/login'} />;
  }
};
