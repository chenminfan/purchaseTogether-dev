import React, { useState, useEffect } from 'react'
import { firebaseApp } from '@api/Firebase';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, signOut, getIdToken } from "firebase/auth";
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
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const navigate = useNavigate()

  const getMember = async () => {
    // 支援的驗證狀態持續性類型
    await setPersistence(auth, browserLocalPersistence)

    // 取得目前登入的使用者
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        document.cookie = `myHexSchoolDEV=${token};}`
      }
    });
  }

  const getLoginOut = (isRouter) => {
    signOut(auth).then(async () => {
      document.cookie = 'myHexSchoolDEV='
    }).catch((error) => {
    });
    if (!isRouter) {
      navigate('/')
    }
  }
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("myHexSchoolDEV="))
    ?.split("=")[1];

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        navigate('/main/member')
      }, 1500)
    }


    axios.defaults.headers.common['Authorization'] = token
  }, [])

  return (
    <LoginContext.Provider value={{ auth, user, setLoginState, loginState, getMember, getLoginOut, token }}>
      {children}
    </LoginContext.Provider>
  )
}
