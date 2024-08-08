import { useTranslation } from 'react-i18next';

import useAuth from '../../hooks/useAuth.js';

const BtnExit = () => {
  const { t } = useTranslation();

  const { logOut } = useAuth();

  return (
    <button type="button" className="btn btn-primary" onClick={() => logOut()}>
      {t('buttons.btnExit')}
    </button>
  );
};

export default BtnExit;
