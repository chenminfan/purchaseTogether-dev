import React from 'react';
import './header.scss'

export default function Header(props) {
  const { headerLink = '/', headerTitle } = props;
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href={headerLink}>{headerTitle}</a>
          <button className="navbar-toggler" />
          <div className="container-fluid navbar-box">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="#/login">登入後台</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/cart">購物車</a>
                </li>
              </ul>
            </div>
            <a className="navbar-brand navbar-carIcon" href="#home">
              <i className="bi bi-cart-check-fill"></i>
              <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">9</span>
              <span className="visually-hidden">unread messages</span>
            </a>
          </div>
        </div>
      </nav >
    </header >
  )
}
