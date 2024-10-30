import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getCartApi() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`)
  } catch (error: any) {
    throw error;
  }
}
export { getCartApi }