import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "components/Login";
import * as Auth from "components/Auth";
import UserComponent from "components/User";
import { FlashComponent } from "components/Flash";
import MyPageComponent from "components/MyPage";
import SnippetComponent from "components/Snippet";
import SnippetListComponent from "components/SnippetList";

const Routes: React.FC = () => {
  return (
    <Auth.Component>
      <div>
        <div>Header</div>
        <FlashComponent />
        <Switch>
          <Route exact path={"/"} render={() => "Home!!!"} />
          <Route path={"/login"} component={Login} />
          <Switch>
            <Route exact path={"/me"} component={MyPageComponent} />
            <Route exact path={"/users/:id"} component={UserComponent} />
            <Route exact path={"/snippets"} component={SnippetListComponent} />
            <Route exact path={"/snippets/:id"} component={SnippetComponent} />
            {/*<Route*/}
            {/*  path={"/users/:id"}*/}
            {/*  component={(props: {currentUser: Auth.Context}) => UserComponent(props.currentUser)}*/}
            {/*/>*/}
          </Switch>
        </Switch>
      </div>
    </Auth.Component>
  );
};

export default Routes;
