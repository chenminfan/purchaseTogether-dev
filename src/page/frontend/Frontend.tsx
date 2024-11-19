import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LoginContentProvider } from '@provider/LoginProvider';
import SnackbarProvider from '@provider/SnackbarProvider'
import CartProvider from '@provider/CartProvider'
import Header from '@components/frontend/Header';
import Footer from '@components/frontend/Footer';
import Toasts from '@components/frontend/Toasts';
import { getCartApi } from '@api/Apis';
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

  const LOCALSTORAGE_NAME = 'trackProd';
  const [trackList, setTrackList] = useState<any>([]);
  useEffect(() => {
    const items = localStorage.getItem(LOCALSTORAGE_NAME);
    if (items) setTrackList(JSON.parse(items));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(trackList));
  }, [trackList]);

  const handleTrack = (isTrack: string) => {
    const index = trackList.findIndex((item) => item === isTrack)
    if (index === -1) {
      setTrackList([...trackList, isTrack])
    } else if (index !== -1) {
      trackList.splice(index, 1)
      setTrackList([...trackList])
    } else {
      setTrackList([...trackList])
    }
  }

  return (
    <LoginContentProvider>
      <SnackbarProvider>
        <Header headerTitle="做伙Buy" cartData={cartData} />
        <main className='frontend'>
          <Outlet context={{ checkout, cartData, handleTrack, trackList }} />
        </main>

        <Footer />
        <Toasts />
      </SnackbarProvider>
    </LoginContentProvider>
  )
}
