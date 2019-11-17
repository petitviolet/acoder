import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Login from './Login';
import * as Auth from './Auth';
import UserComponent from './User';
import { FlashComponent } from './Flash';
import MyPageComponent from './MyPage';
import { SnippetComponent, SnippetListComponent } from "./snippets";
import Header from './Header';
import SignUp from './SignUp';

const Routes: React.FC = () => {
  return (
    <Auth.Component>
      <div>
        <Header />
        <FlashComponent />
        <Switch>
          <Route exact path={'/'} render={() => 'Home!!!'} />
          <Route exact path={'/sign_up'} component={SignUp} />
          <Route path={'/login'} component={Login} />
          <Switch>
            <Route exact path={'/me'} component={MyPageComponent} />
            <Route exact path={'/users/:id'} component={UserComponent} />
            <Route exact path={'/snippets'} component={SnippetListComponent} />
            <Route
              exact
              path={'/snippets/:id'}
              render={(props: RouteComponentProps<any>) => (
                <SnippetComponent {...{ snippetId: props.match.params.id }} />
              )}
            />
          </Switch>
        </Switch>
      </div>
    </Auth.Component>
  );
};

export default Routes;
