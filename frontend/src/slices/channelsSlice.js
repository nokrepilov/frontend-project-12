import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => ({
      ...state,
      channels: action.payload,
    }),
    addChannel: (state, action) => ({
      ...state,
      channels: [...state.channels, action.payload],
    }),
    removeChannel: (state, action) => ({
      ...state,
      channels: state.channels.filter(
        (channel) => channel.id !== action.payload.id,
      ),
    }),
    setEditChannel: (state, action) => ({
      ...state,
      channels: state.channels.map((channel) =>
        channel.id === action.payload.id
          ? { ...channel, ...action.payload }
          : channel,
      ),
    }),
    setCurrentChannelId: (state, action) => ({
      ...state,
      currentChannelId: action.payload,
    }),
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  setEditChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
