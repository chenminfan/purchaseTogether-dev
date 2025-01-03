import React, { useContext } from 'react'
import { SnackbarContent, handleSnackbarClose } from '@provider/SnackbarProvider/SnackbarContent'
import './toast.scss'

export default function Toasts() {
  const [state, dispatch] = useContext<any>(SnackbarContent);

  return (
    <div className={`toast fade ${state.snackbarState ? 'text-bg-secondary' : 'text-bg-danger'} position-fixed p-1 ${state.snackbarOpen ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true" >
      <div className="d-flex">
        <div className="toast-body">{state.message}</div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
          onClick={() => { handleSnackbarClose(dispatch) }}></button>
      </div>
    </div>
  )
}


