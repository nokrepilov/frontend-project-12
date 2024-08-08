import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import cn from 'classnames';

import useAuth from '../../hooks/useAuth.js';

import axiosApi from '../../api/axiosApi.js';

import ROUTES from '../../utils/routes.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const refUsername = useRef();
  const refPassword = useRef();
  const refFeedback = useRef();

  const { logIn, logOut } = useAuth();

  const [validAuth, setValidAuth] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    refUsername.current.focus();
  }, []);

  useEffect(() => {
    if (validAuth === false) {
      refUsername.current.focus();
      refFeedback.current.style.display = 'block';
    }

    if (validAuth === true) {
      refFeedback.current.style.display = 'none';
    }
  }, [validAuth]);

  useEffect(() => {
    if (validAuth) navigate(ROUTES.home(), { replace: false });
  }, [validAuth]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (valuesForm) => {
      setError('');

      try {
        const response = await axiosApi.post(ROUTES.login(), valuesForm);
        //console.log(response.data); // => { token: ..., username: 'admin' }

        if (response.data.token) {
          logIn(response.data);
          setValidAuth(true);
        }
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          toast.error(t('errorsToast.networkError'));
        } else {
          setValidAuth(false);
          setError(t('loginForm.invalidCredentials'));
        }
      }
    },
  });

  const inputClasses = cn('form-control', {
    'is-valid': validAuth === true,
    'is-invalid': validAuth === false,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="form-floating mb-3">
        <input
          name="username"
          id="username"
          autoComplete="username"
          required
          placeholder={t('loginForm.login')}
          type="text"
          className={inputClasses}
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={refUsername}
        />

        <label className="form-label" htmlFor="username">
          {t('loginForm.login')}
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          name="password"
          id="password"
          autoComplete="current-password"
          required
          placeholder={t('loginForm.password')}
          type="password"
          className={inputClasses}
          onChange={formik.handleChange}
          value={formik.values.password}
          ref={refPassword}
        />

        <label className="form-label" htmlFor="password">
          {t('loginForm.password')}
        </label>

        <div className="invalid-feedback" ref={refFeedback}>
          {error}
        </div>
      </div>

      <button type="submit">{t('buttons.btnEnter')}</button>
    </Form>
  );
};

export default LoginForm;
