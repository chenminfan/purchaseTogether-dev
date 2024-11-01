import React from 'react';
import './header.scss';

export default function Header(props) {
  const { headerLink = '/', headerTitle } = props;

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-box" id="navbarTogglerDemo01">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  商品分類
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  商品分類
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  商品分類
                </a>
              </li>
            </ul>
          </div>
          <a className="navbar-brand" href={headerLink}>{headerTitle}</a>
          <div className="navbar-collapse navbar-icon">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#/login">
                  <i className="bi bi-window-sidebar"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navbar-carIcon" href="#/cart">
                  <i className="bi bi-cart-check-fill"></i>
                  <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">9</span>
                  <span className="visually-hidden">unread messages</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </nav>
    </header>
  )
}
