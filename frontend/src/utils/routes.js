const ROUTES = {
  baseURL: () => '/api/v1',

  home: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  channels: () => '/channels',
  messages: () => '/messages',

  loginApi: () => '/api/v1/login',
  signupApi: () => '/api/v1/signup',
  channelsApi: () => '/api/v1/channels',
  messagesApi: () => '/api/v1/messages',
};

export default ROUTES;

// https://www.npmjs.com/package/@hexlet/chat-server
