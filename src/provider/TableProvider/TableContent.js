import { createContext } from 'react'

const TableContent = createContext({})

const tableCheckState = {
  target: '',
  dataTamp: [],
  checkBool: false,
  table_type: ''
}
const tableReducer = (state, action) => {
  switch (action.type) {
    case "TABLE_CHECKBOX":
      if (action.table.target.checked) {
        return {
          ...state,
          dataTamp: [...state.dataTamp, action.table.dataTamp],
        }
      } else {
        return {
          ...tableCheckState,
          dataTamp: state.dataTamp.filter((item) => item !== action.table.dataTamp)
        }
      }

    case "TABLE_CHECKBOX_ALL":
      const NEW_CHECK = action.table.dataTamp.map((item) => item)
      if (action.table.target.checked) {
        return {
          ...state,
          dataTamp: NEW_CHECK,
          checkBool: action.table.dataTamp === action.tableData,
        }
      } return {
        ...tableCheckState,
        dataTamp: [],
        checkBool: false
      }

    case "RE_RENDER_CHECKBOX":
      return {
        ...tableCheckState,
        checkBool: state.dataTamp === action.tableData
      }

    default:
      return state;
  }
}

export { TableContent, tableReducer, tableCheckState }