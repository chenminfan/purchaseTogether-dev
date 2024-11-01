import React from 'react'
import { ProductsType } from '@typeTS/Products'
import './prods.scss'

type ProdsType = {
  prod: ProductsType,
}
export default function Prods(props: ProdsType) {
  const { prod } = props
  return (
    <div className="card prods">
      <div className="card-body">
        <div className="prods-content">
          <h5 className="card-title"><a href={`#/prods/detail/${prod.id}`}>{prod.title}</a></h5>
          <div className="prods-price">
            <div className="prods-item">
              <div className="title">特價</div>
              <span>${prod.price.toLocaleString('zh-TW')}</span>
            </div>
            <div className="prods-item">
              <div className="title">原價</div>
              <span className='origin-price'>${prod.origin_price.toLocaleString('zh-TW')}</span>
            </div>
          </div>
        </div>


        <div className="img_box">
          <a href={`#/prods/detail/${prod.id}`}><img className="card-img-top" src={prod.imageUrl} alt={prod.title} />
          </a>
        </div>


        <div className="prods-tool">
          <button type="button" className="btn btn-primary prods-btn-add"><span className='prods-cart-icon'>
            <i className="bi bi-cart-check-fill"></i>
          </span></button>
        </div>
      </div>
    </div>
  )
}
