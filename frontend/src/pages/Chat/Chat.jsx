import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useSocket from '../../hooks/useSocket.js';

import TYPES_SOCKET_EVENTS from '../../utils/typesSocketEvents.js';

import {
  addChannel,
  setEditChannel,
  removeChannel,
} from '../../slices/channelsSlice.js';

import { addMessage } from '../../slices/messagesSlice.js';

import Channels from '../../components/Channels/Channels.jsx';
import Messages from '../../components/Messages/Messages.jsx';

const Chat = () => {
  const dispatch = useDispatch();

  const { socket } = useSocket();

  const {
    NEW_MESSAGE,
    NEW_CHANNEL,
    RENAME_CHANNEL,
    REMOVE_CHANNEL,
    CONNECT_ERROR,
  } = TYPES_SOCKET_EVENTS;

  useEffect(() => {
    socket.on(CONNECT_ERROR(), () => {
      socket.connect();
    });

    socket.on(NEW_CHANNEL(), (payload) => {
      dispatch(addChannel(payload));
    });

    socket.on(RENAME_CHANNEL(), (payload) => {
      dispatch(setEditChannel(payload));
    });

    socket.on(REMOVE_CHANNEL(), (payload) => {
      dispatch(removeChannel(payload));
    });

    socket.on(NEW_MESSAGE(), (payload) => {
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off(CONNECT_ERROR());
      socket.off(NEW_CHANNEL());
      socket.off(RENAME_CHANNEL());
      socket.off(REMOVE_CHANNEL());
      socket.off(NEW_MESSAGE());
    };
  }, []);

  return (
    <div className="container h-100 my-4 rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 px-0 flex-column h-100 d-flex">
          <Channels />
        </div>

        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100 border-start border-light border-2">
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
