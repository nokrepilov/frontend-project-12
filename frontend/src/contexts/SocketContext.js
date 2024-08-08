import { createContext, useMemo } from 'react';

import initSocket from '../socket.js';

import TYPES_SOCKET_EVENTS from '../utils/typesSocketEvents.js';

const SocketContext = createContext({});

const SocketContextProvider = ({ children }) => {
  const socket = initSocket();

  const {
    NEW_MESSAGE,
    NEW_CHANNEL,
    RENAME_CHANNEL,
    REMOVE_CHANNEL,
    CONNECT_ERROR,
  } = TYPES_SOCKET_EVENTS;

  const value = useMemo(() => {
    const addNewMessage = (message, cb) => {
      socket.emit(NEW_MESSAGE(), message, (response) => {
        cb(response);
      });
    };

    const addNewChannel = (channel, cb) => {
      socket.emit(NEW_CHANNEL(), channel, (response) => {
        cb(response);
      });
    };

    const renameOneChannel = (channel, cb) => {
      socket.emit(RENAME_CHANNEL(), channel, (response) => {
        cb(response);
      });
    };

    const removeOneChannel = (channel, cb) => {
      socket.emit(REMOVE_CHANNEL(), channel, (response) => {
        cb(response);
      });
    };

    return {
      addNewMessage,
      addNewChannel,
      renameOneChannel,
      removeOneChannel,
      socket,
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
