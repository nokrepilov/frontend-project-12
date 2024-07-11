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
    <RollbarProvider instance={rollbar}>
      <ErrorBoundary>
        <App />
        <ToastContainer />
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
