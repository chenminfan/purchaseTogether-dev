import React, { useState, useContext, forwardRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import LogoBUY from '@components/frontend/LogoBUY';
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import './header.scss';

export type NavLeftItemsType = {
  name?: string,
  className: string,
  navID: string,
  icon: string,
  link: string,
  children?: JSX.Element | JSX.Element[],
};
const RouterLink = forwardRef<HTMLLIElement, NavLeftItemsType>(({ name, className, navID, link, icon, children }: NavLeftItemsType, ref) => {
  const location = useLocation();
  return (
    <li className={`nav-item ${className}`} ref={ref}>
      {link === '#/main/memberLogin' ? (
        <a className={`nav-link ${(`#${location.pathname}` === '#/main/memberLogin') || (`#${location.pathname}` === '#/main/member') ? 'active' : ''}`} href={link} aria-label={navID} role="link">
          <i className={`bi ${icon}`}></i>{name}
          {children}
        </a>
      ) : (
        <a className={`nav-link ${`#${location.pathname}` === link ? 'active' : ''}`} href={link} aria-label={navID} role="link">
          <i className={`bi ${icon}`}></i>{name}
          {children}
        </a>
      )}
    </li>
  )
})

export default function Header(props) {
  const { USER_MEMBER, USER_TOKEN, getLoginOut, getMember } = useContext<any>(LoginContext)
  const { headerLink = '#', cartData, trackList } = props;
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleMouseLeave = () => setIsNavCollapsed(true);
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
  useEffect(() => {
    getMember()
  }, [])
  return (
    <header>
      <nav className="navbar navbar-expand-lg"
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-fluid">
          <button className={`navbar-toggler fade ${!isNavCollapsed ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle-Link" role="button" onClick={handleNavCollapse} >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse fade navbar-collapse navbar-box collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarTogglerDemo01">
            <ul className="navbar-nav">
              {navText.map((text) => (
                <RouterLink key={text.navID} className={text.className} link={text.link} icon={text.icon} navID={text.navID} name={text.navName}>
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

              {(USER_MEMBER !== null || USER_MEMBER !== '') && USER_TOKEN !== '' && <li className="nav-item">
                <button type='button' className="nav-link" aria-label="prods-category" role="link" onClick={() => {
                  getLoginOut()
                }}>
                  登出
                </button>
              </li>}
            </ul>
          </div>
        </div>

      </nav >
    </header >
  )
}
