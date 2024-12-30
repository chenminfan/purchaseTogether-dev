import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dataValue } from '@api/utilities/dataValue';
import { EmailAuthProvider, reauthenticateWithCredential, updateProfile, deleteUser, sendEmailVerification, updatePassword } from "firebase/auth";
import LazyLoadImg from "@components/common/LazyLoadImage";
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import Input from '@components/frontend/InputFrom/Input';
import './member.scss'

export default function Member() {
  const { loggedIn, auth, USER_MEMBER, USER_TOKEN, getLoginOut } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const [userData, setUserData] = useState('');
  const [userImgData, setUserImgData] = useState('');
  const [isUserDelete, setIsUserDelete] = useState(false);
  const [isUserConfirmDelete, setIsConfirmUserDelete] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isVerifyCheck, setIsVerifyCheck] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isCheckPassword, setIsCheckPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');

  const getDeleteUser = () => {
    setIsUserDelete(true)
    setIsUserOpen(false)
  }
  const handleDeleteUser = () => {
    setIsConfirmUserDelete(true)
    document.cookie = 'myHexSchoolDEV='
    deleteUser(USER_MEMBER).then(() => {
      getLoginOut(true)

      setTimeout(() => {
        navigate('/main/memberLogo')
      }, 3000)
    }).catch((error) => {
    });
  }
  const handleUserName = (auth) => {
    updateProfile(auth.currentUser, {
      displayName: userData, photoURL: userImgData
    }).then(() => {
      setIsUserOpen(true)

    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  // 驗證信箱
  const handleVerified = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        setIsVerifyCheck(true)
      });
  }

  // 更新密碼
  const handlePassword = (newString) => {
    updatePassword(USER_MEMBER, newString).then(() => {
      setIsCheckPassword(true)
      setIsNewPassword(false)
      getRePRovide(reNewPassword)
    }).catch((error) => {
    });
  }

  // 重新驗證
  const getRePRovide = (rePassword) => {
    const credential = EmailAuthProvider.credential(USER_MEMBER.auth.currentUser.email, rePassword);

    reauthenticateWithCredential(USER_MEMBER.auth.currentUser, credential)
      .then(() => {
        // User re-authenticated.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
  }

  useEffect(() => {
    if (!loggedIn && USER_TOKEN === '') {
      navigate('/main/memberLogin')
    }
  }, [loggedIn, USER_TOKEN])

  useEffect(() => {
    if ((USER_MEMBER?.displayName === null) || (USER_MEMBER?.photoURL === null)) {
      setUserData(USER_MEMBER?.displayName)
      setUserImgData('https://images.unsplash.com/photo-1573376670774-4427757f7963?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    } else {
      setUserData(USER_MEMBER?.displayName)
      setUserImgData(USER_MEMBER?.photoURL)
    }
  }, [USER_MEMBER])

  return (
    <div className='memberUser_page'>
      <div className="container-xl">
        <div className="row is-animation">
          <div className={`${(isUserOpen || isUserDelete || isNewPassword) ? ' col-md-6' : 'col-12'}`}>
            {USER_MEMBER && (
              <div key={`member_${USER_MEMBER.email}`} className='memberUser-box'>
                <div className="col-md-12">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="memberUser-user">
                        {USER_MEMBER.photoURL === null ? (
                          <div className='memberUser-image'>
                            <i className="bi bi-person"></i>
                          </div>
                        ) : (
                          <div className='memberUser-image'>
                            <div className="img_box">
                              <LazyLoadImg className="" src={USER_MEMBER.photoURL} alt={USER_MEMBER.photoURL} />
                            </div>
                          </div>
                        )}

                        {USER_MEMBER.displayName && (<div className="memberUser-userName">{USER_MEMBER.displayName}</div>)}
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className='list-title'>ID</div>
                      <div className='list-content'>{USER_MEMBER.email}</div>
                    </li>
                    <li className="list-group-item">
                      <div className='list-title'>email驗證</div>
                      <div className='list-content'>
                        {USER_MEMBER.emailVerified ? (
                          <div className="alert alert-success d-inline-flex align-items-center p-2 m-0" role="alert">
                            <i className="bi bi-check-all flex-shrink-0 me-2"></i>
                            <div>已驗證</div>
                          </div>
                        ) : (<button type="button" className='btn btn-warning' onClick={() => { handleVerified() }}>未驗證</button>)}
                        {isVerifyCheck && (
                          <div className="memberUser-info mt-2">
                            <div className="alert alert-warning d-flex align-items-center p-2 m-0" role="alert">
                              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"></i>
                              <div>
                                請至您的信箱確認驗證,若沒有請至垃圾郵件確認！！
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className='list-title'>註冊時間</div>
                      <div className='list-content'>{dataValue(USER_MEMBER.metadata.createdAt)}</div>
                    </li>
                    <li className="list-group-item list-group-item-tool">
                      <div className='list-title'>其他</div>
                      <div className='list-content'>
                        {!isUserOpen && (
                          <button className="btn btn-primary" type='button'
                            onClick={() => {
                              setIsUserOpen((isButtonOpeImg => !isButtonOpeImg))
                              setIsNewPassword(false)
                              setIsUserDelete(false)
                            }}>修改會員資訊</button>
                        )}
                        {!isNewPassword && (

                          <button className="btn btn-primary" type='button'
                            onClick={() => {
                              setIsNewPassword((isNewPassword => !isNewPassword))
                              setIsUserOpen(false)
                              setIsUserDelete(false)
                              setNewPassword('')
                              setReNewPassword('')
                            }}>修改密碼</button>
                        )}
                        {!isUserDelete &&
                          <button className="btn btn-primary" type='button'
                            onClick={() => {
                              getDeleteUser()
                              setIsNewPassword(false)
                              setIsUserOpen(false)
                              setNewPassword('')
                              setReNewPassword('')
                            }}>註銷帳號
                          </button>
                        }
                        <button className="btn btn-primary" type='button'
                          onClick={() => {
                            getLoginOut()
                            setIsNewPassword(false)
                            setIsUserOpen(false)
                            setIsUserDelete(false)
                            setNewPassword('')
                            setReNewPassword('')
                          }}>登出
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          {(isUserOpen || isUserDelete || isNewPassword) && (<div className="col-md-6">
            {isUserOpen && (
              <div className="memberUser-box">
                <div className='memberUser-tool'>
                  <div className='d-flex align-items-center mb-2'>
                    <div>
                      <Input
                        id="name" labelText="會員名稱" type="text"
                        value={userData}
                        handleChange={(e) => setUserData(e.target.value)}
                      />
                      <Input
                        id="name" labelText="會員大頭貼" type="text"
                        value={userImgData}
                        handleChange={(e) => setUserImgData(e.target.value)}
                      />
                    </div>
                    <div className="img_box ms-4">
                      <LazyLoadImg className="" src={userImgData} alt={userImgData} />
                    </div>
                  </div>
                  <div className="memberUser-btn">
                    <button className="btn btn-primary" type='button' disabled={(userData === USER_MEMBER?.displayName) && (userImgData === USER_MEMBER?.photoURL)} onClick={() => { handleUserName(auth) }}>更新</button>
                    <button className="btn btn-primary" type='button'
                      onClick={() => {
                        setIsUserOpen((isButtonOpeImg => !isButtonOpeImg))
                        setNewPassword('')
                        setReNewPassword('')
                      }}>取消</button>
                  </div>
                </div>
              </div>
            )}
            {isUserDelete && (
              <div className="memberUser-box">
                {isUserConfirmDelete ? (
                  <div className="memberUser-tool">
                    <div className="memberUser-icon"><i className="bi bi-person-dash"></i></div>
                    <div className="alert alert-success" role="alert">您的帳號已成功刪除</div>
                  </div>
                ) : (
                  <div className="memberUser-tool">
                    <div className="memberUser-note text-danger">請再次確認，是否註銷帳號？</div>
                    <div className="memberUser-note">
                      <Input
                        id="password" labelText="再次輸入舊密碼" type="text"
                        value={reNewPassword}
                        placeholder="請輸入新密碼"
                        handleChange={(e) => {
                          setReNewPassword(e.target.value)
                        }}
                      />
                    </div>
                    <div className="memberUser-btn">

                      <button className="btn btn-primary" type='button'
                        onClick={() => {
                          handleDeleteUser()
                          getRePRovide(reNewPassword)
                        }}>確定
                      </button>
                      <button className="btn btn-primary" type='button'
                        onClick={() => {
                          setIsUserDelete((isUserDelete => !isUserDelete))
                          setNewPassword('')
                          setReNewPassword('')
                        }}>取消</button>
                    </div>

                  </div>
                )}
              </div>
            )}
            {isNewPassword && (
              <div className='memberUser-box'>
                <div className="memberUser-tool">
                  {!isCheckPassword && (
                    <form onSubmit={() => { handlePassword(newPassword) }}>
                      <Input
                        id="password" labelText="新密碼" type="text"
                        value={newPassword}
                        placeholder="請輸入新密碼"
                        handleChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Input
                        id="password" labelText="再次輸入舊密碼" type="text"
                        value={reNewPassword}
                        placeholder="請輸入新密碼"
                        handleChange={(e) => {
                          setReNewPassword(e.target.value)
                        }}
                      />
                      <div className="memberUser-btn">
                        <button type="submit" className="btn btn-primary" disabled={newPassword === '' || reNewPassword === ''} >修改密碼</button>
                        <button className="btn btn-primary" type='button'
                          onClick={() => {
                            setIsNewPassword((isNewPassword => !isNewPassword))
                            setNewPassword('')
                            setReNewPassword('')
                          }}>取消</button>
                      </div>
                    </form>
                  )}
                  {isCheckPassword && (
                    <div className="alert alert-success d-flex align-items-center p-2 m-0 mt-2" role="alert">
                      <i className="bi bi-check-all flex-shrink-0 me-2"></i>
                      <div>
                        已更新密碼
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>)}
        </div>
      </div>



    </div>
  )
}