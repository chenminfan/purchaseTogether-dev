import React, { useState, useEffect, useContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { auth, user, getMember, loginState, setLoginState, token } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const nav = [{ navName: '登入', navID: 'login' },
  { navName: '註冊', navID: 'create' }]
  const [isPassword, setIsPassword] = useState(false);
  const [isSentPassword, setIsSentPassword] = useState(false);
  const [navState, setNavState] = useState('login');
  const [createState, setCreateState] = useState<loginStateType[] | any>({});

  const loginUser = handleSubmit((data) => {
    const { loginEmail, loginPassword } = data;
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setLoginState({
          isCreate: true,
          email: loginEmail,
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
        console.log(errorCode)
        if (errorCode === 'auth/invalid-credential') {
          setLoginState({
            isCreate: false,
            text: '輸入電子信箱或密碼有誤，請再次確認！'
          })
        } else if (errorCode === 'auth/invalid-email') {
          setLoginState({
            isCreate: false,
            text: '輸入電子信箱或檢查輸入的帳號密碼，請再次確認！'
          })
        }
      });
  })

  const getNewPassword = handleSubmit((data) => {
    const { forgetEmail } = data;
    setIsSentPassword(true)
    sendPasswordResetEmail(auth, forgetEmail)
      .then(() => {
        // Password reset email sent!
        setTimeout(() => {
          setIsPassword(false)
          setIsSentPassword(false)
          window.location.reload();
        }, 3000)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  })

  const createUser = handleSubmit((data) => {
    const { createEmail, createPassword } = data;
    createUserWithEmailAndPassword(auth, createEmail, createPassword)
      .then((userCreate) => {
        const user = userCreate.user;
        setCreateState({
          isCreate: true,
          email: createEmail,
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
        console.log(errorCode)
        if (errorCode === 'auth/invalid-email') {
          setCreateState({
            isCreate: false,
            text: '請輸入電子信箱或檢查輸入的帳號密碼'
          })
        } else if (errorCode === 'auth/email-already-in-use') {
          setCreateState({
            isCreate: false,
            text: '電子信箱已被註冊，請再更換一個電子信箱'
          })
        }
      });
  })

  useEffect(() => {
    if (token !== '' && user !== null) {
      navigate('/main/member')
    }
  }, [user, token])

  return (
    <section className="memberLogin_page">
      <div className="memberLogin-box">
        <div className="memberLogin-tabs">
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
        <div className="memberLogin-content">
          {navState === 'login' ? (
            <BoxSection headLineText={!isPassword ? '使用您的帳號' : '忘記密碼'}
              isAlertOpen={Object.keys(loginState).length !== 0}
              isAlert={loginState.isCreate}
              alertMessage={loginState.isCreate ? '登入成功' : `登入失敗，${loginState.text}`}
            >

              <>
                {!isPassword && (
                  <form className="form-card" action="" onSubmit={loginUser}>
                    <div className="memberLogin-label">
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
                        id="loginEmail"

                      />
                    </div>
                    <div className="memberLogin-label">
                      <Input
                        labelText="密碼"
                        placeholder="請輸入密碼"
                        type="password"
                        id="loginPassword"
                        register={register} errors={errors} rules={{
                          required: {
                            value: true,
                            message: '請輸入 密碼'
                          },
                          pattern: {
                            value: /(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6}/,
                            message: '英文數字六碼，輸入密碼格式不正確'
                          }
                        }}
                      />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button type="submit" className="btn btn-primary">登入</button>
                      <button type="button" className="btn"
                        onClick={() => {
                          setIsPassword(isPassword => !isPassword)
                        }}
                      >忘記密碼</button>
                    </div>
                  </form>
                )}
                {isPassword && (
                  <div className="memberLogin-tool">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col">
                          <form className='position-relative' action="" onSubmit={getNewPassword}>
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
                              id="forgetEmail"

                            />
                            <div className="memberLogin-btn position-absolute">
                              <button type="submit" className="btn btn-primary btn-sm "
                              >寄出</button>
                              <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                                setIsPassword(isPassword => !isPassword)
                              }}
                              >取消</button>
                            </div>
                          </form>

                        </div>
                      </div>
                    </div>

                    {isSentPassword && <div className="row">
                      <div className="alert alert-warning d-inline-flex align-items-center p-2 m-0" role="alert">
                        <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"></i>
                        <div>請至您的信箱確認驗證,若沒有請至垃圾郵件確認！！</div>
                      </div>
                    </div>}
                  </div>
                )}
              </>
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
                <form className="form-card" action="" onSubmit={createUser}>
                  <div className="memberLogin-label">
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
                      id="createEmail"
                    />
                  </div>
                  <div className="memberLogin-label">
                    <Input
                      labelText="密碼"
                      placeholder="請輸入密碼"
                      type="password"
                      id="createPassword"
                      register={register} errors={errors} rules={{
                        required: {
                          value: true,
                          message: '請輸入 密碼'
                        },
                        pattern: {
                          value: /(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6}/,
                          message: '英文數字六碼，輸入密碼格式不正確'
                        }
                      }}
                    />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary"

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