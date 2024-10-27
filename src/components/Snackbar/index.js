import React, { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DialogContent } from '../../provider/DialogProvider/DialogContent'

export default function SnackbarComponents() {
  const [state, dispatch] = useContext(DialogContent);
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: 'DIALOG_CLOSE',
    })
  }
  // const { snackbarOpen, message, type, autoHideDuration } = props
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={state.autoHideDuration}
      open={state.snackbarOpen}
    >
      <Alert
        onClose={handleClose}
        severity={state.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  )
}
