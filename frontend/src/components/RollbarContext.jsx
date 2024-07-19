import React, { createContext, useContext } from 'react';
import Rollbar from 'rollbar';

const RollbarContext = createContext(null);

export const RollbarProvider = ({ children }) => {
  const rollbar = new Rollbar({
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  });

  return (
    <RollbarContext.Provider value={rollbar}>
      {children}
    </RollbarContext.Provider>
  );
};

export const useRollbar = () => {
  return useContext(RollbarContext);
};
