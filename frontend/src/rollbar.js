import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '6f2072f40db948cca5f80bb07eb2bbcd',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
});

export default rollbar;
