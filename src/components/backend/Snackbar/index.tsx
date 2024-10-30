import React, { useContext, forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DialogContent } from '../../../provider/DialogProvider/DialogContent'

export default function CSnackbar() {
  const [state, dispatch] = useContext<any>(DialogContent);
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: 'DIALOG_CLOSE',
    })
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={state.autoHideDuration}
      open={state.snackbarOpen}
      onClose={!state.snackbarState ? () => { } : handleClose}
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
