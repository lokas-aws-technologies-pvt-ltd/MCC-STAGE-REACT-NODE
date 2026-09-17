import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: '',
  memberTranscation: [],
  memberStatement: [],
  memberStatementmonth: [],
  memberViewStatement:[],
};

const viewStatementSlice = createSlice({
  name: 'memberStatement',
  initialState,
  reducers: {
    viewStatmentsPending: (state) => {
      state.isLoading = true;
    },
    viewStatmentsSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.isLoading = false;
      state.memberStatement = payload;
    },
    viewStatmentsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.memberStatement = [];
    },
    viewStatementmonthPending: (state) => {
        state.isLoading = true;
      },
      viewStatementmonthSuccess: (state, { payload }) => {
        // console.log('payload',payload);
        state.isLoading = false;
        state.memberStatementmonth = payload.result;
      },
      viewStatementmonthFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.memberStatementmonth = [];
      },
    getCurrentMonthTxnPending: (state) => {
      state.isLoading = true;
    },
    getCurrentMonthTxnSuccess: (state,{ payload }) => {
      // console.log('payload',payload);
      state.isLoading = false;
      state.memberTranscation = payload.result;
      state.error = '';
    },
    getCurrentMonthTxnFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.memberTranscation = [];
    },
    getMemberViewStatementPending: (state) => {
      state.isLoading = true;
    },
    getMemberViewStatementSuccess: (state,{ payload }) => {
      // console.log('payload',payload);
      state.isLoading = false;
      state.memberViewStatement = payload;
      state.error = '';
    },
    getMemberViewStatementFail:(state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.memberViewStatement = [];
    },
    /* setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    }, */
  },
});

export const { viewStatmentsPending, viewStatmentsSuccess, viewStatmentsFail, viewStatementmonthPending, viewStatementmonthFail, viewStatementmonthSuccess, getCurrentMonthTxnPending, getCurrentMonthTxnSuccess, getCurrentMonthTxnFail, getMemberViewStatementFail, getMemberViewStatementPending, getMemberViewStatementSuccess } =
  viewStatementSlice.actions;
const memberStatementReducer = viewStatementSlice.reducer;

export default memberStatementReducer;
