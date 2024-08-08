import { BsFilePlus } from 'react-icons/bs';

import TYPES_MODAL from '../../utils/typesModal.js';

const HeaderListChannels = (props) => {
  const { showChannelModal, t } = props;

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4 bg-light bg-gradient shadow-sm small">
      <b>{t('channels.header')}</b>

      <button
        type="button"
        className="p-0 btn btn-group-vertical btn-lg"
        onClick={() => showChannelModal(TYPES_MODAL.ADD_CHANNEL())}
      >
        <BsFilePlus />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
};

export default HeaderListChannels;
