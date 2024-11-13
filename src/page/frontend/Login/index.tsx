import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  postLoginApi,
} from '@api/Apis'
import { useNavigate } from 'react-router-dom';
import './login.scss'

type loginStateType = {
  success: boolean,
  message: string,
}

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const [loginState, setLoginState] = useState<loginStateType[] | any>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
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
    } catch (error: any) {
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
    <div className="user_page">
      <div className="user-box">
        {Object.keys(loginState).length !== 0 && (
          <div className={`alert alert-${loginState.success ? "success" : "danger"}`}>
            {loginState.message}
          </div>
        )}
        <div className="user-headLine"><h2>歡迎登入</h2></div>

        <div className="user-body">
          <div className="user-label">
            <label htmlFor="username" className="col-sm-2 col-form-label">帳號</label>
            <div className="input-group">
              <input
                placeholder="請輸入帳號"
                type="email"
                id="username"
                name="username"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="user-tool">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="forgetPassword" defaultChecked />
              <label htmlFor="forgetPassword" className="form-check-label">記住帳號</label>
            </div>

            <button type="button" className="btn btn-primary">忘記密碼</button>
          </div>

          <div className="user-label">
            <label htmlFor="password" className="col-sm-2 col-form-label">密碼</label>
            <div className="input-group">
              <input placeholder="請輸入密碼"
                type="password"
                id="password"
                name="password"
                className="form-control"
                onChange={(e) => handleChange(e)} />
            </div>
          </div>
        </div>


        <div className="d-grid gap-2 mt-3">
          <button type="button" className="btn btn-primary" onClick={(e) => { submit(e) }}>登入</button>
        </div>
      </div>
    </div>
  )
}