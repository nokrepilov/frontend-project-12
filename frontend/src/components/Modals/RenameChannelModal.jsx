import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import useChannelModal from '../../hooks/useChannelModal.js';

import RenameChannelForm from '../Forms/RenameChannelForm.jsx';

import TYPES_MODAL from '../../utils/typesModal.js';

const RenameChannelModal = () => {
  const { handleCloseCurrentModal, t } = useChannelModal();

  const { isVisible, type } = useSelector((state) => state.modals);

  // console.log(isVisible);

  // console.log(type);

  const isCurrentModalVisible =
    type === TYPES_MODAL.RENAME_CHANNEL() && isVisible;

  return (
    <Modal
      show={isCurrentModalVisible}
      size="md"
      centered
      onHide={handleCloseCurrentModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('channelModals.titleRenameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <RenameChannelForm />
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
