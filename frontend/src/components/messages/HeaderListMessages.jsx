import { useTranslation } from 'react-i18next';

const HeaderListMessages = (props) => {
  const { nameCurrentChannel, countCurrentChannelMessages } = props;

  const { t } = useTranslation();

  return (
    <>
      <p className="m-0">
        <b># {nameCurrentChannel}</b>
      </p>
      <span className="text-muted">
        {t('messages.countMessages', { count: countCurrentChannelMessages })}
      </span>
    </>
  );
};

export default HeaderListMessages;
