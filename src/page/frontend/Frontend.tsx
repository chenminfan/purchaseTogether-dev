import React, { Outlet } from 'react-router-dom'
import { LoginContentProvider } from '@provider/LoginProvider';
import SnackbarProvider from '@provider/SnackbarProvider'
import Header from '@components/frontend/Header';
import Footer from '@components/frontend/Footer';
import Toasts from '@components/frontend/Toasts';
import 'bootstrap/dist/js/bootstrap.js'
import './frontend.scss'
export default function Frontend() {

  return (
    <LoginContentProvider>
      <SnackbarProvider>
        <Header headerTitle="react cart" cartData={cartData} />
        <main className='frontend'>
          <Outlet />
        </main>
        <Footer />
        <Toasts />
      </SnackbarProvider>
    </LoginContentProvider>
  )
}
