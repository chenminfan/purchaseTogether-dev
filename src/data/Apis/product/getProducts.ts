import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL
const api = `/v2/api/${process.env.REACT_APP_API_PATH}`
async function getProductsApi(page, category) {
  try {
    return await axios.get(`${api}/products?category=${category}&page=${page}`)
  } catch (error: any) {
    throw error;
  }
}

async function getProductsAllApi() {
  try {
    return await axios.get(`${api}/products/all`)
  } catch (error: any) {
    throw error;
  }
}

async function getProductsIdApi(id) {
  try {
    return await axios.get(`${api}/product/${id}`)
  } catch (error: any) {
    throw error;
  }
}
export { getProductsApi, getProductsAllApi, getProductsIdApi }