import React, { useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import { postCouponApi } from '@api/Apis';
import CartProdCard from '@components/frontend/Cart/CartProdCard';
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import './checkout.scss'
import { CartCheckType } from '@typeTS/CartCheck'

type CartCheckoutType = {
  checkout: () => void,
  cartData: {
    id: string,
    carts: CartCheckType[],
    final_total: number,
    total: number
  }
}
export default function Cart() {
  const { cartData, checkout } = useOutletContext<CartCheckoutType>();
  const [couponCode, setCouponCode] = useState('')
  const [couponInfo, setCouponInfo] = useState({
    info: '',
    infoState: false,
  })
  useEffect(() => {
    checkout()
  }, [])
  const [state, dispatch] = useContext<any>(SnackbarContent);
  const handleClickCoupon = async (code) => {
    const data = {
      code: code
    }
    try {
      const codeRes = await postCouponApi(data)
      setCouponInfo({
        info: code,
        infoState: codeRes.data.success,
      })
      handleSnackbarSuccess(dispatch, codeRes);
    } catch (error) {
      handleSnackbarError(dispatch, error);
    }
  }

  return (
    <div className="cart_page">
      <div className='container-fluid py-2'>
        <div className="row">

        </div>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            {cartData.carts.map((cart) => (
              <CartProdCard
                key={`cart${cart.id}`}
                cart={cart}
                checkout={checkout}
              />
            ))}

          </div>
          <div className="col-lg-5 col-md">
            <div className="checkout-list p-3">
              <h4 className="fw-bold">結帳明細</h4>
              <div className="checkout-code">
                <div className="input-group mt-3">
                  <input type="text" className="form-control rounded-0 shadow-none" placeholder="折扣碼" aria-label="折扣碼"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value) }} />
                  <div className="input-group-append">
                    <button className="btn btn-primary rounded-0" type="button"
                      onClick={() => handleClickCoupon(couponCode)}
                    >
                      {couponInfo.infoState ? (<i className="bi bi-check2-square"></i>)
                        : (<i className="bi bi-pencil"></i>)}
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
                  <a className="btn btn-primary checkout-btn" type="button" href="#/main/cart/info">
                    填寫資料
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
