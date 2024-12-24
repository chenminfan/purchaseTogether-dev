import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postOrdersApi(data) {
  let api = `/v2/api/${process.env.REACT_APP_API_PATH}/order`
  let method = 'post'
  try {
    return await axios[method](api, { data: data })

  } catch (error: any) {
    throw error;
  }
}
export { postOrdersApi }