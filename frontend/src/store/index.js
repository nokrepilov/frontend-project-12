import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice.js';
import channelsReducer from '../slices/channelsSlice.js';
import messagesReducer from '../slices/messagesSlice.js';
import modalsReducer from '../slices/modalsSlice.js';

import { channelsApi } from '../api/channelsApi.js';
import { messagesApi } from '../api/messagesApi.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      channelsApi.middleware,
      messagesApi.middleware,
    ),
});

export default store;
