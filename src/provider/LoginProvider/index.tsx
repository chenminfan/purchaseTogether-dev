import React, { useState, useEffect } from 'react'
import { firebaseApp } from '@api/Firebase';
import { getAuth, onAuthStateChanged, signOut, getIdToken, UserInfo } from "firebase/auth";
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type loginStateType = {
  username: string,
  password: string,
}
export const LoginContentProvider = (props) => {
  const { children } = props
  const [loginState, setLoginState] = useState<loginStateType[] | any>({});
  const [userState, setUserState] = useState<UserInfo>();
  const auth = getAuth(firebaseApp);
  const USER_MEMBER = userState;
  const USER_ID = userState?.uid;
  const navigate = useNavigate()
  const getMember = () => {
    // 取得目前登入的使用者
    getAuth(firebaseApp).onAuthStateChanged(async (user) => {
      if (user) {
        const token = await getIdToken(user);
        document.cookie = `myHexSchoolDEV=${token};}`
        setUserState(user)
      }
    });
  }
  const getLoginOut = (isRouter = true) => {
    signOut(auth).then(async () => {
      document.cookie = 'myHexSchoolDEV='
      getMember()
      navigate('/main/memberLogin')
    }).catch((error) => {
    });
    if (!isRouter) {
      navigate('/')
    }
  }
  const USER_TOKEN = document.cookie
    .split("; ")
    .find((row) => row.startsWith("myHexSchoolDEV="))
    ?.split("=")[1];

  useEffect(() => {
    getMember()
  }, [])
  return (
    <LoginContext.Provider value={{ auth, USER_MEMBER, USER_ID, setLoginState, loginState, getMember, getLoginOut, USER_TOKEN }}>
      {children}
    </LoginContext.Provider>
  )
}
