import { useTranslation } from 'react-i18next';

import SignUpForm from '../../components/Forms/SignUpForm.jsx';

import img from '../../assets/images/signup.jpg';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <div className="container_enteringData">
      <div className="container_enteringData_main">
        <div className="container_enteringData_img">
          <img src={img} alt={t('loginPage.header')} />
        </div>

        <div className="forma">
          <h1 className="mb-4"> {t('signUpPage.header')}</h1>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
