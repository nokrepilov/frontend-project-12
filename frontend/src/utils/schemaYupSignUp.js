import * as Yup from 'yup';

const schemaYupSignUp = (password, t) => {
  Yup.setLocale({
    mixed: {
      username: 'username',
      password: 'password',
      confirmPassword: 'confirmPassword',
      min: 'min',
      max: 'max',
      minPassword: 'minPassword',
      required: 'required',
    },
  });

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errorsValidation.min'))
      .max(20, t('errorsValidation.max'))
      .required(t('errorsValidation.required')),

    password: Yup.string()
      .min(6, t('errorsValidation.minPassword'))
      .required(t('errorsValidation.required')),

    confirmPassword: Yup.string()
      .matches(new RegExp(password), t('errorsValidation.matchPasswords'))
      .min(6, t('errorsValidation.minPassword'))
      .required(t('errorsValidation.required')),
  });

  return schema;
};

export default schemaYupSignUp;
