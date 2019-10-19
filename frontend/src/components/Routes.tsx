import * as React from 'react';
import {Switch, Route, RouteComponentProps} from 'react-router-dom';
import Login from './Login';
import * as Auth from './Auth';
import UserComponent from './User';
import { FlashComponent } from './Flash';
import MyPageComponent from './MyPage';
import SnippetComponent from './Snippet';
import SnippetListComponent from './SnippetList';
import Header from './Header';
import Snippet from "../models/Snippet";

const Routes: React.FC = () => {
  return (
    <Auth.Component>
      <div>
        <Header />
        <FlashComponent />
        <Switch>
          <Route exact path={'/'} render={() => 'Home!!!'} />
          <Route path={'/login'} component={Login} />
          <Switch>
            <Route exact path={'/me'} component={MyPageComponent} />
            <Route exact path={'/users/:id'} component={UserComponent} />
            <Route exact path={'/snippets'} component={SnippetListComponent} />
            <Route exact path={'/snippets/:id'}
                   render={(props: RouteComponentProps<any>) =>
                       <SnippetComponent {...{snippetId: props.match.params.id}} />} />
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
