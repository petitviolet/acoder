import * as React from 'react'
import {Redirect} from 'react-router-dom'
import User from "models/User";

type AuthProps = {
    readonly currentUser: User,
}
const AuthContext: React.Context<AuthProps> = React.createContext<AuthProps>(null);

// const Provider = ({children}) => {
//     const [user, setUser] = React.useState<AuthProps>(null);
//     const value = { user, setUser };
//     return (
//         <AuthContext.Provider>
//             {children}
//         </AuthContext.Provider>
//     );
// };

const Auth = (props) => {
    // const {currentUser} = React.useContext(AuthContext);
    return (props.currentUser.isLoggedIn ? props.children : <Redirect to={'/login'}/>)
};

export default Auth