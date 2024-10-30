import React, { useRef } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';


export default function DialogComponents(props) {
  const { open, handleClose, fullScreen, maxWidth, fullWidth, children, dialogTitle, handleSubmit, dialogSubmitBtnText, dialogSubmitColor, theme, color } = props;
  const dialogRef = useRef<HTMLInputElement>(null)
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      ref={dialogRef}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      closeAfterTransition={false}
    >
      {!!color ? (
        <ThemeProvider theme={theme}>
          <DialogTitle color="#fff" sx={{ bgcolor: `${color}.main`, m: 0, p: 2 }} id="alert-dialog-title">
            {dialogTitle}
          </DialogTitle>
        </ThemeProvider>
      ) : (<DialogTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
        {dialogTitle}
      </DialogTitle>)}
      {color ? (<IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[50],
        })}
      >
        <i className="bi bi-x"></i>
      </IconButton>) : (<IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[300],
        })}
      >
        <i className="bi bi-x"></i>
      </IconButton>)}
      <DialogContent
        sx={
          [{ '& > .MuiBox-root': { display: 'flex', flexDirection: 'column' } }]
        }>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>關閉</Button>
        <Button onClick={handleSubmit} color={dialogSubmitColor} autoFocus>
          {dialogSubmitBtnText}
        </Button>
      </DialogActions>
    </Dialog >
  )
}
