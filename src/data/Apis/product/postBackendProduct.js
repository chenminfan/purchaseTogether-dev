import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postBackendProductApi(prodType, data) {
  let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`
  let method = 'post'
  try {
    if (prodType === 'edit') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${data.id}`
      method = "put"
    } else if (prodType === 'delete') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${data.id}`
      method = "delete"
    }
    return await axios[method](api, { data: data })

  } catch (error) {
    throw error;
  }
}
export { postBackendProductApi }