import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const response = await axios.get('/api/channels');
  return response.data;
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannelId: null,
  },
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((channel) => channel.id === id);
      if (channel) {
        channel.name = name;
      }
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
      if (!state.activeChannelId && state.channels.length > 0) {
        state.activeChannelId = state.channels[0].id;
      }
    });
  },
});

export const { setActiveChannel, addChannel, renameChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
