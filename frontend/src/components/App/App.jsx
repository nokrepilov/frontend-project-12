import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthProvider from './AuthProvider.jsx';
import PrivateRoute from './PrivateRoute.jsx';

import Header from '../Header/Header.jsx';

import Chat from '../../pages/Chat/Chat.jsx';
import Login from '../../pages/Login/Login.jsx';
import SignUp from '../../pages/SignUp/SignUp.jsx';
import NotFound from '../../pages/NotFound/NotFound.jsx';

import ROUTES from '../../utils/routes.js';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home()} element={<Header />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route path={ROUTES.login()} element={<Login />} />
            <Route path={ROUTES.signup()} element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
