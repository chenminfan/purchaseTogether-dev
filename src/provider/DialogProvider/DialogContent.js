import { createContext } from 'react'

const DialogContent = createContext({})

const snackbarState = {
  type: '',
  snackbarOpen: false,
  message: '',
  snackbarState: false,
  autoHideDuration: 6000
}
const dialogReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "DIALOG_CLOSE":
      return {
        ...snackbarState,
      }
    case "DIALOG_MESSAGE":
      if (action.snackbar.snackbarState) {
        return {
          ...action.snackbar,
          message: `通知：${action.snackbar.messageLength ? `成功刪除${action.snackbar.message}筆資料` : action.snackbar.message}`,
          autoHideDuration: action.snackbar.autoHideDuration ? action.snackbar.autoHideDuration : state.autoHideDuration,
          snackbarOpen: true,
        }
      } else {
        return {
          ...action.snackbar,
          message: `請注意：${action.snackbar.message}`,
          autoHideDuration: action.snackbar.autoHideDuration ? action.snackbar.autoHideDuration : state.autoHideDuration,
          snackbarOpen: true,
        }
      }
    default:
      return state;
  }
}

export {
  DialogContent, dialogReducer, snackbarState
}