import * as React from 'react';
import { Router } from 'react-router-dom';
import Routes from './Routes';

const history = require("history").createBrowserHistory;

const App: React.FC = () => {
  return (
    <Router history={history()}>
      <Routes />
    </Router>
  );
};

export default App;
