import React, { useReducer } from 'react'
import { TableContent, tableReducer, tableCheckState } from './TableContent'

export default function TableProvider(props) {
  const { children } = props
  const reducer = useReducer(tableReducer, tableCheckState)
  return (
    <TableContent.Provider value={reducer}>
      {children}
    </TableContent.Provider>
  )
}
