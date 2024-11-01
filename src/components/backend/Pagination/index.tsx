import React, { useState } from 'react'
// import Pagination from '@mui/material/Pagination';
import './pagination.scss';
import { PaginationType } from '@typeTS/PaginationType'

type PaginationComponentsType = {
  page: PaginationType,
  getPagination: (value: number) => void,
  pageLink: string
}
export default function PaginationComponents(props: PaginationComponentsType) {
  const { page, getPagination, pageLink = '#' } = props
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleClickLeft = (page: any) => {
    if (currentPage <= 1) {
      setCurrentPage(1)
    } else {
      setCurrentPage(page)
    }
    getPagination(page)
  }
  const handleClickRight = (page: any) => {
    if (currentPage >= page.total_pages) {
      setCurrentPage(page.total_pages)
    } else {
      setCurrentPage(page)
    }
    getPagination(page)
  }
  const handleClickPage = (page: any) => {
    setCurrentPage(page)
    getPagination(page)
  }
  // const handleChangePage = (e, value) => {
  //   setCurrentPage(value)
  //   getPagination(value)
  // }
  return (
    <>
      <nav className='Page navigation'>
        <ul className="pagination page-box">
          {page.has_pre && (
            <li
              className={`page-item page-item-left${page.has_pre ? '' : ' disabled'}`}
              onClick={() => {
                handleClickLeft(page.current_page - 1)
              }}>
              <a className="page-link" href={pageLink}>
                <i className="bi bi-caret-left-fill"></i>
              </a>
            </li>
          )}
          {page.total_pages > 1 && [...Array(page.total_pages)].map((item, index) => (
            <li
              className="page-item" key={`item_${index}`}
              onClick={() => {
                handleClickPage(index + 1)
              }}>
              <a className={`page-link${currentPage === index + 1 ? ' active' : ''}`} href={pageLink}>{index + 1}</a>
            </li>
          ))}
          {page.has_next && (
            <li
              className={`page-item page-item-right${page.has_next ? '' : ' disabled'}`}
              onClick={() => {
                handleClickRight(page.current_page + 1)
              }}>
              <a className="page-link" href={pageLink}>
                <i className="bi bi-caret-right-fill"></i>
              </a>
            </li>
          )}
        </ul>
      </nav>
      {/* <Pagination count={page.total_pages} onChange={handleChangePage} color="primary" /> */}
    </>
  )
}
