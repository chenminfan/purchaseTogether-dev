import React, { Outlet } from 'react-router-dom'
import { LoginContentProvider } from '@provider/LoginProvider';
import DialogProvider from '@provider/DialogProvider'
import Header from '@components/frontend/Header';
import Footer from '@components/frontend/Footer';
import Toasts from '@components/frontend/Toasts';
import 'bootstrap/dist/js/bootstrap.js'
import './frontend.scss'
export default function Frontend() {

  return (
    <LoginContentProvider>
      <DialogProvider>
        <Header headerTitle="react cart" />
        <main className='frontend'>
          <Outlet />
        </main>
        <Footer />
        <Toasts />
      </DialogProvider>
    </LoginContentProvider>
  )
}
