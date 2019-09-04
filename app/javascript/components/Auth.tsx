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

export const Context = React.createContext<{ state: Props, dispatch: React.Dispatch<Action> }>({
    state: initialState,
    dispatch: null,
});

export const Component = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    console.log(`Auth.Component state:${JSON.stringify(state)}`);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {/*<Context.Consumer>*/}
                {children}
            {/*</Context.Consumer>*/}
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
