import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function PaginationComponents(props) {
  const { page, getPagination } = props
  const [currentPage, setCurrentPage] = useState(1);
  const handleClickLeft = (page) => {
    if (currentPage <= 1) {
      setCurrentPage(1)
    } else {
      setCurrentPage(page)
    }
    getPagination(page)
  }
  const handleClickRight = (page) => {
    if (currentPage >= page.total_pages) {
      setCurrentPage(page.total_pages)
    } else {
      setCurrentPage(page)
    }
    getPagination(page)
  }
  const handleClickPage = (page) => {
    setCurrentPage(page)
    getPagination(page)
  }
  const handleChangePage = (e, value) => {
    setCurrentPage(value)
    getPagination(value)
  }
  return (
    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <nav className='page'>
        <ul className="page-box">
          {page.has_pre && <li className="page-item page-item-left">
            <NavLink
              onClick={() => {
                handleClickLeft(page.current_page - 1)
              }}>
              <i className="bi bi-caret-left-fill"></i>
            </NavLink>
          </li>}
          {[...Array(page.total_pages)].map((item, index) => (
            <li className="page-item" key={`item_${index}`}>
              {currentPage === index + 1 ? index + 1 : (
                <NavLink
                  onClick={() => {
                    handleClickPage(index + 1)
                  }}>{index + 1}</NavLink>
              )
              }
            </li>
          ))}
          {page.has_next && <li className="page-item page-item-right">
            <NavLink
              onClick={() => {
                handleClickRight(page.current_page + 1)
              }}>
              <i className="bi bi-caret-right-fill"></i>
            </NavLink>
          </li>}
        </ul>
      </nav>
      <Pagination count={page.total_pages} onChange={handleChangePage} color="primary" />
    </Box>
  )
}
