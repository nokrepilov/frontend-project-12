import { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import cn from 'classnames';

import schemaYupNameChannel from '../../utils/schemaYupNameChannel.js';

import useFilter from '../../hooks/useFilter.js';

import useChannelModal from '../../hooks/useChannelModal.js';

import useSocket from '../../hooks/useSocket.js';

import { useEditChannelMutation } from '../../api/channelsApi.js';

const RenameChannelForm = () => {
  const { channels, currentChannelId, handleCloseCurrentModal, refetch, t } =
    useChannelModal();

  const { renameOneChannel } = useSocket();

  const filter = useFilter();

  const refInputName = useRef();

  const namesChannels = channels.map((channel) => channel.name);

  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );

  const schema = schemaYupNameChannel(namesChannels, t);

  const [
    editChannel,
    { error: editChannelError, isLoading: isEditingChannel },
  ] = useEditChannelMutation();

  useEffect(() => {
    refInputName.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },

    validationSchema: schema,

    onSubmit: async (valuesForm) => {
      const newNameChannel = filter.clean(valuesForm.name);

      try {
        const response = await editChannel({
          id: currentChannelId,
          updateData: { name: newNameChannel },
        });

        renameOneChannel(response.data, (acknowledgment) => {
          if (acknowledgment.error) {
            toast.error(t('errorsToast.channelEditError'));
          } else {
            console.log(acknowledgment.status);
          }
        });

        toast.success(t('successToast.channelEdited'));

        handleCloseCurrentModal();
        refetch();
      } catch (err) {
        console.error('Error editing channel:', err);
        toast.error(t('errorsToast.channelEditError'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className="visually-hidden">
        {t('channelModals.labelNameChannel')}
      </label>

      <input
        name="name"
        id="name"
        type="text"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        ref={refInputName}
        className={cn('mb-2', 'form-control', {
          'is-valid': formik.touched.name && !formik.errors.name,
          'is-invalid': formik.touched.name && formik.errors.name,
        })}
      />

      {formik.touched.name && formik.errors.name ? (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          {formik.errors.name}
        </div>
      ) : null}

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={handleCloseCurrentModal}
        >
          {t('buttons.btnСancel')}
        </button>

        <button type="submit" className="btn btn-primary">
          {t('buttons.btnSend')}
        </button>
      </div>
    </Form>
  );
};

export default RenameChannelForm;
