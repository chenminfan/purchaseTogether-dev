import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postCartApi(cartType, carData) {
  let api = `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
  let method = 'post'
  try {
    if (cartType === 'edit') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${carData.id}`
      method = "put"
    } else if (cartType === 'delete' || cartType === 'allDelete') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${carData.id}`
      method = "delete"
    }
    return await axios[method](api, { data: carData })
  } catch (error: any) {
    throw error;
  }
}
export { postCartApi }