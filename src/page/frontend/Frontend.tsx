import React, { Outlet } from 'react-router-dom'
import { LoginContentProvider } from '@provider/LoginProvider';
import { CartProvider } from '@provider/CartProvider';
import Header from '@components/frontend/Header';
import Footer from '@components/frontend/Footer';
import 'bootstrap/dist/js/bootstrap.js'
import './frontend.scss'

export default function Frontend() {
  return (
    <LoginContentProvider>
      <Header headerTitle="react cart" />
      <CartProvider>
        <main className='frontend'>
          <Outlet />
        </main>
      </CartProvider>
      <Footer />
    </LoginContentProvider>
  )
}
