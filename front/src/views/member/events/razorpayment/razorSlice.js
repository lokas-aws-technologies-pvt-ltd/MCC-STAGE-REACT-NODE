import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  razorisLoading: false,
  razorerror: '',
  orderDetails: {},
  paymentDetails: {},
};

const razorSlice = createSlice({
  name: 'razor',
  initialState,
  reducers: {
    orderLoading: (state) => {
      state.razorisLoading = true;
    },
    orderSuccess: (state, { payload }) => {
      state.razorisLoading = false;
      state.pnError = '';
      state.orderDetails = payload;
    },
    orderFail: (state, { payload }) => {
      state.razorisLoading = false;
      state.razorerror = payload;
      state.orderDetails = {};
    },
    paymentSuccess: (state, { payload }) => {
      state.razorisLoading = false;
      state.pnError = payload;
      state.paymentDetails = payload;
    },
    paymentFail: (state, { payload }) => {
      state.razorisLoading = false;
      state.razorerror = payload;
    },
  },
});

export const { orderLoading, orderSuccess, orderFail, paymentSuccess, paymentFail } = razorSlice.actions;
const razorReducer = razorSlice.reducer;

export default razorReducer;
