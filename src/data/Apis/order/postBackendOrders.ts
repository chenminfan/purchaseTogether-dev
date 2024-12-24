import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postBackendOrdersApi(prodType, data) {
  let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order`
  let method = 'post'
  try {
    if (prodType === 'edit') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${data.id}`
      method = "put"
    } else if (prodType === 'delete' || prodType === 'allDelete') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${data.id}`
      method = "delete"
    }
    return await axios[method](api, { data: data })

  } catch (error: any) {
    throw error;
  }
}
export { postBackendOrdersApi }