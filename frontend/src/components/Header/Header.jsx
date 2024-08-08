import { useTranslation } from 'react-i18next';

import { Link, Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import useAuth from '../../hooks/useAuth.js';

import BtnExit from './BtnExit';

const Header = () => {
  const { loggedIn } = useAuth();

  const { t } = useTranslation();

  return (
    <>
      <header>
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link className="navbar-brand" to="/">
              {t('baseTextUI.header')}
            </Link>

            {loggedIn && <BtnExit />}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <ToastContainer />
    </>
  );
};

export default Header;
