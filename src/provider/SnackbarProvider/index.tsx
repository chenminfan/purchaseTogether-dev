import React, { useReducer } from 'react'
import { SnackbarContent, snackbarReducer, snackbarState } from './SnackbarContent'

export default function SnackbarProvider(props) {
  const { children } = props
  const reducer = useReducer(snackbarReducer, snackbarState)

  return (
    <SnackbarContent.Provider value={reducer}>
      {children}
    </SnackbarContent.Provider>
  )
}
