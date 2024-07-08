// src/components/Chat.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { fetchChannels } from '../store/channelsSlice';
import { fetchMessages, addMessage } from '../store/messagesSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const socket = io('http://localhost:3001');

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const [currentChannel, setCurrentChannel] = useState('General');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadChannels = async () => {
      try {
        await dispatch(fetchChannels());
      } catch (error) {
        toast.error(t('error.loading_channels'));
      }
    };

    const loadMessages = async () => {
      try {
        await dispatch(fetchMessages(currentChannel));
      } catch (error) {
        toast.error(t('error.loading_messages'));
      }
    };

    loadChannels();
    loadMessages();

    socket.on('receiveMessage', (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [dispatch, currentChannel, t]);

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
        <h2>{t('chat.channels')}</h2>
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
        <h2>{t('chat.messages')}</h2>
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
        <button onClick={handleSendMessage}>{t('chat.send')}</button>
      </div>
    </div>
  );
};

export default Chat;
