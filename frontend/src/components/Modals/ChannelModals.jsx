import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const ChannelModals = () => {
  return (
    <div className="channelModals">
      <AddChannelModal />
      <RenameChannelModal />
      <RemoveChannelModal />
    </div>
  );
};

export default ChannelModals;
