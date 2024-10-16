import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  postLoginApi,
} from '../../../data/Apis'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './login.scss'


export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const [loginState, setLoginState] = useState({});
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
          <Form.Label htmlFor="username">帳號</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="請輸入帳號"
              type="email"
              htmlFor="username"
              id="username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
        </div>
        <div className="user-tool ">
          <Form className='d-flex justify-content-between align-items-center'>
            <Form.Check
              type="checkbox"
              id="checkbox"
              label="記住帳號"
              defaultChecked
            />
            <Button variant="outline-primary" type='button' className="btn">忘記密碼</Button>
          </Form>
        </div>

        <div className="user-label">
          <Form.Label htmlFor="password">密碼</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="請輸入密碼"
              htmlFor="password"
              type="password"
              id="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" type='submit' className="btn" onClick={(e) => { submit(e) }}>登入</Button>
        </div>
      </div>
    </div>

  )
}