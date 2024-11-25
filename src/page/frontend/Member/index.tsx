import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dataValue } from '@api/utilities/dataValue';
import { updateProfile, deleteUser } from "firebase/auth";
import LazyLoadImg from "@components/hook/LazyLoadImage";
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import Input from '@components/frontend/InputFrom/Input';
import './member.scss'

type Props = {}

export default function Member({ }: Props) {
  const { auth, user, getMember, token, getLoginOut } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const [userData, setUserData] = useState('');
  const [userImgData, setUserImgData] = useState('');
  const [userIsDelete, setIsUserDelete] = useState(false);
  const [userConfirmDelete, setConfirmUserDelete] = useState(false);
  const [buttonOpe, setButtonOpen] = useState(false);
  const handleChange = (e) => {
    const { value } = e.target;
    setUserData(value)
  }
  const handleImgChange = (e) => {
    const { value } = e.target;
    setUserImgData(value)
  }
  const getDeleteUser = () => {
    setIsUserDelete(true)
    setButtonOpen(false)
  }
  const handleDeleteUser = () => {
    setConfirmUserDelete(true)
    document.cookie = 'myHexSchoolDEV='
    deleteUser(user).then(() => {
      getMember()
      getLoginOut(true)

      setTimeout(() => {
        navigate('/main/memberLogo')
      }, 3000)
    }).catch((error) => {
    });
  }
  const getUserName = (auth) => {
    updateProfile(auth.currentUser, {
      displayName: userData, photoURL: userImgData
    }).then(() => {
      setButtonOpen(true)
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  useEffect(() => {
    if ((user?.displayName === null) || (user?.photoURL === null)) {
      setUserData(user?.displayName)
      setUserImgData('https://images.unsplash.com/photo-1573376670774-4427757f7963?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    } else {
      setUserData(user?.displayName)
      setUserImgData(user?.photoURL)
    }
  }, [user])

  useEffect(() => {
    if (token === '' || (user === null && user.accessToken !== token)) {
      navigate('/main/memberLogin')
    }
  }, [user, token])

  return (
    <div className='memberUser_page'>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {user && (
              <div key={`member_${user.email}`} className='memberUser-box'>
                <div className="col-md-12">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="memberUser-user">
                        {user.photoURL === null ? (
                          <div className='memberUser-image'>
                            <i className="bi bi-person"></i>
                          </div>
                        ) : (
                          <div className='memberUser-image'>
                            <div className="img_box">
                              <LazyLoadImg className="" src={user.photoURL} alt={user.photoURL} />
                            </div>
                          </div>
                        )}

                        {user.displayName && (<div className="memberUser-userName">{user.displayName}</div>)}
                      </div>
                    </li>
                    {!buttonOpe && (
                      <li className="list-group-item">
                        <button className="btn btn-primary" type='button'
                          onClick={() => { setButtonOpen((buttonOpeImg => !buttonOpeImg)) }}>修改使用者</button>
                      </li>)}
                    <li className="list-group-item">
                      <button className="btn btn-primary" type='button'
                        onClick={() => { getDeleteUser() }}>註銷使用者
                      </button>
                    </li>
                    <li className="list-group-item">
                      <div className='list-title'>ID</div>
                      <div className='list-content'>{user.email}</div>
                    </li>
                    <li className="list-group-item">
                      <div className='list-title'>註冊時間</div>
                      <div className='list-content'>{dataValue(user.metadata.createdAt)}</div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            {buttonOpe && (
              <div className='memberUser-tool'>
                <Input
                  id="name" labelText="會員名稱" type="text"
                  value={userData}
                  handleChange={(e) => handleChange(e)}
                />
                <Input
                  id="name" labelText="會員大頭貼" type="text"
                  value={userImgData}
                  handleChange={(e) => handleImgChange(e)}
                />
                <div className="img_box">
                  <LazyLoadImg className="" src={userImgData} alt={userImgData} />
                </div>
                <div className="memberUser-btn">
                  <button className="btn btn-primary" type='button' disabled={(userData === user?.displayName) && (userImgData === user?.photoURL)} onClick={() => { getUserName(auth) }}>更新</button>
                  <button className="btn btn-primary" type='button'
                    onClick={() => {
                      setButtonOpen((buttonOpeImg => !buttonOpeImg))
                      setIsUserDelete((userIsDelete => !userIsDelete))
                    }}>取消</button>
                </div>
              </div>
            )}
            {userIsDelete && (
              <div className="memberUser-box">
                {userConfirmDelete ? (
                  <div className="memberUser-tool">
                    <div className="memberUser-icon"><i className="bi bi-person-dash"></i></div>
                    <div className="alert alert-success" role="alert">您的帳號已成功刪除</div>
                  </div>
                ) : (
                  <div className="memberUser-tool">
                    <div className="memberUser-note text-danger">請再次確認，是否註銷帳號？</div>
                    <button className="btn btn-primary" type='button'
                      onClick={() => { handleDeleteUser() }}>確定
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>



    </div>
  )
}