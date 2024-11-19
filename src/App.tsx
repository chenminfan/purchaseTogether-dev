import React, { Routes, Route } from 'react-router-dom';
import '@assets/bootstrap.scss';
import '@assets/all.scss'
import BHome from '@pageBackend/Home';
import Frontend from '@pageFrontend/Frontend';
import Home from '@pageFrontend/Home';
import Login from '@pageFrontend/Login';
import Cart from '@pageFrontend/Cart';
import CartCheckoutInfo from '@pageFrontend/CartCheckoutInfo';
import Pay from '@pageFrontend/Pay';
import Products from '@pageFrontend/Products';
import Track from '@pageFrontend/Track';
import ProductDetail from '@pageFrontend/ProductDetail';
import Dashboard from '@pageBackend/Dashboard';
import BackendProducts from '@pageBackend/Products';
import BackendCoupon from '@pageBackend/Coupon';
import BackendOrders from '@pageBackend/Orders';


export default function App() {
  return (
    <Routes>
      <Route element={<Frontend />}>
        <Route index path='/' element={<Home />}></Route>
        <Route path='/main/login' element={<Login />}></Route>
        <Route path='/main/cart' element={<Cart />}></Route>
        <Route path='/main/cart/info' element={<CartCheckoutInfo />}></Route>
        <Route path='/main/cart/pay/:orderId' element={<Pay />}></Route>
        <Route path='/main/prods' element={<Products />}></Route>
        <Route path='/main/prods/detail/:id' element={<ProductDetail />}></Route>
        <Route path='/main/track' element={<Track />}></Route>
        <Route path='/main/*' element={<Home />}></Route>
      </Route >
      <Route path='/backend' element={<Dashboard />}>
        <Route path='/backend' element={<BHome />}></Route>
        <Route path='/backend/product' element={<BackendProducts />}></Route>
        <Route path='/backend/coupon' element={<BackendCoupon />}></Route>
        <Route path='/backend/order' element={<BackendOrders />}></Route>
        <Route path='/backend/*' element={<BHome />}></Route>
      </Route >
      {/* 暫放 */}
      {/* <Route path='/reactDaily' element={<ReactDailyApp />}></Route> */}
    </Routes >
  )
}
