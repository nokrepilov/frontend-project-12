import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, 'Must be at least 3 characters').max(20, 'Must be 20 characters or less').required('Required'),
      password: yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('/api/signup', { username: values.username, password: values.password });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrors({ username: 'Username already exists' });
        } else {
          setErrors({ general: 'An error occurred' });
        }
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>Submit</button>
        {formik.errors.general ? <div>{formik.errors.general}</div> : null}
      </form>
    </div>
  );
};

export default SignUp;
