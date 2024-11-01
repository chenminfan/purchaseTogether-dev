import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getProductsApi(page, category) {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?category=${category}&page=${page}`)
  } catch (error: any) {
    throw error;
  }
}
async function getProductsAllApi() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)
  } catch (error: any) {
    throw error;
  }
}
export { getProductsApi, getProductsAllApi }