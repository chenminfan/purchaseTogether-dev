import React, { useState, useContext, forwardRef } from 'react'
import { useLocation } from 'react-router-dom';
import LogoBUY from '@components/frontend/LogoBUY';
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import { useRWD } from '@api/utilities/useRWD'
import './header.scss';

export type NavLeftItemsType = {
  name?: string,
  className: string,
  navID: string,
  icon: string,
  link: string,
  children?: JSX.Element | JSX.Element[],
  handleClick?: () => void,
};
const RouterLink = forwardRef<HTMLLIElement, NavLeftItemsType>(({ name, className, navID, link, icon, children, handleClick }: NavLeftItemsType, ref) => {
  const location = useLocation();
  return (
    <li className={`nav-item ${className}`} ref={ref} onClick={handleClick} >
      {link === '#/main/memberLogin' ? (
        <a className={`nav-link ${(`#${location.pathname}` === '#/main/memberLogin') || (`#${location.pathname}` === '#/main/member') ? 'active' : ''}`} href={link} aria-label={navID} role="link" >
          <i className={`bi ${icon}`}></i>{name}
          {children}
        </a>
      ) : (
        <a className={`nav-link ${`#${location.pathname}` === link ? 'active' : ''}`} href={link} aria-label={navID} role="link">
          <i className={`bi ${icon}`}></i>{name}
          {children}
        </a>
      )
      }
    </li >
  )
})

export default function Header(props) {
  const RWD_DEVICE = useRWD();
  const { headerLink = '#', cartData, trackList } = props;
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const navText = [
    { navName: '全站商品', navID: 'store', className: '', link: '#/main/prods', icon: 'bi-signpost-split' },
    { navName: '追蹤商品', navID: 'trackProds', className: '', link: '#/main/track', icon: 'bi-bookmark-heart-fill' },
    { navName: '訂單明細', navID: 'orderList', className: 'nav-item-mobile', link: '#/main/order', icon: 'bi-card-checklist' },
    { navName: '我的會員', navID: 'member', className: 'nav-item-mobile', link: '#/main/memberLogin', icon: 'bi-person' },
  ]
  const navIcon = [
    { navName: '購物車', navID: 'cart', className: 'navbar-carIcon', link: '#/main/cart', icon: 'bi-cart-check-fill' },
    { navName: '我的會員', navID: 'member', className: 'nav-item-mobile', link: '#/main/memberLogin', icon: 'bi-person' },
    { navName: '訂單', navID: 'order', className: 'nav-item-mobile', link: '#/main/order', icon: 'bi-card-checklist' },
  ]

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className={`navbar-toggler ${isNavCollapsed ? '' : 'collapsed'}`} type="button" onClick={() => setIsNavCollapsed((isNavCollapsed) => !isNavCollapsed)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse navbar-box fade ${isNavCollapsed ? 'show' : ''}`} id="navbarTogglerDemo01">
            <ul className="navbar-nav">
              {navText.map((text) => (
                <RouterLink key={text.navID} className={text.className} link={text.link} icon={text.icon} navID={text.navID} name={text.navName}
                  handleClick={RWD_DEVICE !== 'desktop' ? () => setIsNavCollapsed(false) : () => { }}>
                  <>
                    {text.navID === 'trackProds' && (
                      <>
                        {trackList.length ? (
                          <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                            {trackList.length ? trackList.length : 0}
                          </span>
                        ) : (
                          <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                            <span className={trackList.length === 0 ? "" : "visually-hidden"}>等你追</span>
                          </span>
                        )}
                      </>
                    )}
                  </>
                </RouterLink>
              ))}
            </ul>
          </div>
          <a className="navbar-brand text-white h4" href={headerLink} aria-label='logo-link' role="link">
            <div className="logo">
              <LogoBUY />
            </div>
          </a>
          <div className="navbar-collapse navbar-icon">
            <ul className="navbar-nav">
              {navIcon.map((navItem) => (
                <RouterLink key={navItem.navID} className={navItem.className} link={navItem.link} icon={navItem.icon} navID={navItem.navID}>
                  <>
                    {navItem.navID === 'cart' && (
                      <>
                        {cartData.carts.length ? (
                          <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                            {cartData.carts.length ? cartData.carts.length : 0}
                          </span>
                        ) : (
                          <span className="badge rounded-pill text-bg-danger navbar-carIcon-number">
                            <span className={cartData.carts.length === 0 ? "" : "visually-hidden"}>做伙下單</span>
                          </span>
                        )}
                      </>
                    )}
                  </>
                </RouterLink>
              ))}
            </ul>
          </div>
        </div>

      </nav >
    </header >
  )
}
