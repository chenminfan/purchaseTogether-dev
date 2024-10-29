import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BHome from './page/backend/Home';
import Home from './page/frontend/Home';
import Login from './page/frontend/Login';
import Dashboard from './page/backend/Dashboard';
import BackendProducts from './page/backend/BackendProducts';
import BackendCoupon from './page/backend/BackendCoupon';
import BackendOrders from './page/backend/BackendOrders';
import './assets/all.scss'

export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />}>
        <Route path='/login' element={<Login />}></Route>
      </Route>
      <Route path='/backend' element={<Dashboard />}>
        <Route path='/backend' element={<BHome />}></Route>
        <Route path='/backend/product' element={<BackendProducts />}></Route>
        <Route path='/backend/coupon' element={<BackendCoupon />}></Route>
        <Route path='/backend/order' element={<BackendOrders />}></Route>
      </Route >
      {/* 暫放 */}
      {/* <Route path='/reactDaily' element={<ReactDailyApp />}></Route> */}
    </Routes >
  )
}
