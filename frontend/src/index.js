import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import { Provider, ErrorBoundary } from '@rollbar/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider
      config={{
        accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
        captureUncaught: true,
        captureUnhandledRejections: true,
        environment: 'production',
      }}
    >
      <ErrorBoundary>
        <App />
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
