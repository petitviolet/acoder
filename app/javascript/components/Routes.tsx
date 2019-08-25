import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "components/Login";
import Auth from "components/Auth";
import UserComponent from "components/User";
import {FlashComponent} from "components/Flash";

const Routes: React.FC = () => {
    return (
        <div>
            <div>Header</div>
            <FlashComponent />
            <Switch>
                <Route exact path={"/"} render={() => ("Home!!!")}/>
                <Route path={"/login"} component={Login}/>
                <Auth>
                    <Switch>
                        <Route exact path={"/me"} component={(props) => UserComponent(props.currentUser)} />
                    </Switch>
                </Auth>
            </Switch>
        </div>
    );
};

export default Routes;