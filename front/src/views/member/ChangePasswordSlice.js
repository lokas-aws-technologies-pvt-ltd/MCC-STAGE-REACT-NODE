import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cpIsLoading: false,
  cpError: '',
  cpDetails: {},
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    cpLoading: (state) => {
      state.cpisLoading = true;
    },
    cpSuccess: (state, { payload }) => {
      state.cpisLoading = false;
      state.cpError = '';
      state.cpDetails = payload;
    },
    cpFail: (state, { payload }) => {
      state.cpisLoading = false;
      state.cpError = payload;
      state.cpDetails = {};
    },
  },
});

export const { cpLoading, cpSuccess, cpFail } = changePasswordSlice.actions;
const changePasswordReducer = changePasswordSlice.reducer;

export default changePasswordReducer;
