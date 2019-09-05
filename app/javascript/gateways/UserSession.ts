import * as React from 'react';
import * as Auth from "../components/Auth";

export default () => {
    const { state: { token, currentUser } } = React.useContext(Auth.Context);

    return { token, currentUser };
}