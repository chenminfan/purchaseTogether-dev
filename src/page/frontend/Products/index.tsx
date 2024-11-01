import React, { useRef, useEffect, useState } from 'react'
import Prods from '@components/frontend/Prods'
import { getProductsApi, getProductsAllApi } from '@api/Apis/product/getProducts'
import { ProductsType } from '@typeTS/Products'
import { PaginationType } from '@typeTS/PaginationType'
import Pagination from '@components/backend/Pagination';
import './products.scss'

export default function Products() {
  const [prods, setProds] = useState<ProductsType[]>([])
  const [prodAll, setProdAll] = useState<ProductsType[]>([])
  const [page, setPage] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  })
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<string>('')
  const getProds = async (getPage = 1, category = '') => {
    const prodRes = await getProductsApi(getPage, category);
    const prodAllRes = await getProductsAllApi();
    setProds(prodRes.data.products)
    setProdAll(prodAllRes.data.products)
    setPage(prodRes.data.pagination)
  }
  const category = Array.from(new Set(prodAll.map((item) => item.category)))
  const Id = category.find((item) => item)
  useEffect(() => {
    getProds()
    isLoadingRef.current = false
    setLoadingPage(false)
  }, [])

  const handleClick = (item) => {
    if (item === 'all') {
      getProds(1, '')
    } else {
      getProds(1, item)
    }
    setCategoryId(item)
  }
  return (
    <div className="prods_page">
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav navbar-custom-scroll">
          <li className='nav-item'
            onClick={() => {
              handleClick('all')
            }}>
            <a className={`nav-link ${categoryId === 'all' ? 'active' : ''}`} role="link" aria-label="prods-link" href="#/prods" ><i className="bi bi-signpost-split-fill"></i></a>
          </li>
          {category.map((item) => (
            <li className='nav-item'
              key={item}
              onClick={() => {
                handleClick(item)
              }}>
              <a className={`nav-link ${item === (categoryId ? categoryId : Id) ? 'active' : ''}`} role="link" aria-label="prods-link" href="#/prods" >{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className='container-fluid py-2'>
        <div className="row">
          <div className="col-md-12">
            <div className="prods_box">
              {prods.map((item) => {
                return (
                  <Prods key={item.id} prod={item} isLoading={loadingPage} />
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
