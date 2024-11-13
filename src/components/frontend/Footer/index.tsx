import React from 'react'
import LogoBUY from '@components/frontend/LogoBUY';
import './footer.scss'

export default function Footer() {
  return (
    <footer className='py-3 text-white'>
      <div className='container'>
        <data className='d-flex align-items-center justify-content-between text-white mb-md-7 mb-4'>
          <a className="text-white h4" href="#">
            <div className="logo">
              <LogoBUY />
            </div>
          </a>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li>
              <a href="#" className="text-white mx-3" role="link" aria-label="footer-link">
                <i className="bi bi-facebook"></i></a>
            </li>
            <li>
              <a href="#" className="text-white mx-3" role="link" aria-label="footer-link">
                <i className="bi bi-instagram"></i></a>
            </li>
            <li>
              <a href="#" className="text-white mx-3" role="link" aria-label="footer-link">
                <i className="bi bi-line"></i></a>
            </li>
          </ul>
        </data>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start">
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
