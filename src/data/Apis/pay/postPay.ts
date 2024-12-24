import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postPayApi(orderId) {
  try {
    return await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`)
  } catch (error: any) {
    throw error;
  }
}
export { postPayApi }