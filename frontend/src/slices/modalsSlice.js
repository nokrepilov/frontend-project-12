import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  type: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalVisibility: (state, action) => ({
      ...state,
      isVisible: action.payload.isVisible,
      type: action.payload.type,
    }),
    resetModalState: () => initialState,
  },
});

export const { setModalVisibility, resetModalState } = modalsSlice.actions;

export default modalsSlice.reducer;
