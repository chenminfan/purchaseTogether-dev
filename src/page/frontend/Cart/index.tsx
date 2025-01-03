import React, { useRef, useEffect, useState, useContext } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { postCouponApi } from '@api/Apis';
import { useRWD } from '@api/utilities/useRWD'
import CartStep from '@components/frontend/CartStep';
import CartProdCard from '@components/frontend/Cart/CartProdCard';
import NotDataState from '@components/frontend/NotDataState'
import Tooltip from '@components/frontend/Tooltip';
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import './checkout.scss'
import { CartCheckProdType } from '@typeTS/CartCheck'

type CartCheckoutType = {
  checkout: () => void,
  cartData: {
    id: string,
    carts: CartCheckProdType[],
    final_total: number,
    total: number,
  }
  handleTrack?: (string) => {},
  trackList?: string[],
  cartStep: number,
  setCartStep: (number) => void,
}
export default function Cart() {
  const { USER_MEMBER } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const { cartData, checkout, handleTrack, trackList, cartStep, setCartStep } = useOutletContext<CartCheckoutType>();
  const [couponCode, setCouponCode] = useState('')
  const [couponInfo, setCouponInfo] = useState({
    info: '',
    infoState: false,
  })
  const RWD_DEVICE = useRWD();

  useEffect(() => {
    checkout()
    cartData.carts.length === 0 ? setCartStep(-1) : setCartStep(0)
  }, [cartData.carts.length])

  const [_, dispatch] = useContext<any>(SnackbarContent);
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const handleClickCoupon = async (code) => {
    cartData.carts.length === 0 ? setCartStep(-1) : setCartStep(0)
    if (couponCode !== '') {
      isLoadingRef.current = loadingPage
      setLoadingPage(true)
      const data = {
        code: code
      }
      try {
        const codeRes = await postCouponApi(data)
        isLoadingRef.current = false
        setLoadingPage(false)
        setCouponInfo({
          info: code,
          infoState: codeRes.data.success,
        })
        handleSnackbarSuccess(dispatch, codeRes);
        isLoadingRef.current = false
        setLoadingPage(false)
      } catch (error) {
        handleSnackbarError(dispatch, error);
        isLoadingRef.current = false
        setLoadingPage(false)
      }
    }

    checkout()
  }

  return (
    <div className="cart_page">
      <div className='container-xl py-2 px-5'>
        <div className="row">
          <CartStep active={cartStep} />
        </div>
        {cartData.carts.length !== 0 ? (
          <div className="row">
            <div className="col-lg-7 col-md-12">
              {cartData.carts.map((cart) => (
                <CartProdCard
                  key={`cart${cart.id}`}
                  cart={cart}
                  checkout={checkout}
                  trackList={trackList}
                  handleTrack={handleTrack}
                />
              ))}


            </div>
            <div className="col-lg-5 col-md">
              <div className="checkout-list p-3">
                <h4 className="fw-bold mb-4">結帳明細</h4>
                {cartData.carts.length !== 0 ? (<>
                  <div className="checkout-code">
                    <div className="input-group mt-3">
                      <input type="text" className="form-control rounded-0 shadow-none" placeholder="折扣碼" aria-label="折扣碼"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value) }} />
                      <div className="input-group-append">
                        <button className="btn btn-primary rounded-0" type="button" disabled={couponCode === '' || loadingPage}
                          onClick={() => handleClickCoupon(couponCode)}
                        >
                          {couponInfo.infoState ? (<i className="bi bi-check2-square"></i>)
                            : (<i className="bi bi-tags-fill"></i>)}
                        </button>
                      </div>
                    </div>
                    {couponInfo.infoState && (
                      <div className='checkout-couponInfo mt-2 text-success'>
                        <span className='bg-success text-light'><i className="bi bi-check2-square mx-2"></i></span>已套用優惠券：{couponInfo.info}
                      </div>)}

                  </div>
                  <div className="checkout-body">
                    <div className="checkout-item">
                      <div className="checkout-title">原價小計</div>
                      <div className="checkout-content">NT$ {cartData.total.toLocaleString('zh-TW')}</div>
                    </div>
                    {/* <div className="checkout-item">
                      <div className="checkout-title">支付方式</div>
                      <div className="checkout-content"></div>
                    </div> */}
                  </div>
                  <div className="checkout-footer">
                    <div className="checkout-item checkout-item-total">
                      <div className="checkout-title">Total</div>
                      <div className="checkout-content">NT ${Math.round(cartData.final_total).toLocaleString('zh-TW')}</div>
                    </div>
                    <div className="d-grid gap-2">
                      <Tooltip text="請再次確認您的購物商品">
                        <button className="btn btn-primary checkout-btn" type="button" onClick={() => {
                          if (USER_MEMBER) {
                            navigate('/main/cart/info')
                            setCartStep(1)
                          } else {
                            navigate('/main/memberLogin')
                          }
                        }} disabled={loadingPage}>
                          {loadingPage ? (
                            <>
                              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                              <span className="ms-2" role="status">Loading...填寫資料中！</span>
                            </>
                          ) : "填寫資料"}
                        </button>
                      </Tooltip>
                      {RWD_DEVICE === "mobile" && <button
                        className='btn btn-outline-primary'
                        onClick={() => {
                          window.scrollTo(0, 0)
                        }}>
                        <i className="bi bi-arrow-up-circle"></i> 回Top<br />可再次檢查您的商品資訊
                      </button>}
                    </div>
                  </div>
                </>) : (
                  <div className="checkout-notState">
                    <div className="checkout-notState-icon"><i className="bi bi-coin"></i></div>
                    尚無商品可以計算
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <NotDataState notStateIcon="bi-cart2" notStateTitle="您的購物車空空喔" >
            <button type="button" className="btn btn-primary mt-3" onClick={() => {
              navigate(`/main/prods`)
            }}>趕緊加入我的商品</button>
          </NotDataState>
        )}

      </div>
    </div >
  )
}
