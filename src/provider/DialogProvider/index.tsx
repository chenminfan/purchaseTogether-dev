import React, { useReducer } from 'react'
import { DialogContent, dialogReducer, snackbarState } from './DialogContent'

export default function DialogProvider(props) {
  const { children } = props
  const reducer = useReducer(dialogReducer, snackbarState)
  return (
    <DialogContent.Provider value={reducer}>
      {children}
    </DialogContent.Provider>
  )
}
