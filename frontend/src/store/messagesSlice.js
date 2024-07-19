import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMessagesUrl } from './apiRoutes';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channel) => {
    const response = await axios.get(getMessagesUrl(channel));
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
