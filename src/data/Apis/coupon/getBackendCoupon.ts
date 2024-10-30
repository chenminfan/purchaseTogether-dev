import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getBackendCouponApi(page) {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`)
  } catch (error: any) {
    throw error;
  }
}
export { getBackendCouponApi }