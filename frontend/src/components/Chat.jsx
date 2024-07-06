import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { fetchChannels, setActiveChannel } from '../store/channelsSlice';
import { fetchMessages, addMessage } from '../store/messagesSlice';
import AddChannelModal from './AddChannelModal';
import ChannelDropdown from './ChannelDropdown';

const socket = io('http://localhost:3001');

const Chat = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const messages = useSelector((state) => state.messages.messages.filter((msg) => msg.channelId === activeChannelId));
  const [message, setMessage] = useState('');
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages(activeChannelId));

    socket.on('receiveMessage', (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [dispatch, activeChannelId]);

  const handleSendMessage = () => {
    const newMessage = {
      channelId: activeChannelId,
      content: message,
      user: 'User', // Replace with dynamic user information
      timestamp: new Date().toISOString(),
    };
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  const handleAddChannel = () => {
    setShowAddChannelModal(true);
  };

  return (
    <div className="chat-container">
      <div className="channels">
        <h2>Channels</h2>
        <ul>
          {channels.map((channel) => (
            <li
              key={channel.id}
              onClick={() => dispatch(setActiveChannel(channel.id))}
              style={{ cursor: 'pointer', fontWeight: channel.id === activeChannelId ? 'bold' : 'normal' }}
            >
              #{channel.name}
              <ChannelDropdown channel={channel} />
            </li>
          ))}
        </ul>
        <button onClick={handleAddChannel}>Add Channel</button>
        {showAddChannelModal && <AddChannelModal onClose={() => setShowAddChannelModal(false)} />}
      </div>
      <div className="messages">
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
