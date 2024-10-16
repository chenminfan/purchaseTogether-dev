import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function getArticleApi() {
  try {
    return await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles`)
  } catch (error) {
    throw error;
  }
}
export { getArticleApi }