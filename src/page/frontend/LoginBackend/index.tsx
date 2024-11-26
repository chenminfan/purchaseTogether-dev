import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BoxSection from '@components/frontend/BoxSection'
import Input from '@components/frontend/InputFrom/Input';
import {
  postLoginApi,
} from '@api/Apis'
import { useNavigate } from 'react-router-dom';
import './loginBackend.scss'

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
    <div className="loginBackend_page">
      <div className="loginBackend-box">
        <BoxSection headLineText="歡迎登入"
          isAlertOpen={Object.keys(loginState).length !== 0}
          isAlert={loginState.success}
          alertMessage={loginState.message}>
          <div className="loginBackend-from">
            <div className="loginBackend-label">
              <Input
                labelText="帳號"
                placeholder="請輸入帳號"
                type="email"
                id="username"
                name="username"
                handleChange={(e) => handleChange(e)}
              />
            </div>

            <div className="loginBackend-tool">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="forgetPassword" defaultChecked />
                <label htmlFor="forgetPassword" className="form-check-label">記住帳號</label>
              </div>

              <button type="button" className="btn btn-primary">忘記密碼</button>
            </div>

            <div className="loginBackend-label">
              <form>
                <Input
                  labelText="密碼"
                  placeholder="請輸入密碼"
                  type="password"
                  id="password"
                  name="password"
                  handleChange={(e) => handleChange(e)}
                />
              </form>
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={(e) => { submit(e) }}>登入</button>
          </div>
        </BoxSection>
      </div>

    </div>
  )
}