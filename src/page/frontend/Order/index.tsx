import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { getOrdersApi } from '@api/Apis';
import { dataValue, telValue, nameValue } from '@api/utilities/dataValue';
import { OrdersType } from '@app/typeTS/Orders';
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import NotDataState from '@components/frontend/NotDataState'
import './order.scss'

export default function Order() {
  const { user, token } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState<OrdersType[]>([])
  const getCoupon = async () => {
    try {
      const codeRes = await getOrdersApi()
      // setOrderData(codeRes.data.orders)
      setOrderData(codeRes.data.orders)
    } catch (error) {
    }
  }
  const USER_DATA = Array.from(new Set(orderData.filter((item) => item))).filter(item => item.user.name.match(user.uid))
  useEffect(() => {
    getCoupon()
  }, [])

  return (
    <div className="order_page">
      <div className='container-fluid py-2'>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h4 className="fw-bold mb-4">我的訂單</h4>
            <div className='order-box'>
              {USER_DATA.length === 0 ? (<NotDataState notStateIcon="bi-card-checklist" notStateTitle="尚無訂單成立" />) : (<div className="accordion" id="accordionExample">
                {USER_DATA && USER_DATA.map((order, orderIndex) => {
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
                              {order.products && Object.values(order.products).map((item) => {
                                return (
                                  <div className='order-prod' key={`prod_${item.product.id}`}>
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
              </div>)}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
