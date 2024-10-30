import React, { Outlet } from 'react-router-dom'
import { LoginContentProvider } from '@provider/LoginProvider';
import Header from '@components/frontend/Header';
import './frontend.scss'

export default function Frontend() {
  return (
    <LoginContentProvider>
      <Header headerTitle="react cart" />
      <main className='frontend'>
        <Outlet />
      </main>
    </LoginContentProvider>
  )
}
