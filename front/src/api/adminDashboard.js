import axios from 'axios';
import { API_URL } from '../config';

const rootUrl = API_URL;
// eslint-disable-next-line prefer-template
const vsUrl = rootUrl + 'dashboard/reports';
const vsmUrl = `${rootUrl}dashboard/getRequestsCount`;
/* const gcmtUrl = `${rootUrl}dashboard/getTxnSuccess`;
const vysUrl = `${rootUrl}dashboard/getTxnApproved`;
const vys1Url = `${rootUrl}dashboard/getTxnPending`;
const vys2Url = `${rootUrl}dashboard/getTxnClosed`; */

const taxinfoUrl = `${rootUrl}dashboard/getTxninfo`;
const OCUrl = `${rootUrl}dashboard/getOrdersCount`;
const dashUrl = 'https://madrascricketclub.org/backend/portal/dashboard/admindas.php';

export const getTxninfo = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(taxinfoUrl);

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
export const getChambeReqrinfo = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(vsmUrl);

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
export const getOrderrinfo = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(OCUrl);

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
export const viewReports = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(vsUrl);

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

export const viewDashboard = (memberCode, type) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${dashUrl}?member_code=${memberCode}&type=${type}`, { crossDomain: true });

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
