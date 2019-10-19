import * as React from 'react';
import * as Flash from './Flash';
import { Redirect } from 'react-router-dom';
import User from '../models/User';
import {Token, SessionStore} from '../models/Authentication';

export type Props = {
  readonly currentUser: User;
  readonly token: Token;
};
const INITIAL_STATE: Props = {
  currentUser: null,
  token: null,
};

export enum ActionType {
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
  console.log(`Auth.reducer called. action: ${JSON.stringify(action)}, state: ${JSON.stringify(state)}`);
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
  default:
    return state;
  }
};

export const Context = React.createContext<{
  authState: Props;
  authDispatch: React.Dispatch<Action>;
  loggedIn: boolean;
}>({
  authState: INITIAL_STATE,
  authDispatch: null,
  loggedIn: false,
});

const NOT_LOGIN_REQUIRED_PATHS = ['/login'];

export const Component = ({ children }) => {
  const storedState = SessionStore.load();
  const initialState = storedState ? { currentUser: storedState.user, token: storedState.token } : INITIAL_STATE;
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(`Auth.Component state:${JSON.stringify(state)}`);

  const loggedIn: boolean = !!state.token && !!state.currentUser;
  if (loggedIn || NOT_LOGIN_REQUIRED_PATHS.includes(window.location.pathname)) {
    return (
      <Context.Provider value={{ authState: state, authDispatch: dispatch, loggedIn }}>
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
