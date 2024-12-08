import React, { useMemo, useRef, useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import Prods from '@components/frontend/Prods'
import NotDataState from '@components/frontend/NotDataState'
import { postCartApi, getProductsAllApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import './track.scss'

type contextType = {
  checkout: () => void,
  handleTrack?;
  trackList?: string[],
}
export default function Track() {
  const [prods, setProds] = useState<ProductsType[]>([])
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [_, dispatch] = useContext<any>(SnackbarContent);
  const { checkout, handleTrack, trackList } = useOutletContext<contextType>();

  const getProds = async () => {
    try {
      const prodRes = await getProductsAllApi();
      setProds(prodRes.data.products)
    } catch (error) {
    }
  }

  const SEARCH_DATA = useMemo(() => {
    return [...prods]
      .filter(prods => trackList?.find(track => track === prods.id))
  }, [prods, trackList])
  useEffect(() => {
    getProds()
    isLoadingRef.current = false
    setLoadingPage(false)
  }, [])

  const handleAddCart = async (prod, type = '') => {
    const addCart = {
      product_id: prod,
      qty: 1,
    }
    try {
      const res = await postCartApi(type, addCart)
      checkout();
      handleSnackbarSuccess(dispatch, res);

    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
  }

  return (
    <div className="prods_page">
      <div className='container-fluid py-2'>
        <div className="row">
          <div className="col-md-12">
            <h4 className="fw-bold p-4">追蹤商品</h4>
          </div>
          <div className="col-md-12">
            {SEARCH_DATA.length !== 0 ? (
              <div className="prods_box">
                {SEARCH_DATA.map((item) => {
                  return (
                    <Prods key={item.id} prod={item}
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
            ) : (
              <NotDataState notStateIcon="bi-bookmarks" notStateTitle="趕快來逛逛你有興趣的商品！" />
            )}
          </div>
        </div>
      </div>
      <button
        className='btn btn-primary btn-BUY-top fade'
        onClick={() => {
          window.scrollTo(0, 0)
        }}>
        <i className="bi bi-arrow-up-circle"></i>
      </button>
    </div >
  )
}
