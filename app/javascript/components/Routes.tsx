import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "components/Login";

const Routes: React.FC = () => {
    const onLogin = () => {
        console.log("nice!");
    };
    return (
        <div>
            <div>Header</div>
            <Switch>
                <Route exact path={"/"} render={() => ("Home!!!")}/>
                <Route path={"/login"} component={() => Login(onLogin)}/>
            </Switch>
        </div>
    );
};

export default Routes;