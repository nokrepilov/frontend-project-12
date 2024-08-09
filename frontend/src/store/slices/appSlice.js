/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  username: localStorage.getItem('nickname') ? localStorage.getItem('nickname') : '',
  modalChannelId: '',
  modalChannelName: '',
  showModal: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserData(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload.token;
      state.username = action.payload.nickname;
    },
    setChannelModal(state, action) {
      state.modalChannelId = action.payload.id;
      state.modalChannelName = action.payload.name;
      state.showModal = action.payload.modalName;
    },
    changeChannel: (state, action) => {
      const { name, id } = action.payload;
      state.currentChannelId = id;
      state.currentChannelName = name;
    },
  },
});

export const { setUserData, setChannelModal, changeChannel } = appSlice.actions;
export default appSlice.reducer;
