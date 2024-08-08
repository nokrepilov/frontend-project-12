import { useContext } from 'react';

import ChannelContext from '../contexts/ChannelContext';

const useChannel = () => useContext(ChannelContext);

export default useChannel;
