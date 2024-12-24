import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getBackendProductsApi(page: number) {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`)
  } catch (error: any) {
    throw error;
  }
}
async function getBackendProductsCategoryApi(page: number, category: string) {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?category=${category}&page=${page}`)
  } catch (error: any) {
    throw error;
  }
}
export { getBackendProductsApi, getBackendProductsCategoryApi }
