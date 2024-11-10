import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LoginContentProvider } from '@provider/LoginProvider';
import DialogProvider from '@provider/DialogProvider'
import Header from '@components/frontend/Header';
import Footer from '@components/frontend/Footer';
import Toasts from '@components/frontend/Toasts';
import { getCartApi, postCartApi } from '@api/Apis';
import 'bootstrap/dist/js/bootstrap.js'
import './frontend.scss'
export default function Frontend() {
  type CartCheckoutType = {
    carts: [],
    final_total: number,
    total: number
  }
  const [cartData, setCartData] = useState<CartCheckoutType>({
    carts: [],
    final_total: 0,
    total: 0,
  })
  const checkout = async () => {
    const carRes = await getCartApi()
    setCartData(carRes.data.data)
  }

  useEffect(() => {
    checkout()
  }, [])

  return (
    <LoginContentProvider>
      <DialogProvider>
        <Header headerTitle="react cart" cartData={cartData} />
        <main className='frontend'>
          <Outlet context={{ checkout }} />
        </main>
        <Footer />
        <Toasts />
      </DialogProvider>
    </LoginContentProvider>
  )
}
