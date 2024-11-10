import React, { useRef, useEffect, useState, useContext } from 'react'
import Prods from '@components/frontend/Prods'
import { postCartApi, getProductsApi, getProductsAllApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'
import { PaginationType } from '@typeTS/PaginationType'
import Pagination from '@components/backend/Pagination';
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
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
  const [categoryId, setCategoryId] = useState<string>('all')
  const [state, dispatch] = useContext<any>(SnackbarContent);

  const getProds = async (getPage = 1, category = '') => {
    try {
      const prodRes = await getProductsApi(getPage, category);
      const prodAllRes = await getProductsAllApi();
      setProds(prodRes.data.products)
      setProdAll(prodAllRes.data.products)
      setPage(prodRes.data.pagination)
    } catch (error) {
      const errorRes = error
      console.log(errorRes)
    }
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

  const handleAddCart = async (prod, type = '') => {
    const addCart = {
      product_id: prod,
      qty: 1,
    }
    try {
      const res = await postCartApi(type, addCart)
      handleSnackbarSuccess(dispatch, res);

    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
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
            </li >
          ))
          }
        </ul >
      </nav >

      <div className='container-fluid py-2'>
        <div className="row">
          <div className="col-md-12">
            <div className="prods_box">
              {prods.map((item) => {
                return (
                  <Prods key={item.id} prod={item} isLoading={loadingPage}
                    handleClick={() => {
                      handleAddCart(item?.id, 'addCart')
                    }} />
                )
              })}
            </div>
          </div>
        </div>

        <Pagination page={page} getPagination={getProds} pageLink="#" />
      </div>
    </div >
  )
}
