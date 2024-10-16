import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { LoginContext } from '../../../components/module/LoginProvider/LoginContext';
import {
  postLoginApi,
} from '../../../data/Apis'
import { useNavigate } from 'react-router-dom';
import './login.scss'

export default function Login() {
  // const [state, dispatch] = useContext(LoginContext);
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const [loginState, setLoginState] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
    // dispatch({
    //   type: 'userLogin',
    //   payload: {
    //     ...state,
    //     [name]: value
    //   }
    // })
  }
  const submit = async (e) => {
    try {
      const res = await postLoginApi(data)
      if (res.data.success) {
        setLoginState(res.data)
        setTimeout(() => {
          navigate('/backend')
        }, 1500)

      }
    } catch (error) {
      setLoginState(error.response.data)
    }
  }
  // 取出token，清除
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];

    axios.defaults.headers.common['Authorization'] = token
  }, [])

  return (
    <div className="user-page">
      <div className="user-box">
        {Object.keys(loginState).length !== 0 && (
          <div className={`alert alert-${loginState.success ? "success" : "danger"}`}>
            {loginState.message}
          </div>
        )}
        <div className="user-headLine"><h2>歡迎登入</h2></div>
        <div className="user-label">
          <label htmlFor="username" className="form-label">帳號</label>
          <input type="email" id="username" name="username" className="form-control" placeholder='請輸入帳號' onChange={(e) => handleChange(e)} />
        </div>
        <div className="user-tool d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked />
            <label className="form-check-label mx-2" htmlFor="flexCheckChecked" >
              記住帳號
            </label>
          </div>
          <div className="btn">忘記帳號</div>
        </div>

        <div className="user-label">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" name='password' className="form-control" placeholder='請輸入密碼' onChange={(e) => handleChange(e)} />
        </div>

        <button type='submit' className="btn" onClick={(e) => { submit(e) }}>登入</button>
      </div>
    </div>

  )
}