import React from 'react';
import { useDispatch } from 'react-redux';
import { renameChannel, removeChannel } from '../store/channelsSlice';

const ChannelDropdown = ({ channel }) => {
  const dispatch = useDispatch();

  const handleRename = () => {
    const newName = prompt('New channel name');
    if (newName) {
      dispatch(renameChannel({ id: channel.id, name: newName }));
    }
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete this channel?')) {
      dispatch(removeChannel(channel.id));
    }
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button">⋮</button>
      <div className="dropdown-content">
        <button onClick={handleRename}>Rename</button>
        <button onClick={handleRemove}>Delete</button>
      </div>
    </div>
  );
};

export default ChannelDropdown;
