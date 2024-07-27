import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store';
import init from './init.jsx';

const startApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const initApp = await init();
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        {initApp}
      </Provider>
    </React.StrictMode>,
  );
};

startApp();
