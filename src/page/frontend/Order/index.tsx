import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { getOrdersApi } from '@api/Apis';
import { dataValue, telValue, nameValue } from '@api/utilities/dataValue';
import { OrdersType } from '@app/typeTS/Orders';
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import NotDataState from '@components/frontend/NotDataState'
import './order.scss'

export default function Order() {
  const { USER_MEMBER, loggedIn, USER_TOKEN, USER_ID } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState<OrdersType[]>([])
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  const getCoupon = async () => {
    const codeRes = await getOrdersApi()
    isLoadingRef.current = true
    setLoadingPage(true)
    try {
      setOrderData(
        [...codeRes.data.orders.filter((item) => item)]
          .filter(item => item.user.name.match(USER_ID))
      )
      isLoadingRef.current = false
      setLoadingPage(false)
    } catch (error) {
      isLoadingRef.current = true
      setLoadingPage(true)
    }
  }

  useEffect(() => {
    if (USER_TOKEN !== '') {
      getCoupon()
    } else {
      navigate('/main/memberLogin')
    }
  }, [USER_TOKEN])
  return (
    <div className="order_page">
      <div className='container-xl py-2'>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h4 className="fw-bold mb-4">我的訂單</h4>
            {loadingPage ? (<div className="accordion" >
              <div className="accordion-item placeholder-glow">
                <button className='accordion-button'><span className="placeholder col-7"></span></button>
                <div className="accordion-collapse collapse show">
                  <div className="accordion-body">
                    <span className="placeholder col-7 "></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </div>
                </div>
              </div>
              <div className="accordion-item placeholder-glow">
                <button className='accordion-button'><span className="placeholder col-7"></span></button>
                <div className="accordion-collapse collapse">
                </div>
              </div>
              <div className="accordion-item placeholder-glow">
                <button className='accordion-button'><span className="placeholder col-7"></span></button>
                <div className="accordion-collapse collapse">
                </div>
              </div>
              <div className="accordion-item placeholder-glow">
                <button className='accordion-button'><span className="placeholder col-7"></span></button>
                <div className="accordion-collapse collapse">
                </div>
              </div>
            </div>) : (<div className='order-box'>
              {orderData.length === 0 ? (<NotDataState notStateIcon="bi-card-checklist" notStateTitle="尚無訂單成立" />) : (

                <div className="accordion" id="accordionExample">
                  {orderData.map((order, orderIndex) => {
                    return (
                      <div className="accordion-item" key={`order_${order.id}`}>
                        <h2 className="accordion-header">
                          <button className={`accordion-button ${orderIndex === 0 ? '' : 'collapsed'} ${order.is_paid ? '' : 'accordion-button-danger'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${orderIndex}`} aria-expanded={orderIndex === 0 ? 'true' : 'false'} aria-controls={`collapseOne${orderIndex}`}>
                            <a href={`#/main/cart/pay/${order.id}`}>{order.is_paid ? (<span>已付款</span>) : (<span><i className="bi bi-exclamation-circle-fill"></i> 未付款</span>)}</a> ｜ {dataValue(order.create_at)}
                          </button>
                        </h2>
                        <div id={`collapseOne${orderIndex}`} className={`accordion-collapse collapse ${orderIndex === 0 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item list-group-item-id">＃{order.id}</li>
                              <li className="list-group-item">聯絡人：{nameValue(order.user.name.split('+')[0])}</li>
                              <li className="list-group-item">聯絡人電話：{telValue(order.user.tel)}</li>
                              <li className="list-group-item">訂單付款狀態：<a href={`#/main/cart/pay/${order.id}`}>{order.is_paid ? '已付款' : '未付款'}</a></li>
                              <li className="list-group-item">
                                {order.products && Object.values(order.products).map((item, index) => {
                                  return (
                                    <div className='order-prod' key={`order-prod${index}_${item.product.id}`}>
                                      <div className="order-prod-title"><span className='order-prod-note'>{item.product.category}</span> ／{item.product.title}</div>
                                      <div className="order-prod-qty">× {item.qty}{item.product.unit}</div>
                                    </div>
                                  )
                                })}
                              </li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              )}

            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
