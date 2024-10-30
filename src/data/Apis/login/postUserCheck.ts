import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL


async function postUserCheckApi() {
  try {
    const res = await axios.post('/v2/api/user/check')
    return res
  } catch (error: any) {
    throw error;
  }
}
export { postUserCheckApi }
