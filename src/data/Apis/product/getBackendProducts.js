import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

// 取出token
const token = () => {
  return axios.defaults.headers.common['Authorization'] = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];
}
token();
async function getBackendProducts() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`)
  } catch (error) {
    throw error;
  }
}
export { getBackendProducts }