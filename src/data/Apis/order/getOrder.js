import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getOrderApi() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/orders`)
  } catch (error) {
    throw error;
  }
}
export { getOrderApi }