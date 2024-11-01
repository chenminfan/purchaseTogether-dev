import React, { useEffect, useState } from 'react'
import Prods from '@components/frontend/Prods'
import { getProductsApi, getProductsAllApi } from '@api/Apis/product/getProducts'
import { FrontendProductsType } from '@typeTS/frontend/FProducts'
import { PaginationType } from '@typeTS/PaginationType'
import Pagination from '@components/backend/Pagination';
import './products.scss'

export default function Products() {
  const [prods, setProds] = useState<FrontendProductsType[]>([])
  const [prodAll, setProdAll] = useState<FrontendProductsType[]>([])
  const [page, setPage] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  })
  const getProds = async (getPage = 1, category = '') => {
    const prodRes = await getProductsApi(getPage, category);
    const prodAllRes = await getProductsAllApi();
    setProds(prodRes.data.products)
    setProdAll(prodAllRes.data.products)
    setPage(prodRes.data.pagination)

  }
  const category = Array.from(new Set(prodAll.map((item) => item.category)))
  useEffect(() => {
    getProds()
  }, [])
  return (
    <div className="prods_page">
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav navbar-custom-scroll">
          {category.map((item) => (
            <li className="nav-item" onClick={() => {
              getProds(1, item)
            }}>
              <a className="nav-link active" aria-current="page" href="#">{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className='container-fluid px-2'>
        <div className="row">
          <div className="col">
            <div className="prods_box">
              {prods.map((item) => {
                return (
                  <Prods key={item.id} prod={item} />
                )
              })}
            </div>
          </div>
        </div>


        <Pagination page={page} getPagination={getProds} pageLink="#" />
      </div>

    </div>
  )
}
