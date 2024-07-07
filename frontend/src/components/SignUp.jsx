import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, t('signup.username_length')).max(20, t('signup.username_length')).required(t('required')),
      password: yup.string().min(6, t('signup.password_length')).required(t('required')),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('signup.password_match')).required(t('required')),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/signup', { username: values.username, password: values.password });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrors({ username: t('signup.username_exists') });
        } else {
          setErrors({ general: t('signup.general_error') });
        }
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h2>{t('signup.signup')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">{t('signup.username')}</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        </div>
        <div>
          <label htmlFor="password">{t('signup.password')}</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <div>
          <label htmlFor="confirmPassword">{t('signup.confirm_password')}</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>{t('signup.submit')}</button>
        {formik.errors.general ? <div>{formik.errors.general}</div> : null}
      </form>
      <Link to="/login">{t('signup.login_link')}</Link>
    </div>
  );
};

export default SignUp;
