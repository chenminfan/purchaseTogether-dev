import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getBackendProductsApi() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products`)
  } catch (error) {
    throw error;
  }
}
export { getBackendProductsApi }
