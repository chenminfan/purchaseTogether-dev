import React, { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarContent } from '@provider/SnackbarProvider/SnackbarContent'

export default function CSnackbar() {
  const [state, dispatch] = useContext<any>(SnackbarContent);
  const handleClose = (dispatch: any) => {
    dispatch({
      type: 'DIALOG_CLOSE',
    });
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
        severity={state.snackbarState === true ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  )
}
