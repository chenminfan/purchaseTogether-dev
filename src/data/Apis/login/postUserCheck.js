import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL


async function postUserCheckApi(data) {
  try {
    const res = await axios.post('/v2/api/user/check')
    return res
  } catch (error) {
    throw error;
  }
}
export { postUserCheckApi }
