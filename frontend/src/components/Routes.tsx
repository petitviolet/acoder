import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Login from './Login';
import * as Auth from './Auth';
import UserComponent from './User';
import { FlashComponent } from './Flash';
import MyPageComponent from './MyPage';
import { SnippetComponent, SnippetListComponent, SnippetEditorComponent } from './snippets';
import Header from './Header';
import SignUp from './SignUp';
import FeedComponent from './Feed';

const Routes: React.FC = () => {
  return (
    <Auth.Component>
      <div>
        <Header />
        <FlashComponent />
        <Switch>
          <Route exact path={'/'} component={FeedComponent} />
          <Route exact path={'/sign_up'} component={SignUp} />
          <Route path={'/login'} component={Login} />
          <Switch>
            <Route exact path={'/me'} component={MyPageComponent} />
            <Route exact path={'/users/:id'} component={UserComponent} />
            <Route exact path={'/snippets'} component={SnippetListComponent} />
            <Route exact key={'snippets/new'} path={'/snippets/new'} component={SnippetEditorComponent} />
            <Route
              exact
              path={'/snippets/:id'}
              render={(props: RouteComponentProps<any>) => {
                const p =
                  props.location.state && 'snippet' in props.location.state
                    ? { snippet: props.location.state.snippet }
                    : { snippetId: props.match.params.id };
                return <SnippetComponent {...p} />;
              }}
            />
            <Route
              exact
              key={'snippets/edit'}
              path={'/snippets/:id/edit'}
              render={(props: RouteComponentProps<any>) => {
                const p =
                  props.location.state && 'snippet' in props.location.state
                    ? { snippet: props.location.state.snippet }
                    : { snippetId: props.match.params.id };
                return <SnippetEditorComponent {...p} />;
              }}
            />
          </Switch>
        </Switch>
      </div>
    </Auth.Component>
  );
};

export default Routes;
