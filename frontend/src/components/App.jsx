import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          {isAuthenticated ? <Chat /> : <Redirect to="/login" />}
        </Route>
        <Route path="*">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
