import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getBackendProductsApi(page) {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`)
  } catch (error) {
    throw error;
  }
}
export { getBackendProductsApi }
