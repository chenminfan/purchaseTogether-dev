import React, { useReducer } from 'react'
import { DialogContent, dialogReducer, snackbarState } from './DialogContent'

export default function DialogProvider(props) {
  const { children } = props
  // const [snackbar, setSnackbar] = useState({
  //   snackbarOpen: false,
  //   message: '',
  // })
  // const handleSnackbarClose = (newStet, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setSnackbar({
  //     ...newStet,
  //     snackbarOpen: false,
  //   })
  // }
  const reducer = useReducer(dialogReducer, snackbarState)
  return (
    // <DialogContent.Provider value={{ handleSnackbarClose, snackbar, setSnackbar }}>
    <DialogContent.Provider value={reducer}>
      {children}
    </DialogContent.Provider>
  )
}
