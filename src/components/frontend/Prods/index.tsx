import React, { useState, useRef } from 'react'
import LazyLoadImg from "@components/hook/LazyLoadImage";
import { ProductsType } from '@typeTS/Products'
import './prods.scss'

type ProdsType = {
  prod: ProductsType,
  isLoading: boolean,
  handleClick: () => void
}
export default function Prods(props: ProdsType) {
  const { prod, isLoading, handleClick } = props;
  if (isLoading) {
    return (
      <div className="card prods" aria-hidden="true">
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-12"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>

          <div className="img_box">
            <LazyLoadImg src="..." className="card-img-top" alt="..." />
          </div>

          <div className="prods-tool">
            <button className="btn btn-primary prods-btn-add" aria-disabled="true">
              <span className='prods-cart-icon'>
                <i className="bi bi-cart-check-fill"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="card prods">
      <div className="card-body">
        <div className="prods-content">
          <h5 className="card-title"><a href={`#/prods/detail/${prod.id}`} role="link" aria-label="prod-link">{prod.title}</a></h5>
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

        <a href={`#/prods/detail/${prod.id}`} role="link" aria-label="img-link">
          <div className="img_box">
            <LazyLoadImg className="card-img-top" src={prod.imageUrl} alt={prod.title} />
          </div>
        </a>

        <div className="prods-tool" onClick={handleClick}>
          <button type="button" className="btn btn-primary prods-btn-add" role="button"><span className='prods-cart-icon'>
            <i className="bi bi-cart-check-fill"></i>
          </span></button>
        </div>
      </div>
    </div>
  )
}
