import React, { useState } from 'react'
import { LoginContext } from './LoginContext.js'


export const LoginContentProvider = (props) => {
  const { children } = props
  const [isLogin, setIsLogin] = useState(false);
  // const reducer = useReducer(memberReducer,
  //   memberValue,)

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  )
}
