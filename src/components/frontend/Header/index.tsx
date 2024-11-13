import React from 'react';
import './header.scss';

export default function Header(props) {
  const { headerLink = '#', headerTitle, cartData } = props;

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle-Link" role="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-box" id="navbarTogglerDemo01">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#/main/prods" aria-label="prods-category" role="link">
                  <i className="bi bi-signpost-split-fill"></i>
                  商品分類
                </a>
              </li>
            </ul>
          </div>
          <a className="navbar-brand" href={headerLink} aria-label='logo-link' role="link"><span className="logo">{headerTitle}</span></a>
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
                      <span className={cartData.carts.length === 0 ? "" : "visually-hidden"}>趕快下單啊</span>
                    </span>
                  )}
                </a>
              </li>
              <li className="nav-item">
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
