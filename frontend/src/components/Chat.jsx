import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { fetchChannels } from '../store/channelsSlice';
import { fetchMessages, addMessage } from '../store/messagesSlice';

const socket = io('http://localhost:3001');

const Chat = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const [currentChannel, setCurrentChannel] = useState('General');
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages(currentChannel));

    socket.on('receiveMessage', (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [dispatch, currentChannel]);

  const handleSendMessage = () => {
    const newMessage = {
      channel: currentChannel,
      content: message,
      user: 'User', // Replace with dynamic user information
      timestamp: new Date().toISOString(),
    };
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  return (
    <div>
      <div>
        <h2>Channels</h2>
        <ul>
          {channels.map((channel) => (
            <li
              key={channel.id}
              onClick={() => setCurrentChannel(channel.name)}
              style={{ cursor: 'pointer', fontWeight: channel.name === currentChannel ? 'bold' : 'normal' }}
            >
              {channel.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>{message.user}</strong>: {message.content}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
