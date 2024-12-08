import React, { useMemo, useRef, useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import Prods from '@components/frontend/Prods'
import NotDataState from '@components/frontend/NotDataState'
import { postCartApi, getProductsAllApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import LoadingState from '@components/frontend/LoadingState';
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
  const isLoadingAPI_Ref = useRef(true)
  const [loadingAPI, setLoadingAPI] = useState<boolean>(false);
  const [_, dispatch] = useContext<any>(SnackbarContent);
  const { checkout, handleTrack, trackList } = useOutletContext<contextType>();

  const getProds = async () => {
    isLoadingRef.current = true
    setLoadingPage(true)
    try {
      const prodRes = await getProductsAllApi();
      setProds(prodRes.data.products)
      isLoadingRef.current = false
      setLoadingPage(false)
    } catch (error) {
    }
  }

  const SEARCH_DATA = useMemo(() => {
    return [...prods]
      .filter(prods => trackList?.find(track => track === prods.id))
  }, [prods, trackList])
  useEffect(() => {
    getProds()

  }, [])

  const handleAddCart = async (prod, type = '') => {
    const addCart = {
      product_id: prod,
      qty: 1,
    }
    isLoadingAPI_Ref.current = loadingAPI
    setLoadingAPI(true)
    try {
      const res = await postCartApi(type, addCart)
      isLoadingAPI_Ref.current = false
      setLoadingAPI(false)
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
            {loadingPage ? (<LoadingState loadingStateTitle="追蹤太多喜愛的商品了，讓我追追追追追!" loadingStateIcon="bi-bag-heart" />) :
              (<>
                {SEARCH_DATA.length !== 0 ? (
                  <div className="prods_box">
                    {SEARCH_DATA.map((item) => {
                      return (
                        <Prods key={item.id} prod={item}
                          isLoadingPage={loadingPage}
                          isLoading={loadingAPI}
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
              </>)
            }

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
