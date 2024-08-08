import { useContext } from 'react';

import ChannelModalContext from '../contexts/ChannelModalContext.js';

const useChannelModal = () => useContext(ChannelModalContext);

export default useChannelModal;
