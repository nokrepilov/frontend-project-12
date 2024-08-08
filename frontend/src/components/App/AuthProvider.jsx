import { useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthContext from '../../contexts/AuthContext.js';

import { updateUserData } from '../../slices/authSlice.js';

import {
  setItemStorage,
  getItemStorage,
  clearStorage,
} from '../../utils/authLocalStorage.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const isLoggedIn = !!getItemStorage();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const logIn = (data) => {
    setItemStorage(data);
    dispatch(updateUserData(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    clearStorage();
    dispatch(updateUserData({ username: '', token: '' }));
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
