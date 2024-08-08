import Channel from './Channel.jsx';

import useChannel from '../../hooks/useChannel.js';

const ListChannels = () => {
  const { channels } = useChannel();

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 h-100 d-block"
    >
      {channels?.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </ul>
  );
};

export default ListChannels;
