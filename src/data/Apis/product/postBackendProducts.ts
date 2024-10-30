import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postBackendProductsApi(prodType, data) {
  console.log(data)
  let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`
  let method = 'post'
  try {
    if (prodType === 'edit') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${data.id}`
      method = "put"
    } else if (prodType === 'delete' || prodType === 'allDelete') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${data.id}`
      method = "delete"
    }
    return await axios[method](api, { data: data })

  } catch (error: any) {
    throw error;
  }
}
export { postBackendProductsApi }