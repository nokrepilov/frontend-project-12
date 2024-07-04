import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Chat from './components/Chat';
import Login from './components/Login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/chat">
            {isAuthenticated ? <Chat /> : <Redirect to="/login" />}
          </Route>
          <Route path="/" exact>
            <Redirect to="/chat" />
          </Route>
          <Route>
            <div>404 Not Found</div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
