import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/">{t('welcome')}</Link>
        {token && <button onClick={handleLogout}>{t('logout')}</button>}
      </nav>
    </header>
  );
};

export default Header;
