import React from 'react'
import LogoBUY from '@components/frontend/LogoBUY';
import './footer.scss'

export default function Footer() {
  return (
    <footer className='footer py-3 text-white'>
      <div className='container'>
        <div className="row">
          <div className="col-md-6">
            <a className="text-white h4" href="#">
              <div className="footer-logo">
                <LogoBUY />
              </div>
            </a>
          </div>
          <div className="col-md-6">
            <ul className="footer-icon">
              <li>
                <a href="https://github.com/chenminfan/myHexschool-dev" className="text-white mx-3" role="link" aria-label="footer-link">
                  <i className="bi bi-github"></i></a>
              </li>
              <li>
                <a href="#" className="text-white mx-3" role="link" aria-label="footer-link">
                  <i className="bi bi-globe2"></i></a>
              </li>
              <li>
                <a className="text-white mx-3" href="#/main/loginBackend" aria-label='backend-user' role="link">
                  <i className="bi bi-window-sidebar"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-info">
          <div className="mb-md-0 mb-1">

            <div className="footer-item">
              <p className="mb-0">02-3456-7890</p>
              <p className="footer-note">本公司不會撥打給您，如有來電顯示此號碼，請勿理會</p>
            </div>

            <p className="mb-0 footer-mail">service@mail.com</p>
          </div>
        </div>
        <div className="footer-copyright">© 2024 本網站僅供個人作品使用，不提供商業用途，All Rights Reserved.</div>
      </div>
    </footer >
  )
}
