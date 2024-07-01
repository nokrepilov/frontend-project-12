import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Chat from './Chat';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={Chat} />
        <Route path="*" render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </Router>
  );
};

export default App;
