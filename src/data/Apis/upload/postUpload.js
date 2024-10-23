import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL


async function postUploadApi(formData) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  try {
    return await axios.post(`/api/${process.env.REACT_APP_API_PATH}/admin/upload`, formData, {
      headers: {
        authorization: token
      }

    });
  } catch (error) {
    throw error;
  }
}

export { postUploadApi }