import axios from 'axios';
import { API_URL } from '../config';

const rootUrl = API_URL;
// eslint-disable-next-line prefer-template
const vsUrl = rootUrl + 'vs/viewStatments';
const vsmUrl = `${rootUrl}vs/viewStatementmonth`;
const gcmtUrl = `${rootUrl}vs/getCurrentMonthTxn`;
const vysUrl = `${rootUrl}vs/viewYearStatement`;
const newUrl = `https://madrascricketclub.org/backend/portal/members/memberdas.php`;

export const viewStatments = (memberCode, year) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${vsUrl}?member_code=${memberCode}&year=${year}`);

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
export const viewStatementmonth = (memberCode, year, month) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${vsmUrl}?member_code=${memberCode}&year=${year}&month=${month}`);

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
export const getCurrentMonthTxn = (memberCode) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${gcmtUrl}?member_code=${memberCode}`);

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
export const viewYearStatement = (memberCode) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${vysUrl}?member_code=${memberCode}`);

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
export const getMemberViewStatement = (memberCode) =>{
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${newUrl}?member_code=${memberCode}`,{ crossDomain: true });

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

}
