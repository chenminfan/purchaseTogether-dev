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
async function postBackendProducts() {
  try {
    return await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`, data)
  } catch (error) {
    throw error;
  }
}
export { postBackendProducts }