import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginForm from '../../components/Forms/LoginForm.jsx';

import img from '../../assets/images/login.jpg';

import ROUTES from '../../utils/routes.js';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="container_enteringData">
      <div className="container_enteringData_main">
        <div className="container_enteringData_img">
          <img src={img} alt="login" />
        </div>

        <div className="forma">
          <h1 className="mb-4">{t('loginPage.header')}</h1>

          <LoginForm />
        </div>
      </div>

      <div className="container_enteringData_footer">
        <span>{t('loginPage.noRegistrationQuestion')}</span>
        <Link to={ROUTES.signup()}>{t('loginPage.btnGetRegistration')}</Link>
      </div>
    </div>
  );
};

export default Login;
