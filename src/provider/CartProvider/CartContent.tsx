import { createContext } from 'react'

const CartContent = createContext({})

type cartProdsStateType = {
  type: string,
  data: {}
}
const cartProdsState: cartProdsStateType = {
  type: '',
  data: {}
}

const cartReducer = (state, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        cartType: action.type,
        data: {
          product_id: action.product_id,
          qty: 1,
        }
      }
    default:
      return state;
  }
}

export { CartContent, cartProdsState, cartReducer }