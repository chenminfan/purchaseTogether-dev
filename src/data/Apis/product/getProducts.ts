import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getProductsApi() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products`)
  } catch (error: any) {
    throw error;
  }
}
export { getProductsApi }