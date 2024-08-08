import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { BsFillSendPlusFill } from 'react-icons/bs';

import { toast } from 'react-toastify';

import useFilter from '../../hooks/useFilter.js';
import useSocket from '../../hooks/useSocket.js';

import { useAddMessageMutation } from '../../api/messagesApi.js';

const NewMessageForm = (props) => {
  const { username, channelId, refetchListMessages } = props;

  const { addNewMessage } = useSocket();

  const { t } = useTranslation();

  const filter = useFilter();

  const refInputNewMessage = useRef();

  const [message, setNewMessage] = useState('');

  const [addMessage, { error: addMessageError, isLoading: isAddingMessage }] =
    useAddMessageMutation();

  useEffect(() => {
    refInputNewMessage.current.focus();
  }, [channelId]);

  useEffect(() => {
    if (addMessageError) {
      toast.error(t('errorsToast.messageSendError'));
    }
  }, [addMessageError]);

  const addMessageHandler = async (messageData) => {
    try {
      const response = await addMessage(messageData);

      addNewMessage(response.data, (acknowledgment) => {
        if (acknowledgment.error) {
          toast.error(t('errorsToast.messageSendError'));
        } else {
          console.log(acknowledgment.status);
        }
      });

      refetchListMessages();
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error(t('errorsToast.messageSendError'));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const text = filter.clean(message.trim());

    const newMessage = { body: text, username, channelId };

    addMessageHandler(newMessage);

    setNewMessage('');
  };

  return (
    <form
      noValidate=""
      className="py-1 border rounded-2"
      onSubmit={handleFormSubmit}
    >
      <div className="input-group has-validation">
        <input
          name="body"
          required
          aria-label={t('newMessageForm.ariaLabel')}
          placeholder={t('newMessageForm.placeholder')}
          className="border-0 p-0 ps-2 form-control"
          value={message}
          onChange={(e) => setNewMessage(e.target.value)}
          ref={refInputNewMessage}
        />

        <button
          type="submit"
          className="btn btn-group-vertical btn-lg"
          disabled=""
        >
          <BsFillSendPlusFill />
          <span className="visually-hidden"> {t('buttons.btnSend')}</span>
        </button>
      </div>
    </form>
  );
};

export default NewMessageForm;
