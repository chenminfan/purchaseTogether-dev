import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-dark py-5'>
      <div className='container'>
        <data className='d-flex align-items-center justify-content-between text-white mb-md-7 mb-4'>
          <a className="text-white h4" href="./index.html">LOGO</a>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li>
              <a href="#" className="text-white mx-3">
                <i className="bi bi-facebook"></i></a>
            </li>
            <li>
              <a href="#" className="text-white mx-3">
                <i className="bi bi-instagram"></i></a>
            </li>
            <li>
              <a href="#" className="text-white mx-3">
                <i className="bi bi-line"></i></a>
            </li>
          </ul>
        </data>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">02-3456-7890</p>
            <p className="mb-0">service@mail.com</p>
          </div>
          <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
