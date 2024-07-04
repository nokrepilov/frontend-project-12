import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const response = await axios.get('http://localhost:3001/channels');
  return response.data;
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
    });
  },
});

export default channelsSlice.reducer;
