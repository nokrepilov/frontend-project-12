import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addChannel } from '../store/channelsSlice';
import axios from 'axios';

const AddChannelModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().min(3, 'Must be at least 3 characters').max(20, 'Must be 20 characters or less').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('/api/channels', { name: values.name });
        dispatch(addChannel(response.data));
        onClose();
      } catch (error) {
        console.error('Failed to add channel', error);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="modal">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Channel Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>Submit</button>
      </form>
    </div>
  );
};

export default AddChannelModal;
