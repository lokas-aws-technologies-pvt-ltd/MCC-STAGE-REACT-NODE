import axios from 'axios';
import { API_URL } from '../config';

const rootUrl = API_URL;
// eslint-disable-next-line prefer-template
// const loginUrl = rootUrl + 'member/login';
const loginUrl = `${rootUrl}member/loginwithpin`;
const loginUrladminmember = `${rootUrl}member/adminmemberlogin`;
const pwUrl = `${rootUrl}member/forgotpassword`;
const pnUrl = `${rootUrl}member/forgotpin`;
const ltUrl = `${rootUrl}member/loginTrouble`;

export const userLogin = (frmData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, frmData);

      resolve(res.data);
      if (res.data.status === 'success') {
        resolve(res.data);
      }
    } catch (error) {
      // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status: 'error', message: error.error });
    }
  });
};

export const userLoginadminmember = (frmData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrladminmember, frmData);

      resolve(res.data);
      if (res.data.status === 'success') {
        resolve(res.data);
      }
    } catch (error) {
      // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status: 'error', message: error.error });
    }
  });
};
export const forgotPassword = (frmData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(pwUrl, frmData);

      resolve(res.data);
      if (res.data.status === 'success') {
        resolve(res.data);
      }
    } catch (error) {
      // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status: 'error', message: error.error });
    }
  });
};
export const forgotPin = (frmData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(pnUrl, frmData);

      resolve(res.data);
      if (res.data.status === 'success') {
        resolve(res.data);
      }
    } catch (error) {
      // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status: 'error', message: error.error });
    }
  });
};

export const loginTrouble = (frmData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(ltUrl, frmData);

      resolve(res.data);
      if (res.data.status === 'success') {
        resolve(res.data);
      }
    } catch (error) {
      // eslint-disable-next-line prettier/prettier
        // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status: 'error', message: error.error });
    }
  });
};
