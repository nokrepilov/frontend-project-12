import * as Yup from 'yup';

const schemaYupNameChannel = (listNames, t) => {
  Yup.setLocale({
    mixed: {
      name: 'name',
      min: 'min',
      max: 'max',
      required: 'required',
      notOneOf: 'notOneOf',
      default: 'name',
    },
  });

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('errorsValidation.min'))
      .max(20, t('errorsValidation.max'))
      .required(t('errorsValidation.required'))
      .notOneOf(listNames, t('errorsValidation.notOneOf')),
  });

  return schema;
};

export default schemaYupNameChannel;
