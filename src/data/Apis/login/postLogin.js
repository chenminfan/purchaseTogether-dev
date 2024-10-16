import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL


async function postLoginApi(data) {
  try {
    const res = await axios.post('/v2/admin/signin', data)
    const { token, expired } = res.data;
    // 儲存token
    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
    axios.defaults.headers.common['Authorization'] = token
    return res
  } catch (error) {
    throw error;
  }
}
export { postLoginApi }
