import axios from 'axios';
import { API_URL } from '../config';

const rootUrl = API_URL;
// eslint-disable-next-line prefer-template
const orderUrl = rootUrl + 'upgrade/order';
const paymentUrl = `${rootUrl}upgrade/payment`;

export const razorOrder = (frmData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(orderUrl, frmData);

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

export const razorPayment = (frmData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(paymentUrl, frmData);

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
