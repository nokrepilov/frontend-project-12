export default {
  translation: {
    baseTextUI: {
      header: 'Hexlet Chat',
    },

    buttons: {
      btnExit: 'Выйти',
      btnEnter: 'Войти',
      btnСancel: 'Отменить',
      btnSend: 'Отправить',
      btnDelete: 'Удалить',
      btnRename: 'Переименовать',
    },

    notFoundPage: {
      header: 'Страница не найдена',
      text: 'Но вы можете перейти',
      linkMainPage: 'на главную страницу',
    },

    loginPage: {
      header: 'Войти',

      login: 'Логин',
      password: 'Пароль',

      noRegistrationQuestion: 'Нет аккаунта?',
      btnGetRegistration: 'Регистрация',
    },

    loginForm: {
      login: 'Ваш ник',
      password: 'Пароль',
      invalidCredentials: 'Неверные имя пользователя или пароль',
    },

    signUpPage: {
      header: 'Регистрация',

      username: 'Имя пользователя',
      ruleUsername: 'От 3 до 20 символов',

      password: 'Пароль',
      rulePassword: 'Не менее 6 символов',

      confirmPassword: 'Подтвердите пароль',
      ruleConfirmPassword: 'Пароли должны совпадать',

      btnSignUpSubmit: 'Зарегистрироваться',
    },

    messages: {
      countMessages_one: '{{count}} сообщение',
      countMessages_few: '{{count}} сообщения',
      countMessages_many: '{{count}} сообщений',
    },

    newMessageForm: {
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
    },

    channels: {
      header: 'Каналы',
      labelToggle: 'Управление каналом',
    },

    channelModals: {
      titleAddChannel: 'Добавить канал',
      titleRenameChannel: 'Переименовать канал',
      titleRemoveChannel: 'Удалить канал',
      labelNameChannel: 'Имя канала',
      questionRemoveChannel: 'Уверены?',
    },

    errorsValidation: {
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      notOneOf: 'Должно быть уникальным',
      name: 'Обязательное поле',

      minPassword: 'Не менее 6 символов',
      matchPasswords: 'Пароли должны совпадать',
    },

    errorsToast: {
      networkError: 'Ошибка соединения',

      messageGettingError: 'Ошибка получения сообщений',
      messageSendError: 'Ошибка отправки сообщения',

      channelGettingError: 'Ошибка получения каналов',
      channelAddError: 'Ошибка добавления канала',
      channelEditError: 'Ошибка переименования канала',
      channelRemoveError: 'Ошибка удаления канала',

      signupUserExists: 'Такой пользователь уже существует',

      authError: 'Ошибка аутентификации пользователя',
    },

    successToast: {
      channelAdded: 'Канал создан',
      channelEdited: 'Канал переименован',
      channelRemoved: 'Канал удален',
    },
  },
};
