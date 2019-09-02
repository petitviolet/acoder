import * as React from 'react'
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
}

export enum ActionType {
    SetToken,
    SetCurrentUser,
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

export const reducer = (state: Props, action: Action) => {
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

export const Context = React.createContext<{ state: Props, dispatch: React.Dispatch<Action> }>(null);

export const Component = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <Context.Provider value={{...value}}>
            <Context.Consumer>
                {children}
            </Context.Consumer>
        </Context.Provider>
    );
};

// const Auth = (props) => {
//     const onLogin = (token) => {
//     };
//     const context = React.useContext(Context);
//     // return (props.token ? props.children : <Redirect to={'/login'}/>)
// };
//
