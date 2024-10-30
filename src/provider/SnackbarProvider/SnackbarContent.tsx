import React, { createContext } from 'react'

const SnackbarContent = createContext({})

const snackbarState = {
  type: '',
  snackbarOpen: false,
  message: '',
  snackbarState: false,
  autoHideDuration: 6000
}
function handleSnackbarError(dispatch: any, error: any) {
  dispatch({
    type: 'DIALOG_MESSAGE',
    snackbar: {
      message: error?.response?.data?.message,
      snackbarState: error?.response?.data?.success,
    }
  });
}
function handleSnackbarSuccessAll(dispatch: any, tampDataALL_LENGTH: number) {
  dispatch({
    type: 'DIALOG_MESSAGE',
    snackbar: {
      messageLength: tampDataALL_LENGTH,
      snackbarState: true,
    }
  });
}
function handleSnackbarSuccess(dispatch: any, res: any) {
  dispatch({
    type: 'DIALOG_MESSAGE',
    snackbar: {
      message: res.data.message,
      snackbarState: res.data.success,
    }
  });
  setTimeout(() => {
    handleSnackbarClose(dispatch)
  }, 3000)
}
function handleSnackbarClose(dispatch: any) {
  dispatch({
    type: 'DIALOG_CLOSE',
  });
}
const snackbarReducer = (state, action) => {
  switch (action.type) {
    case "DIALOG_CLOSE":
      return {
        ...snackbarState,
      }
    case "DIALOG_MESSAGE":
      if (action.snackbar.snackbarState) {
        return {
          ...action.snackbar,
          message: `${action.snackbar.messageLength > 1 ? `成功刪除 ${action.snackbar.messageLength}筆 資料` : action.snackbar.message}`,
          autoHideDuration: action.snackbar.autoHideDuration ? action.snackbar.autoHideDuration : state.autoHideDuration,
          snackbarOpen: true,
        }
      } else {
        return {
          ...action.snackbar,
          message: `${action.snackbar.message}`,
          autoHideDuration: action.snackbar.autoHideDuration ? action.snackbar.autoHideDuration : state.autoHideDuration,
          snackbarOpen: true,
        }
      }
    default:
      return state;
  }
}

export {
  SnackbarContent, snackbarReducer, snackbarState, handleSnackbarSuccessAll, handleSnackbarSuccess, handleSnackbarError, handleSnackbarClose
}