import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function postBackendCouponApi(couponType, data) {
  let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`
  let method = 'post'
  try {
    if (couponType === 'edit') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${data.id}`
      method = "put"
    } else if (couponType === 'delete' || couponType === 'allDelete') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${data.id}`
      method = "delete"
    }
    return await axios[method](api, { data: data })

  } catch (error) {
    throw error;
  }
}
export { postBackendCouponApi }