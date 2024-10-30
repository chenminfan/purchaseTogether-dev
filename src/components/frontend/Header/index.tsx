import React from 'react';
import './header.scss';

export default function Header(props) {
  const { headerLink = '/', headerTitle } = props;
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse navbar-box">
          <ul className="navbar-nav" id="navbarTogglerDemo01">
            <li className="nav-item">
              <a className="navbar-brand" href="#/login">
                商品分類
              </a>
            </li>
          </ul>
        </div>
        <a className="navbar-brand" href={headerLink}>{headerTitle}</a>
        <div className="navbar-collapse navbar-box">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="navbar-brand" href="#/login">
                <i className="bi bi-window-sidebar"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand navbar-carIcon" href="#/cart">
                <i className="bi bi-cart-check-fill"></i>
                <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">9</span>
                <span className="visually-hidden">unread messages</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header >
  )
}
