import React, { useState, useEffect, useContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import BoxSection from '@components/frontend/BoxSection'
import Input from '@components/frontend/InputFrom/Input';
import './memberLogin.scss';
import { LoginContext } from '@provider/LoginProvider/LoginContext'

type loginStateType = {
  username: string,
  password: string,
}
export default function MemberLogin() {
  const { auth, user, getMember, loginState, setLoginState, token } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const nav = [{ navName: '登入', navID: 'login' },
  { navName: '註冊', navID: 'create' }]
  const [navState, setNavState] = useState('login');
  const [createState, setCreateState] = useState<loginStateType[] | any>({});

  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setLoginState({
          isCreate: true,
          email: email,
          verify: user.emailVerified
        })
        getMember()
        setTimeout(() => {
          navigate('/main/member')
        }, 1500)
        setLoginState({})
        // ...
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginState({
          isCreate: true,
          text: errorCode,
        })
      });
  }

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCreate) => {
        const user = userCreate.user;
        setCreateState({
          isCreate: true,
          email: email,
          uid: user.uid,
          verify: user.emailVerified
        })
        getMember()
        setTimeout(() => {
          setNavState('login')
          setCreateState({})
        }, 3000)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCreateState({
          isCreate: false,
          text: errorCode
        })
      });
  }

  useEffect(() => {
    if (token !== '' && user !== null) {
      navigate('/main/member')
    }
  }, [user, token])

  return (
    <section className="member_page">
      <div className="member-box">
        <div className="member-tabs">
          <nav className="nav nav-tabs">
            {nav.map((nav) => (
              <a
                className={`nav-link ${nav.navID === navState ? 'active' : ''}`}
                key={`nav_${nav.navName}`}
                aria-current="page" href="#/main/memberLogin"
                onClick={() => { setNavState(nav.navID) }}>{nav.navName}</a>
            ))}
          </nav>
        </div>
        <div className="member-content">
          {navState === 'login' ? (
            <BoxSection headLineText="使用您的帳號"
              isAlertOpen={Object.keys(loginState).length !== 0}
              isAlert={loginState.isCreate}
              alertMessage={loginState.isCreate ? '登入成功' : `登入失敗，${createState.text}`}
            >
              <div className="form-card">
                <div className="member-label">
                  <Input
                    labelText="帳號"
                    placeholder="請輸入帳號"
                    type="email"
                    id="loginUsername"
                    name="username"
                    handleChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="member-label">
                  <form>
                    <Input
                      labelText="密碼"
                      placeholder="請輸入密碼"
                      type="password"
                      id="loginPassword"
                      name="password"
                      handleChange={(e) => handleChange(e)}
                      autocomplete="off"
                    />
                  </form>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="button" className="btn btn-primary"
                    onClick={() => { loginUser(data.username, data.password) }}
                  >登入</button>
                  <button type="button" className="btn"
                    onClick={() => { }}
                  >忘記密碼</button>
                </div>
              </div>
            </BoxSection>
          ) : (
            <BoxSection headLineText="建立帳號"
              isAlertOpen={Object.keys(createState).length !== 0}
              isAlert={createState.isCreate}
              alertMessage={createState.isCreate ? '建立成功' : `註冊失敗，${createState.text}`}
            >
              <>
                {createState.isCreate ? (
                  <ul>
                    <li>{createState.email} 歡迎！</li>
                    <li>信箱是否驗證：{createState.verify ? '已驗證' : '尚未驗證'}</li>
                  </ul>
                ) : ''}
                <div className="form-card">
                  <div className="member-label">
                    <Input
                      labelText="帳號"
                      placeholder="請輸入帳號"
                      type="email"
                      id="createUsername"
                      name="username"
                      handleChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="member-label">
                    <form>
                      <Input
                        labelText="密碼"
                        placeholder="請輸入密碼"
                        type="password"
                        id="createPassword"
                        name="password"
                        handleChange={(e) => handleChange(e)}
                        autocomplete="off"
                      />
                    </form>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button type="button" className="btn btn-primary"
                      onClick={() => { createUser(data.username, data.password) }}
                    >註冊</button>
                  </div>
                </div>
              </>
            </BoxSection>
          )}

        </div>
      </div>
    </section >
  )
}