import { useEffect } from 'react';
import { toast } from 'react-toastify';

import useChannelModal from '../../hooks/useChannelModal.js';

import useSocket from '../../hooks/useSocket.js';

import { useRemoveChannelMutation } from '../../api/channelsApi.js';

const RemoveChannelForm = () => {
  const {
    currentChannelId,
    handleCloseCurrentModal,
    handleCurrentChannelId,
    refetch,
    t,
  } = useChannelModal();

  const { removeOneChannel } = useSocket();

  const [
    removeChannel,
    { error: removeChannelError, isLoading: isRemovingChannel },
  ] = useRemoveChannelMutation();

  const handleRemoveChannel = async () => {
    try {
      const response = await removeChannel(currentChannelId);

      removeOneChannel(response.data, (acknowledgment) => {
        if (acknowledgment.error) {
          toast.error(t('errorsToast.channelRemoveError'));
        } else {
          console.log(acknowledgment.status);
        }
      });

      toast.success(t('successToast.channelRemoved'));

      handleCurrentChannelId(null);
      handleCloseCurrentModal();
      refetch();
    } catch (err) {
      console.error('Error removing channel:', err);
      toast.error(t('errorsToast.channelRemoveError'));
    }
  };

  return (
    <>
      <p className="lead">{t('channelModals.questionRemoveChannel')}</p>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={handleCloseCurrentModal}
        >
          {t('buttons.btnСancel')}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleRemoveChannel}
        >
          {t('buttons.btnDelete')}
        </button>
      </div>
    </>
  );
};

export default RemoveChannelForm;
