import React, { useReducer } from 'react'
import { CartContent, cartReducer, cartInit } from './CartContent'

const CartProvider = ({ children }) => {
  const reducer = useReducer(cartReducer, cartInit)
  return (
    <CartContent.Provider value={reducer}>
      {children}
    </CartContent.Provider>
  )
}

export default CartProvider