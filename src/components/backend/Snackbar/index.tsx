import React, { useContext } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarContent, handleSnackbarClose } from '@provider/SnackbarProvider/SnackbarContent'

export default function CSnackbar() {
  const [state, dispatch] = useContext<any>(SnackbarContent);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={state.autoHideDuration}
      open={state.snackbarOpen}
      onClose={!state.snackbarState ? () => { } : () => { handleSnackbarClose(dispatch) }}
    >
      <Alert
        onClose={() => { handleSnackbarClose(dispatch) }}
        severity={state.snackbarState === true ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  )
}
