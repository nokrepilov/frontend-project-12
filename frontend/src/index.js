import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import { RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbar from './rollbar';

ReactDOM.render(
  <React.StrictMode>
    <RollbarProvider
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
    </RollbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
