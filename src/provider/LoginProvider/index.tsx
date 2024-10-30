import React, { useState } from 'react'
import { LoginContext } from '@provider/LoginProvider/LoginContext'


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
