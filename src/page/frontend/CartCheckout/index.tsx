import React, { useEffect, useContext, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getCartApi, postCartApi } from '@api/Apis';
import { ProductsType } from '@typeTS/Products';
import './checkout.scss'
import CheckoutCard from '@components/frontend/CartCheckout/CheckoutCard';

type CartCheckoutItemType = {
  final_total: number,
  id: string,
  product: ProductsType,
  qty: number,
  total: number
}
type CartCheckoutType = {
  checkout: () => void,
  cartData: {
    id: string,
    carts: CartCheckoutItemType[],
    final_total: number,
    total: number
  }
}
export default function CartCheckout() {
  const { cartData, checkout } = useOutletContext<CartCheckoutType>();
  useEffect(() => {
    checkout()
  }, [])


  const isSuccess = false;
  return (
    <div className="cart_page">
      <div className='container-fluid py-2'>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            {cartData.carts.map((cart, index) => (
              <CheckoutCard
                key={`cart${cart.id}`}
                isSuccess={isSuccess}
                cart={cart}
                checkout={checkout}
              />
            ))}

          </div>
          <div className="col-lg-5 col-md">
            <div className="checkout-list p-4">
              <h4 className="fw-bold">結帳明細</h4>
              <div className="checkout-code">
                <div className="checkout-item">
                  <div className="input-group mt-3">
                    <input type="text" className="form-control rounded-0 shadow-none" placeholder="折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-primary rounded-0" type="button" id="button-addon2">
                        {isSuccess ? (<i className="bi bi-check2-square"></i>)
                          : (<i className="bi bi-pencil"></i>)}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              <div className="checkout-body">
                <div className="checkout-item">
                  <div className="checkout-title">小計</div>
                  <div className="checkout-content">NT$ {cartData.total.toLocaleString('zh-TW')}</div>
                </div>
                <div className="checkout-item">
                  <div className="checkout-title">支付方式</div>
                  <div className="checkout-content"></div>
                </div>
              </div>
              <div className="checkout-footer">
                <div className="checkout-item checkout-item-total">
                  <div className="checkout-title">Total</div>
                  <div className="checkout-content">NT ${cartData.final_total.toLocaleString('zh-TW')}</div>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary checkout-btn" type="button">
                    結帳
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
