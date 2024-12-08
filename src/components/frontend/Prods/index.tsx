import React from 'react'
import LazyLoadImg from "@components/common/LazyLoadImage";
import { ProductsType } from '@typeTS/Products'
import './prods.scss'

type ProdsType = {
  prod: ProductsType,
  isLoading: boolean,
  isLoadingPage: boolean,
  handleClick: () => void,
  handleTrack?: (string) => {},
  trackList?: string[],
}

export default function Prods(props: ProdsType) {
  const { prod, isLoadingPage,isLoading, handleClick, handleTrack = () => { }, trackList } = props;
  const handleTrackClick = (prodID) => {
    handleTrack(prodID)
  }
  const trackID = trackList?.find((item) => item.match(prod.id))
  if (isLoadingPage) {
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
          <div className="card-image">
            <div className="img_box">
              <LazyLoadImg src="..." className="card-img-top" alt="..." />
            </div>
          </div>


          <div className="prods-tool">
            <button className="btn btn-primary prods-btn-add" aria-disabled="true" disabled={isLoading}>
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
          <h5 className="card-title"><a href={`#/main/prods/detail/${prod.id}`} role="link" aria-label="prod-link">{prod.title}</a></h5>
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
        <div className="card-prodImage">
          <button className={`btn ${trackID === prod.id ? 'btn-primary' : 'btn-light'} card-btn card-btn-track `} type="button" onClick={() => {
            handleTrackClick(prod.id)
          }} >
            {trackID === prod.id ? (<i className="bi bi-bookmark-heart-fill"></i>) : (<i className="bi bi-bookmark-heart"></i>)}
          </button>
          <a href={`#/main/prods/detail/${prod.id}`} role="link" aria-label="img-link">

            <div className="img_box">
              <LazyLoadImg className="card-img-top" src={prod.imageUrl} alt={prod.title} />
            </div>
          </a>
        </div>


        <div className="prods-tool" onClick={handleClick}>
          <button type="button" className="btn btn-primary prods-btn-add" role="button" disabled={isLoading}><span className='prods-cart-icon'>
            <i className="bi bi-cart-check-fill"></i>
          </span></button>
        </div>
      </div>
    </div>
  )
}
