import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getBackendCouponApi() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons`)
  } catch (error) {
    throw error;
  }
}
export { getBackendCouponApi }