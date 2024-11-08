import React, { useEffect, useContext, useState } from 'react'
import { getCartApi } from '@api/Apis';
import { ProductsType } from '@typeTS/Products';
import LazyLoadImg from "@components/hook/LazyLoadImage";
import Stepper from '@components/frontend/Stepper'
import './checkout.scss'


type CartCheckoutItemType = {
  final_total: number,
  id: string,
  product: ProductsType,
  product_id: string,
  qty: number,
  total: number
}
type CartCheckoutType = {
  carts: CartCheckoutItemType[],
  final_total: number,
  total: number
}
export default function CartCheckout() {
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
  console.log(cartData)
  const isSuccess = false;
  return (
    <div className="cart_page">
      <div className='container-fluid py-2'>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            {cartData.carts.map((cart) => (
              <div className="checkout-card">
                <div className="checkout-image">
                  <button className="btn btn-primary checkout-btn btn-sm" type="button">
                    {isSuccess ? (<i className="bi bi-bookmark-heart-fill"></i>) : (<i className="bi bi-bookmark-heart"></i>)}
                  </button>
                  <div className="img_box">
                    <LazyLoadImg className="card-img-top" src={cart.product.imageUrl} alt={cart.product.title} />
                  </div>
                </div>
                <div className="checkout-info">


                  <button className="btn text-primary checkout-btn btn-sm" type="button"><i className="bi bi-x-lg"></i></button>
                  <div className="checkout-title">{cart.product.title}</div>

                  <div className="checkout-content">
                    <div className="checkout-stepper">
                      <Stepper num={cart.qty} />
                    </div>
                    <div className="checkout-price">NT$ {cart.total.toLocaleString('zh-TW')}</div>
                  </div>


                </div>
              </div>
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
