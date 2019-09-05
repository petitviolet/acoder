import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "components/Login";
import * as Auth from "components/Auth";
import UserComponent from "components/User";
import {FlashComponent} from "components/Flash";
import MyPageComponent from "components/MyPage";

const Routes: React.FC = () => {
    return (
        <div>
            <div>Header</div>
            <FlashComponent/>
            <Switch>
                <Route exact path={"/"} render={() => ("Home!!!")}/>
                <Auth.Component>
                    <Route path={"/login"} component={Login}/>
                    <Switch>
                        <Route exact path={"/me"} component={MyPageComponent}/>
                        <Route path={"/users/:id"} component={(props) => UserComponent(props.currentUser)}/>
                    </Switch>
                </Auth.Component>
            </Switch>
        </div>
    )
};

export default Routes;