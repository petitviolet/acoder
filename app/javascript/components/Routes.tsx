import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "components/Login";

const Routes: React.FC = () => {
    return (
        <div>
            <div>Header</div>
            <Switch>
                <Route exact path={"/"} render={() => ("Home!!!")}/>
                <Route exact path={"/hoge"} render={() => ("Hoge!!!")}/>
                <Route path={"/login"} component={Login}/>
            </Switch>
        </div>
    );
};

export default Routes;