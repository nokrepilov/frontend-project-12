import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import cn from 'classnames';

import schemaYupSignUp from '../../utils/schemaYupSignUp.js';

import useAuth from '../../hooks/useAuth.js';

import axiosApi from '../../api/axiosApi.js';

import ROUTES from '../../utils/routes.js';

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const refUsername = useRef();
  const refPassword = useRef();
  const refConfirmPassword = useRef();

  const ERR_USER_EXISTS = 409;

  const { logIn, logOut } = useAuth();

  const [validAuth, setValidAuth] = useState(null);

  useEffect(() => {
    refUsername.current.focus();
  }, []);

  useEffect(() => {
    if (validAuth) navigate(ROUTES.home(), { replace: false });
  }, [validAuth]);

  useEffect(() => {
    if (validAuth === false) {
      refUsername.current.focus();

      refUsername.current.classList.remove('is-valid');
      refPassword.current.classList.remove('is-valid');
      refConfirmPassword.current.classList.remove('is-valid');

      refUsername.current.classList.add('is-invalid');
      refPassword.current.classList.add('is-invalid');
      refConfirmPassword.current.classList.add('is-invalid');
    }
  }, [validAuth]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: () => schemaYupSignUp(formik.values.password, t),

    onSubmit: async (valuesForm) => {
      const { username, password } = valuesForm;

      try {
        const response = await axiosApi.post(ROUTES.signup(), {
          username,
          password,
        });

        if (response.data.token) {
          logIn(response.data);
          setValidAuth(true);
        }
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          toast.error(t('errorsToast.networkError'));
        } else if (err.response.status === ERR_USER_EXISTS) {
          setValidAuth(false);
          toast.error(t('errorsToast.signupUserExists'));
        } else {
          setValidAuth(false);
          toast.error(t('errorsToast.networkError'));
          console.log(err);
        }
      }
    },
  });

  const inputClasses = (field) =>
    cn('form-control', {
      'is-valid': formik.touched[field] && !formik.errors[field],
      'is-invalid': formik.touched[field] && formik.errors[field],
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="form-floating mb-3">
        <input
          placeholder={t('signUpPage.ruleUsername')}
          name="username"
          autoComplete="username"
          required=""
          id="username"
          className={inputClasses('username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={refUsername}
        />

        <label className="form-label" htmlFor="username">
          {t('signUpPage.username')}
        </label>

        {formik.touched.username && formik.errors.username ? (
          <div className="invalid-tooltip" style={{ display: 'block' }}>
            {formik.errors.username}
          </div>
        ) : null}
      </div>

      <div className="form-floating mb-3">
        <input
          placeholder={t('signUpPage.rulePassword')}
          name="password"
          aria-describedby="passwordHelpBlock"
          required=""
          autoComplete="new-password"
          type="password"
          id="password"
          className={inputClasses('password')}
          onChange={formik.handleChange}
          value={formik.values.password}
          ref={refPassword}
        />

        <label className="form-label" htmlFor="password">
          {t('signUpPage.password')}
        </label>

        {formik.touched.password && formik.errors.password ? (
          <div className="invalid-tooltip" style={{ display: 'block' }}>
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="form-floating mb-4">
        <input
          placeholder={t('signUpPage.ruleConfirmPassword')}
          name="confirmPassword"
          required=""
          autoComplete="new-password"
          type="password"
          id="confirmPassword"
          className={inputClasses('confirmPassword')}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          ref={refConfirmPassword}
        />

        <label className="form-label" htmlFor="confirmPassword">
          {t('signUpPage.confirmPassword')}
        </label>

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="invalid-tooltip" style={{ display: 'block' }}>
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <button type="submit">{t('signUpPage.btnSignUpSubmit')}</button>
    </Form>
  );
};

export default SignUpForm;
