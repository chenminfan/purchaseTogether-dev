import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postBackendProduct(data) {
  try {
    return await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`, { data: data })
  } catch (error) {
    throw error;
  }
}
export { postBackendProduct }