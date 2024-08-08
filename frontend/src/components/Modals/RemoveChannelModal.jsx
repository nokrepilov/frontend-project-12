import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import useChannelModal from '../../hooks/useChannelModal.js';

import RemoveChannelForm from '../Forms/RemoveChannelForm.jsx';

import TYPES_MODAL from '../../utils/typesModal.js';

const RemoveChannelModal = () => {
  const { handleCloseCurrentModal, t } = useChannelModal();

  const { isVisible, type } = useSelector((state) => state.modals);

  const isCurrentModalVisible =
    type === TYPES_MODAL.REMOVE_CHANNEL() && isVisible;

  return (
    <Modal
      show={isCurrentModalVisible}
      size="md"
      centered
      onHide={handleCloseCurrentModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('channelModals.titleRemoveChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <RemoveChannelForm />
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
