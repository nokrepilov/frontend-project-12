import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
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
        setErrors({ password: 'Invalid credentials' });
        setSubmitting(false);
      }
    },
  });

  return (
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
      </div>
      <button type="submit" disabled={formik.isSubmitting}>
        Submit
      </button>
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}
    </form>
  );
};

export default Login;
