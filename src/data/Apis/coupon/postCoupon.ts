import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postCouponApi() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`)
  } catch (error: any) {
    throw error;
  }
}
export { postCouponApi }