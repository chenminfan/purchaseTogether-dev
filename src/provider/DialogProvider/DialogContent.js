import { createContext } from 'react'

const DialogContent = createContext({})

const snackbarState = {
  snackbarOpen: false,
  message: '',
  autoHideDuration: 200
}
const dialogReducer = (state, action) => {
  switch (action.type) {
    case "DIALOG_CLOSE":
      return {
        ...state,
        snackbarOpen: false,
        autoHideDuration: action.autoHideDuration,
      }
    case "DIALOG_DELETE":
      return {
        ...state,
        type: 'error',
        snackbarOpen: true,
        message: '已刪除折價券',
        autoHideDuration: action.autoHideDuration,

      }
    case "DIALOG_OPEN_SUCCESS":
      return {
        ...state,
        type: 'success',
        snackbarOpen: true,
        message: `已成功${action.dialogType === 'edit' ? '編輯' : '新增'}折價券`,
        autoHideDuration: action.autoHideDuration,
      }
    default:
      return state;
  }
}

export {
  DialogContent, dialogReducer, snackbarState
}