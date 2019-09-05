import * as React from 'react'
import * as Flash from "./Flash";
import {Redirect} from 'react-router-dom'
import User from "models/User";
import Token from "../models/Token";

export type Props = {
    readonly currentUser: User,
    readonly token: Token,
}
const initialState: Props = {
    currentUser: null,
    token: null,
};

export enum ActionType {
    SetToken = 'A',
    SetCurrentUser = 'B',
}

type Action = SetTokenAction | SetUserAction;
type SetTokenAction = {
    readonly type: ActionType.SetToken,
    readonly token: Token
}
type SetUserAction = {
    readonly type: ActionType.SetCurrentUser,
    readonly user: User
}

const reducer = (state: Props, action: Action) => {
    console.log(`Auth.reducer called. action: ${JSON.stringify(action)}, state: ${JSON.stringify(state)}`);
    switch (action.type) {
        case ActionType.SetToken:
            return {
                ...state,
                token: action.token,
            };
        case ActionType.SetCurrentUser:
            return {
                ...state,
                currentUser: action.user,
            };
        default:
            return state;
    }
};

export const Context = React.createContext<{ authState: Props, authDispatch: React.Dispatch<Action>, loggedIn: boolean }>({
    authState: initialState,
    authDispatch: null,
    loggedIn: false,
});

const NOT_LOGIN_REQUIRED_PATHS = [
    '/login',
];

export const Component = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    console.log(`Auth.Component state:${JSON.stringify(state)}`);

    const loggedIn: boolean = !!state.token && !!state.currentUser;
    if (loggedIn || NOT_LOGIN_REQUIRED_PATHS.includes(window.location.pathname)) {
        return (
            <Context.Provider value={{authState: state, authDispatch: dispatch, loggedIn}}>
                {/*<Context.Consumer>*/}
                {children}
                {/*</Context.Consumer>*/}
            </Context.Provider>
        );
    } else {
        Flash.error(`You must login.${window.location.pathname}`);
        return <Redirect to={'/login'}/>
    }
};

