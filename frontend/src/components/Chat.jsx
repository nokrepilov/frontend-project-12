import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../store/channelsSlice';
import { fetchMessages } from '../store/messagesSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h2>Channels</h2>
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
