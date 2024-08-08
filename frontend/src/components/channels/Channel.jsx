import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import cn from 'classnames';

import useChannel from '../../hooks/useChannel';

import TYPES_MODAL from '../../utils/typesModal.js';

const Channel = (props) => {
  const { channel } = props;

  const { currentChannelId, handleCurrentChannelId, showChannelModal, t } =
    useChannel();

  const btnChannelNameClass = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'text-truncate',
    'btn',
    {
      'btn-primary': currentChannelId === channel.id,
      'btn-light': currentChannelId !== channel.id,
    },
  );

  const btnToggleClass = cn({
    'btn-primary': currentChannelId === channel.id,
    'btn-light': currentChannelId !== channel.id,
  });

  return (
    <li className="nav-item w-100">
      <Dropdown
        as={ButtonGroup}
        className="w-100"
        onClick={() => handleCurrentChannelId(channel.id)}
      >
        <button type="button" className={btnChannelNameClass}>
          <span className="me-1">#</span>
          {channel.name}
        </button>

        {channel.removable === true && (
          <>
            <Dropdown.Toggle
              split
              className={btnToggleClass}
              id="dropdown-split-basic"
            >
              <span className="visually-hidden">
                {t('channels.labelToggle')}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => showChannelModal(TYPES_MODAL.REMOVE_CHANNEL())}
              >
                {t('buttons.btnDelete')}
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => showChannelModal(TYPES_MODAL.RENAME_CHANNEL())}
              >
                {t('buttons.btnRename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </li>
  );
};

export default Channel;
