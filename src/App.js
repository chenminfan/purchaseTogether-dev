import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BHome from './page/backend/Home';
import Home from './page/frontend/Home';
import Login from './page/frontend/Login';
import Dashboard from './page/backend/Dashboard';
import BackendProduct from './page/backend/BackendProduct';
import BackendCoupons from './page/backend/BackendCoupons';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}>
        <Route path='/login' element={<Login />}></Route>
      </Route>
      <Route path='/backend' element={<Dashboard />}>
        <Route path='/backend' element={<BHome />}></Route>
        <Route path='/backend/product' element={<BackendProduct />}></Route>
        <Route path='/backend/coupon' element={<BackendCoupons />}></Route>

      </Route>
      {/* 暫放 */}
      {/* <Route path='/reactDaily' element={<ReactDailyApp />}></Route> */}
    </Routes>
  )
}
