import React, { useRef, useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import Prods from '@components/frontend/Prods'
import { postCartApi, getProductsApi, getProductsAllApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'
import { PaginationType } from '@typeTS/PaginationType'
import Pagination from '@components/backend/Pagination';
import Loading from '@components/frontend/Loading';
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import './products.scss'

type contextType = {
  checkout: () => void,
  handleTrack?;
  trackList?: string[],
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
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const [_, dispatch] = useContext<any>(SnackbarContent);
  const { checkout, handleTrack, trackList } = useOutletContext<contextType>();

  const getProds = async (getPage = 1, category = '') => {
    isLoadingRef.current = loadingPage
    setLoadingPage(true)
    try {
      const prodRes = await getProductsApi(getPage, category);
      const prodAllRes = await getProductsAllApi();
      if (category === '') {
        setProds(prodRes.data.products.sort(() => {
          return 0.5 - Math.random();
        }))
        isLoadingRef.current = false
        setLoadingPage(false)
        setProdAll(prodAllRes.data.products)
      } else {
        isLoadingRef.current = false
        setLoadingPage(false)
        setProds(prodRes.data.products)
        setProdAll(prodAllRes.data.products)
      }

      setPage(prodRes.data.pagination)
    } catch (error) {
      const errorRes = error
    }
  }

  const category = Array.from(new Set(prodAll.map((item) => item.category)))

  useEffect(() => {
    getProds()
  }, [])

  const handleClick = (item) => {
    if (item === 'all') {
      getProds(1, '')
    } else {
      getProds(1, item)
    }
    setCurrentCategory(item)
  }

  const handleAddCart = async (prod, type = '') => {
    const addCart = {
      product_id: prod,
      qty: 1,
    }
    isLoadingRef.current = loadingPage
    setLoadingPage(true)
    try {
      const res = await postCartApi(type, addCart)
      isLoadingRef.current = false
      setLoadingPage(false)
      checkout();
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
            <a className={`nav-link ${currentCategory === 'all' ? 'active' : ''}`} role="link" aria-label="prods-link" href="#/main/prods" ><i className="bi bi-signpost-split-fill"></i></a>
          </li>
          {category.map((item) => (
            <li className='nav-item'
              key={item}
              onClick={() => {
                handleClick(item)
              }}>
              <a className={`nav-link ${item === currentCategory ? 'active' : ''}`} role="link" aria-label="prods-link" href="#/main/prods" >{item}</a>
            </li >
          ))
          }
        </ul >
      </nav >

      {loadingPage ? (<Loading loadingTitle="太多商品了....你等等呀！" loadingIcon="bi-box2-heart" />) : (<div className='container-xl py-2'>
        <div className="row">
          <div className="col-md-12">
            <div className="prods_box">
              {prods.map((item) => {
                return (
                  <Prods key={item.id} prod={item}
                    isLoadingPage={loadingPage}
                    isLoading={loadingPage}
                    handleTrack={handleTrack}
                    trackList={trackList}
                    handleClick={() => {
                      handleAddCart(item?.id, 'addCart')
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <Pagination page={page} getPagination={getProds} pageLink="#/main/prods" />
      </div>)}
    </div >
  )
}
