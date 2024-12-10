import React, { useRef, useState, useEffect } from 'react'
import { firebaseApp } from '@api/Firebase';
import { getAuth, signOut, getIdToken, UserInfo, User } from "firebase/auth";
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type loginStateType = {
  username: string,
  password: string,
}
export const LoginContentProvider = (props) => {
  const { children } = props
  const isLoggedInRef = useRef(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginState, setLoginState] = useState<loginStateType[]>([]);
  const [userState, setUserState] = useState<UserInfo>();
  const auth = getAuth(firebaseApp);
  const USER_MEMBER = userState;



  const navigate = useNavigate()

  const getLoginOut = (isRouter = true) => {
    signOut(auth).then(async () => {
      document.cookie = 'myHexSchoolDEV='
      getMember()
      navigate('/main/memberLogin')
      isLoggedInRef.current = true;
      setLoggedIn(true);
    }).catch((error) => {
    });
    if (!isRouter) {
      navigate('/')
      isLoggedInRef.current = false;
      setLoggedIn(false);
    }
  }
  const USER_TOKEN = document.cookie
    .split("; ")
    .find((row) => row.startsWith("myHexSchoolDEV="))
    ?.split("=")[1];
  axios.defaults.headers.common['Authorization'] = USER_TOKEN
  const getMember = () => {
    // 取得目前登入的使用者
    isLoggedInRef.current = loggedIn;
    getAuth(firebaseApp).onAuthStateChanged(async (user) => {
      if (user) {
        const token = await getIdToken(user);
        document.cookie = `myHexSchoolDEV=${token};}`
        isLoggedInRef.current = true;
        setLoggedIn(true);
        setUserState(user)
      } else {
        isLoggedInRef.current = false;
        setLoggedIn(false);
      }
    });
  }
  // 重新驗證



  useEffect(() => {
    getMember()
  }, [])

  return (
    <LoginContext.Provider value={{ getMember, loggedIn, auth, USER_MEMBER, setLoginState, loginState, getLoginOut, USER_TOKEN }}>
      {children}
    </LoginContext.Provider>
  )
}
