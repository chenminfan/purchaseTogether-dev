import React, { useRef, useEffect, useState, useContext } from 'react'
import Prods from '@components/frontend/Prods'
import { postCartApi, getProductsApi, getProductsAllApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'
import { PaginationType } from '@typeTS/PaginationType'
import Pagination from '@components/backend/Pagination';
import { CartContent } from '@provider/CartProvider/CartContent'
import './products.scss'
type cartDataType = {
  product_id: string,
  qty: number,
}
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
  const [state, dispatch] = useContext<any>(CartContent);
  const [toasts, setToasts] = useState<string>('')

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

  const handleAddCart = (prod) => {
    dispatch({
      type: 'ADD_CART',
      product_id: prod
    })
  }
  const getCart = async (type = '', data = {}) => {
    if (type !== '') {
      const res = await postCartApi(type, data)
      setToasts(res.data.message)
    }

    console.log(type)
    console.log(data)
  }
  useEffect(() => {
    getCart(state.cartType, state.data)
  }, [state.cartType, state.data])
  console.log(state)
  return (
    <div className="prods_page">
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav navbar-custom-scroll">
          <li className='nav-item'
            onClick={() => {
              handleClick('all')
            }}>
            <a className={`nav-link ${categoryId === 'all' ? 'active' : ''}`} role="link" aria-label="prods-link" href="#/prods" >全部</a>
          </li>
          {category.map((item, index) => (
            <li className='nav-item'
              key={item}
              onClick={() => {
                handleClick(item)
              }}>
              <a className={`nav-link ${item === categoryId ? 'active' : ''}`} role="link" aria-label="prods-link" href="#/prods" >{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className='container-fluid py-2'>
        <div className="row">
          <div className="col-md-12">
            {state.product_id}
            <div className="prods_box">
              {prods.map((item) => {
                return (
                  <Prods key={item.id} prod={item} isLoading={loadingPage} handleClick={() => {
                    handleAddCart(item?.id)
                  }} />
                )
              })}
            </div>
          </div>
        </div>

        <Pagination page={page} getPagination={getProds} pageLink="#/prods" />
      </div>
      <div className={`toast text-bg-primary position-fixed bottom-0 end-0 p-1 ${toasts !== '' ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">{toasts}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  )
}
