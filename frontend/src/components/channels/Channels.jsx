import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useGetChannelsQuery } from '../../api/channelsApi.js';

import {
  setChannels,
  setCurrentChannelId,
} from '../../slices/channelsSlice.js';

import {
  setModalVisibility,
  resetModalState,
} from '../../slices/modalsSlice.js';

import HeaderListChannels from './HeaderListChannels.jsx';

import ListChannels from './ListChannels.jsx';

import ChannelModals from '../Modals/ChannelModals.jsx';

import ChannelContext from '../../contexts/ChannelContext.js';

import ChannelModalContext from '../../contexts/ChannelModalContext.js';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const handleCurrentChannelId = (idChannel) => {
    dispatch(setCurrentChannelId(idChannel));
  };

  const {
    data,
    error: getChannelsError,
    isLoading: isGettingChannels,
    refetch,
  } = useGetChannelsQuery();
  // console.log(data);
  // {id: '1', name: 'general', removable: false}

  useEffect(() => {
    if (data) {
      dispatch(setChannels(data));

      if (!currentChannelId) handleCurrentChannelId(data[0].id);
    }
  }, [data, currentChannelId]);

  useEffect(() => {
    if (getChannelsError) {
      toast.error(t('errorsToast.channelGettingError'));
    }
  }, [getChannelsError]);

  const showChannelModal = (typeModal) => {
    dispatch(
      setModalVisibility({
        isVisible: true,
        type: typeModal,
      }),
    );
  };

  const handleCloseCurrentModal = () => dispatch(resetModalState());

  return (
    <>
      <HeaderListChannels t={t} showChannelModal={showChannelModal} />

      <ChannelContext.Provider
        value={{
          channels,
          currentChannelId,
          handleCurrentChannelId,
          showChannelModal,
          t,
        }}
      >
        <ListChannels />
      </ChannelContext.Provider>

      <ChannelModalContext.Provider
        value={{
          channels,
          currentChannelId,
          handleCurrentChannelId,
          handleCloseCurrentModal,
          refetch,
          t,
        }}
      >
        <ChannelModals />
      </ChannelModalContext.Provider>
    </>
  );
};

export default Channels;
