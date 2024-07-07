import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Chat from './components/Chat';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={Chat} />
        <Route path="*" render={() => <div>{t('not_found')}</div>} />
      </Switch>
    </Router>
  );
};

export default App;
