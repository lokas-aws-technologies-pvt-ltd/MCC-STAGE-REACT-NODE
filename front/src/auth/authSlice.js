import { createSlice, current } from '@reduxjs/toolkit';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { toast } from 'react-toastify';

const initialState = {
  isLogin: false,
  currentUser: {},
  isLoading: false,
  isPWLoading: false,
  isPNLoading: false,
  isLTLoading: false,
  isAuth: false,
  pwSent: false,
  pnSent: false,
  ltSent: false,
  error: '',
  pwError: '',
  pnError: '',
  ltError: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.isLoading = false;
      state.isAuth = true;
      state.error = '';
      state.isLogin = true;
      state.currentUser = payload;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.isAuth = false;
      state.isLogin = false;
      state.currentUser = {};
      toast.error(payload, {
        position: 'top-right',
      });
    },
    forgotPasswordReset: (state) => {
      state.isPWLoading = false;
      state.pwSent = false;
      state.pwError = '';
    },
    forgotPasswordPending: (state) => {
      state.isPWLoading = true;
    },
    forgotPasswordSuccess: (state) => {
      // console.log('payload',payload);
      state.isPWLoading = false;
      state.pwSent = true;
      state.pwError = '';
      toast.success('New Password has been sent to your mailId Successfully.', {
        position: 'top-right',
      });
    },
    forgotPasswordFail: (state, { payload }) => {
      state.isPWLoading = false;
      state.pwError = payload;
      toast.error(payload, {
        position: 'top-right',
      });
    },
    forgotPinReset: (state) => {
      state.isPNLoading = false;
      state.pnSent = false;
      state.pnError = '';
    },
    forgotPinPending: (state) => {
      state.isPNLoading = true;
    },
    forgotPinSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.isPNLoading = false;
      state.pnSent = true;
      state.pnError = '';
      toast.success('Pin number has been sent to your mailId Successfully.', {
        position: 'top-right',
      });
    },
    forgotPinFail: (state, { payload }) => {
      state.isPnLoading = false;
      state.pnError = payload;
      toast.error(payload, {
        position: 'top-right',
      });
    },
    logout: (state) => {
      return initialState;
    },
    LoginTroublePending: (state) => {
      state.isLTLoading = true;
    },
    LoginTroubleSuccess: (state, { payload }) => {
      // console.log('payload',payload);
      state.isLTLoading = false;
      state.ltSent = true;
      state.ltError = '';
      toast.success('Mail sent to IT Admin successfully.', {
        position: 'top-right',
      });
    },
    LoginTroubleFail: (state, { payload }) => {
      state.isLTLoading = false;
      state.ltError = payload;
      toast.error(payload, {
        position: 'top-right',
      });
    },
    /* setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    }, */
  },
});

export const {
  loginPending,
  loginSuccess,
  loginFail,
  forgotPasswordReset,
  forgotPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  forgotPinReset,
  forgotPinFail,
  forgotPinPending,
  forgotPinSuccess,
  logout,
  loginTroubleFail,
  loginTroublePending,
  loginTroubleSuccess,
} = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
