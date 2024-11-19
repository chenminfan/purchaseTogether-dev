import React, { useState, useEffect } from 'react'
import { getOrdersApi } from '@api/Apis';
import { dataValue, telValue, nameValue } from '@api/utilities/dataValue';
import { OrdersType } from '@app/typeTS/Orders';
import './order.scss'

export default function Order() {
  const [orderData, setOrderData] = useState<OrdersType[]>([])
  const getCoupon = async () => {
    try {
      const codeRes = await getOrdersApi()
      setOrderData(codeRes.data.orders)
      console.log(codeRes)
    } catch (error) {
    }
  }

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
              <div className="accordion" id="accordionExample">
                {orderData.map((order, orderIndex) => (
                  <div className="accordion-item" key={`order_${order.id}`}>
                    <h2 className="accordion-header">
                      <button className={`accordion-button ${orderIndex === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${orderIndex}`} aria-expanded={orderIndex === 0 ? 'true' : 'false'} aria-controls={`collapseOne${orderIndex}`}>
                        {dataValue(order.create_at)}
                      </button>
                    </h2>
                    <div id={`collapseOne${orderIndex}`} className={`accordion-collapse collapse ${orderIndex === 0 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <ul className="list-group list-group-flush">
                          {/* <li className="list-group-item active" aria-current="true"></li> */}
                          <li className="list-group-item">{order.id}</li>
                          <li className="list-group-item">{nameValue(order.user.name)}</li>
                          <li className="list-group-item">{telValue(order.user.tel)}</li>
                          <li className="list-group-item">{Object.values(order.products).map((item) => (
                            <div className='order-prod' key={`prod_${item.id}`}>
                              <div className="order-prod-title">{item.product.title}</div>
                              <div className="order-prod-qty">× {item.qty}{item.product.unit}</div>
                            </div>
                          ))}</li>
                        </ul>
                      </div>
                    </div>

                  </div>



                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
