import { useSelector } from 'react-redux';
import * as filter from 'leo-profanity';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Send } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAddMessageMutation } from '../../api/messages';

const Message = () => {
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const username = useSelector((state) => state.app.username);
  const [addMessage] = useAddMessageMutation();
  const { t } = useTranslation();
  const messageSchema = Yup.object().shape({
    message: Yup.string().required(t('form.errors.required')),
  });
  const handleFormSubmit = async (values, { resetForm }) => {
    const { message } = values;
    const data = {
      message: filter.clean(message),
      channelId: currentChannelId,
      username,
    };
    await addMessage(data).unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mt-auto py-3 px-5">
      <Formik
        initialValues={{ message: '' }}
        onSubmit={handleFormSubmit}
        validateOnChange={false}
        validationSchema={messageSchema}
      >
        {({
          handleSubmit, handleChange, values, errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Label htmlFor="newMessage" hidden>{t('form.labels.message')}</Form.Label>
              <Form.Control
                placeholder={t('form.placeholders.message')}
                autoFocus
                id="newMessage"
                aria-label={t('form.placeholders.message')}
                value={values.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
                type="text"
                name="message"
              />
              <Button type="submit">
                <Send />
              </Button>
              <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Message;
