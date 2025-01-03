import React, { useRef, useEffect, useState, } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { postPayApi, getOrdersIdApi } from '@api/Apis';
import { dataValue } from '@api/utilities/dataValue';
import CartStep from '@components/frontend/CartStep';
import './pay.scss'
type CartCheckoutType = {
  cartStep: number,
  setCartStep: (number) => void,
}
export default function Pay() {
  const { orderId } = useParams()
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const { cartStep, setCartStep } = useOutletContext<CartCheckoutType>();
  const [saveOrder, setSaveOrder] = useState({
    create_at: 0,
    id: '',
    is_paid: false,
    message: '',
    products: {
      qty: 0,
      final_total: 0,
      total: 0,
      product_id: '',
    },
    total: 0,
    user: {
      address: '',
      email: '',
      name: '',
      tel: '',
    },
    num: 0
  })

  const getCart = async (orderId) => {
    isLoadingRef.current = loadingPage
    setLoadingPage(true)
    try {
      const res = await getOrdersIdApi(orderId)
      isLoadingRef.current = false
      setLoadingPage(false)
      setSaveOrder(res.data.order)
    } catch (error) {
    }
  }

  const handleClickPay = async (orderId) => {
    isLoadingRef.current = loadingPage
    setLoadingPage(true)
    try {
      await postPayApi(orderId)
      isLoadingRef.current = false
      setLoadingPage(false)
    } catch (error) {
    }
    getCart(orderId)
  }

  useEffect(() => {
    getCart(orderId)
    window.scrollTo(0, 0)
    saveOrder.is_paid ? setCartStep(3) : setCartStep(2)
  }, [orderId, saveOrder.is_paid])

  return (
    <div className="pay_page" >
      <div className="container-xl py-2">
        <div className="row">
          <CartStep active={cartStep} />
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="pay-order">
              <div className="pay-title ">
                <h4 className="fw-bold">
                  <i className="bi bi-bag-check-fill text-opacity-75 text-success"></i>訂單成立成功
                </h4>
              </div>
              <div className="pay-box">
                <div className="pay-info">
                  <div className="order-list">
                    <div className="order-item">
                      <div className="order-title">
                        訂單編號
                      </div>
                      <div className="order-content">
                        {saveOrder.id}
                      </div>
                    </div>
                    <div className="order-item">
                      <div className="order-title">
                        訂單日期
                      </div>
                      <div className="order-content">
                        {dataValue(saveOrder.create_at)}
                      </div>
                    </div>
                    <div className="order-item">
                      <div className="order-title">
                        聯絡人
                      </div>
                      <div className="order-content">
                        {saveOrder.user.name.split('+')[0]}
                      </div>
                    </div>
                    <div className="order-item">
                      <div className="order-title">
                        聯絡人信箱
                      </div>
                      <div className="order-content">
                        {saveOrder.user.email}
                      </div>
                    </div>
                  </div>
                  <div>{saveOrder.is_paid ? (
                    <span className="pay-note border-success text-opacity-75 bg-success-subtle text-success-emphasis">
                      <i className="bi bi-brightness-high"></i>
                      已完成付款，訂單即將上路！
                      <i className="bi bi-box-seam-fill"></i><i className="bi bi-box-seam-fill"></i><i className="bi bi-box-seam-fill"></i>...
                    </span>
                  ) : (
                    <span className="pay-note">
                      <i className="bi bi-balloon-heart"></i>
                      提醒您！尚未付款，請儘早結帳～
                    </span>)}</div>


                </div>
                {saveOrder.is_paid ? '' : (<div className="pay-btn d-grid gap-2">
                  <button className='btn btn-primary btn-lg'
                    onClick={() => { handleClickPay(saveOrder.id) }}
                    disabled={loadingPage}>
                    {loadingPage ? (
                      <>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...付款中！</span>
                      </>
                    ) : (<>
                      <i className="bi bi-cash-coin"></i>
                      <span>前往付款</span>
                    </>)}

                  </button>
                </div>)}

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}