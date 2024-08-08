import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import useChannelModal from '../../hooks/useChannelModal.js';

import AddChannelForm from '../Forms/AddChannelForm.jsx';

import TYPES_MODAL from '../../utils/typesModal.js';

const AddChannelModal = () => {
  const { handleCloseCurrentModal, t } = useChannelModal();

  const { isVisible, type } = useSelector((state) => state.modals);

  const isCurrentModalVisible = type === TYPES_MODAL.ADD_CHANNEL() && isVisible;

  return (
    <Modal
      show={isCurrentModalVisible}
      size="md"
      centered
      onHide={handleCloseCurrentModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('channelModals.titleAddChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddChannelForm />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
