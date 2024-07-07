import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/login', values);
        localStorage.setItem('token', response.data.token);
        history.push('/');
      } catch (error) {
        setErrors({ password: t('login.invalid_credentials') });
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">{t('login.username')}</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </div>
        <div>
          <label htmlFor="password">{t('login.password')}</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button type="submit" disabled={formik.isSubmitting}>{t('login.submit')}</button>
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </form>
      <Link to="/signup">{t('login.signup_link')}</Link>
    </div>
  );
};

export default Login;
