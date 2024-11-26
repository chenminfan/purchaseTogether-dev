import React, { useState, useEffect, useContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const loginUser = handleSubmit((data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        console.log(userCredential)
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
        console.log(error)
        console.log(errorCode)
        console.log(errorMessage)
        setLoginState({
          isCreate: false,
          text: errorCode,
        })
      });
  })

  const createUser = handleSubmit((data) => {
    const { email, password } = data;
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
  })

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
              alertMessage={loginState.isCreate ? '登入成功' : `登入失敗，${loginState.text === 'auth/invalid-email' && '請輸入電子信箱或檢查輸入的帳號密碼'}`}
            >
              <form className="form-card" action="" onSubmit={loginUser}>
                <div className="member-label">
                  <Input
                    labelText="帳號"
                    placeholder="請輸入電子信箱"
                    type="email"
                    id="loginUsername"
                    name="username"
                    register={register} errors={errors} rules={{
                      required: {
                        value: true,
                        message: '請輸入 Email'
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email 格式不正確'
                      }
                    }}
                  />
                </div>
                <div className="member-label">
                  <Input
                    labelText="密碼"
                    placeholder="請輸入密碼"
                    type="password"
                    id="loginPassword"
                    name="password"
                    autocomplete="off"
                    register={register} errors={errors} rules={{
                      required: {
                        value: true,
                        message: '請輸入 密碼'
                      },
                      pattern: {
                        value: /(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6}/,
                        message: 'Email 格式不正確'
                      }
                    }}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary"
                    onClick={() => { }}
                  >登入</button>
                  <button type="button" className="btn"
                    onClick={() => { }}
                  >忘記密碼</button>
                </div>
              </form>
            </BoxSection>
          ) : (
            <BoxSection headLineText="建立帳號"
              isAlertOpen={Object.keys(createState).length !== 0}
              isAlert={createState.isCreate}
              alertMessage={createState.isCreate ? '建立成功' : `註冊失敗，${createState.text === 'auth/invalid-email' && '請輸入電子信箱或檢查輸入的帳號密碼'}`}
            >
              <>
                {createState.isCreate ? (
                  <ul>
                    <li>{createState.email} 歡迎！</li>
                    <li>信箱是否驗證：{createState.verify ? '已驗證' : '尚未驗證'}</li>
                  </ul>
                ) : ''}
                <form className="form-card" action="" onSubmit={createUser}>
                  <div className="member-label">
                    <Input
                      register={register} errors={errors} rules={{
                        required: {
                          value: true,
                          message: '請輸入 Email'
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email 格式不正確'
                        }
                      }}
                      labelText="帳號"
                      placeholder="請輸入電子信箱"
                      type="email"
                      id="createUsername"
                      name="username"
                    />
                  </div>
                  <div className="member-label">
                    <Input
                      labelText="密碼"
                      placeholder="請輸入密碼"
                      type="password"
                      id="createPassword"
                      name="password"
                      register={register} errors={errors} rules={{
                        required: {
                          value: true,
                          message: '請輸入 密碼'
                        },
                        pattern: {
                          value: /(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6}/,
                          message: 'Email 格式不正確'
                        }
                      }}
                      autocomplete="off"
                    />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary"
                      onClick={() => { }}
                    >註冊</button>
                  </div>
                </form>
              </>
            </BoxSection>
          )}

        </div>
      </div>
    </section >
  )
}