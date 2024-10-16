import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './page/frontend/Home';
import Login from './page/frontend/Login';
import Dashboard from './page/backend/Dashboard';
import BackendProduct from './page/backend/BackendProduct';
import './assets/all.scss'

export default function App() {
  useEffect(() => {

  }, [])
  return (
    <Routes>
      <Route exact path='/' element={<Home />}>
        <Route path='/login' element={<Login />}></Route>
      </Route>
      <Route path='/backend' element={<Dashboard />}>
        <Route path='/backend/product' element={<BackendProduct />}></Route>

      </Route>
      {/* 暫放 */}
      {/* <Route path='/reactDaily' element={<ReactDailyApp />}></Route> */}
    </Routes>
  )
}
