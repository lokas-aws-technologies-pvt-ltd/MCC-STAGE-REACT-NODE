import axios from 'axios';
import { API_URL } from '../config';

const rootUrl = API_URL;
// eslint-disable-next-line prefer-template
const pgUrl = `${rootUrl}restaurant/item_get`;

export const getProducts = (term, currentCat, currentSubCat, pageSize, pageIndex, foodType, active = '0') => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(pgUrl, { params: { term, currentCat, currentSubCat, pageSize, pageIndex, foodType, active } });

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
