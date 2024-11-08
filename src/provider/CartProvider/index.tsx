import React, { useReducer } from 'react'
import { CartContent, cartProdsState, cartReducer } from "./CartContent";

type CartContentType = {
  children: JSX.Element | JSX.Element[]
}

export const CartProvider = (props: CartContentType) => {
  const { children } = props;
  const reducer = useReducer(cartReducer, cartProdsState)
  return (
    <CartContent.Provider value={reducer}>
      {children}
    </CartContent.Provider>
  )
}