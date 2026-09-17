import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  txnInfoLoading: false,
  txnInfoerror: '',
  chamberRequestInfoLoading: false,
  chamberRequestInfoerror: '',
  chamberOrderInfoLoading: false,
  chamberOrderInfoerror: '',
  reportInfoLoading: false,
  reportInfoerror: '',
  txnInfo: [],
  chamberRequestInfo: [],
  chamberOrderInfo: [],
  reportInfo: [],
  dashboardInfoLoading: false,
  dashboardInfo: [],
};

const dashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {
    txnInfoPending: (state) => {
      state.txnInfoLoading = true;
    },
    txnInfoSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.txnInfoLoading = false;
      state.txnInfo = payload;
      state.txnInfoerror='';
    },
    txnInfoFail: (state, { payload }) => {
      state.txnInfoLoading = false;
      state.txnInfoerror = payload;
      state.txnInfo = [];
    },
    reportInfoPending: (state) => {
      state.reportInfoLoading = true;
    },
    reportInfoSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.reportInfoLoading = false;
      state.reportInfo = payload;
      state.reportInfoerror='';
    },
    reportInfoFail: (state, { payload }) => {
      state.reportInfoLoading = false;
      state.reportInfoerror = payload;
      state.reportInfo = [];
    },
    chamberOrderInfoPending: (state) => {
      state.chamberOrderInfoLoading = true;
    },
    chamberOrderInfoSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.chamberOrderInfoLoading = false;
      state.chamberOrderInfo = payload;
      state.chamberOrderInfoerror = '';
    },
    chamberOrderInfoFail: (state, { payload }) => {
      state.chamberOrderInfoLoading = false;
      state.chamberOrderInfoerror = payload;
      state.chamberOrderInfo = [];
    },
    chamberRequestInfoPending: (state) => {
      state.chamberRequestInfoLoading = true;
    },
    chamberRequestInfoSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.chamberRequestInfoLoading = false;
      state.chamberRequestInfo = payload;
      state.chamberRequestInfoerror = '';
    },
    chamberRequestInfoFail: (state, { payload }) => {
      state.chamberRequestInfoLoading = false;
      state.chamberRequestInfoerror = payload;
      state.chamberRequestInfo = [];
    },
    dashboardInfoPending: (state) => {
      state.dashboardInfoLoading = true;
    },
    dashboardInfoSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.dashboardInfoLoading = false;
      state.dashboardInfo = payload;
      state.dashboardInfoerror = '';
    },
    dashboardInfoFail: (state, { payload }) => {
      state.dashboardInfoLoading = false;
      state.dashboardInfoerror = payload;
      state.dashboardInfo = [];
    },
    /* setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    }, */
  },
});

export const {
  chamberOrderInfoFail,
  chamberOrderInfoPending,
  chamberOrderInfoSuccess,
  chamberRequestInfoFail,
  chamberRequestInfoPending,
  chamberRequestInfoSuccess,
  reportInfoFail,
  reportInfoPending,
  reportInfoSuccess,
  txnInfoFail,
  txnInfoPending,
  txnInfoSuccess,
  dashboardInfoFail,
  dashboardInfoPending,
  dashboardInfoSuccess,
} = dashboardSlice.actions;
const adminDashboardReducer = dashboardSlice.reducer;

export default adminDashboardReducer;
