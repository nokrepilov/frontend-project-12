import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addChannel } from '../store/channelsSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

const AddChannel = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: yup.object({
      channelName: yup.string().min(3, t('validation.channel_name_length')).max(20, t('validation.channel_name_length')).required(t('validation.required')),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const filteredChannelName = leoProfanity.clean(values.channelName);
        await dispatch(addChannel({ name: filteredChannelName }));
        toast.success(t('toast.channel_added'));
        closeModal();
      } catch (error) {
        toast.error(t('error.adding_channel'));
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="channelName">{t('channel.channel_name')}</label>
        <input
          id="channelName"
          name="channelName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.channelName}
        />
        {formik.errors.channelName ? <div>{formik.errors.channelName}</div> : null}
      </div>
      <button type="submit" disabled={formik.isSubmitting}>{t('channel.add')}</button>
    </form>
  );
};

export default AddChannel;
