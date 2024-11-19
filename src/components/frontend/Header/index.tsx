import React, { useState } from 'react'
import LogoBUY from '@components/frontend/LogoBUY';
import './header.scss';

export default function Header(props) {
  const { headerLink = '#', cartData, trackList } = props;
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleMouseLeave = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <header>
      <nav className="navbar navbar-expand-lg" onMouseLeave={handleMouseLeave}>
        <div className="container-fluid">
          <button className={`navbar-toggler fade ${!isNavCollapsed ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle-Link" role="button" onClick={handleNavCollapse} >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse fade navbar-collapse navbar-box collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarTogglerDemo01">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#/main/prods" aria-label="prods-category" role="link">
                  <i className="bi bi-signpost-split"></i>
                  store
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/main/track" aria-label="prods-category" role="link">
                  <i className="bi bi-bookmark-heart-fill"></i>
                  追蹤商品
                  {trackList.length ? (
                    <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                      {trackList.length ? trackList.length : 0}
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                      <span className={trackList.length === 0 ? "" : "visually-hidden"}>等你追</span>
                    </span>
                  )}
                </a>
              </li>
              <li className="nav-item nav-item-mobile">
                <a className="nav-link" href="#/main/order" aria-label="prods-category" role="link">
                  <i className="bi bi-card-checklist"></i>
                  訂單明細
                </a>
              </li>
              <li className="nav-item nav-item-mobile">
                <a className="nav-link" href="#/main/login" aria-label="prods-category" role="link">
                  <i className="bi bi-window-sidebar"></i>
                  後台管理
                </a>
              </li>
            </ul>
          </div>
          <a className="navbar-brand text-white h4" href={headerLink} aria-label='logo-link' role="link">
            <div className="logo">
              <LogoBUY />
            </div>
          </a>
          <div className="navbar-collapse navbar-icon">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link navbar-carIcon" href="#/main/cart" aria-label='shopping-cart' role="link">
                  <i className="bi bi-cart-check-fill"></i>
                  {cartData.carts.length ? (
                    <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                      {cartData.carts.length ? cartData.carts.length : 0}
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                      <span className={cartData.carts.length === 0 ? "" : "visually-hidden"}>做伙下單</span>
                    </span>
                  )}
                </a>
              </li>
              <li className="nav-item nav-item-mobile">
                <a className="nav-link" href="#/main/order" aria-label='backend-user' role="link">
                  <i className="bi bi-card-checklist"></i>
                </a>
              </li>
              <li className="nav-item nav-item-mobile">
                <a className="nav-link" href="#/main/login" aria-label='backend-user' role="link">
                  <i className="bi bi-window-sidebar"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </nav>
    </header>
  )
}
