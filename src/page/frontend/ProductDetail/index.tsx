import React, { useRef, useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import LazyLoadImg from "@components/common/LazyLoadImage";
import { useParams } from 'react-router-dom'
import InputStepper from '@components/frontend/InputStepper'
import { getProductsIdApi, getProductsAllApi, postCartApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'
import Carousel from '@components/frontend/Carousel'
import Prods from '@components/frontend/Prods'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import HtmlContent from '@components/frontend/common/HtmlContent'
import './productDetail.scss'

type contextType = {
  checkout: () => void,
  handleTrack?;
  trackList?: string[],
}
export default function ProductDetail() {
  const { id } = useParams();
  const [categoryProds, setCategoryProds] = useState<ProductsType[]>([])
  const [detail, setDetail] = useState<ProductsType>({
    id: '',
    title: '',
    category: '',
    content: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    is_enabled: 0,
    imageUrl: '',
    imagesUrl: [],
  })
  const { checkout, handleTrack, trackList } = useOutletContext<contextType>();
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const isLoadingAPI_Ref = useRef(true)
  const [loadingAPI, setLoadingAPI] = useState<boolean>(false);
  const [_, dispatch] = useContext<any>(SnackbarContent);
  const [cartQty, setCartQty] = useState(1)

  const getProds = async (prodId) => {
    isLoadingRef.current = true
    setLoadingPage(true)
    try {
      const prodRes = await getProductsIdApi(prodId);
      const prodAllRes = await getProductsAllApi();
      setDetail(prodRes.data.product)
      setCategoryProds(prodAllRes.data.products)
      isLoadingRef.current = false
      setLoadingPage(false)
    } catch (error) {
      const errorRes = error
    }
  }

  useEffect(() => {
    getProds(id)

    window.scrollTo(0, 0)
  }, [id])

  const IS_IMAGES = detail.imagesUrl?.filter((item) => item.length > 0 && (item.includes('https://') || item.includes('http://')))
  const moreProds = categoryProds.filter((item) => item.category.match(detail.category))

  const BREADCRUMB_DATA = {
    HomeId: 'home',
    HomeName: 'home',
    HomeUrl: '#/',
    ProdsId: 'home',
    ProdsName: '商品分類',
    ProdsUrl: '#/main/prods',
    // ProdsUrl: '#/prods',
  };

  const handleAddCart = async (prod, type = '') => {

    const addCart = {
      product_id: prod,
      qty: type === 'addCartMore' ? cartQty : 1,
    }
    isLoadingAPI_Ref.current = loadingAPI
    setLoadingAPI(true)
    try {
      if (type !== '') {
        const res = await postCartApi(type, addCart)
        isLoadingAPI_Ref.current = false
        setLoadingAPI(false)
        checkout()
        handleSnackbarSuccess(dispatch, res);
      }

    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
  }

  const trackID = trackList?.find((item) => item.match(detail.id))

  return (
    <div className="detail_page">
      <div className='container-fluid'>
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb" className='detail-breadcrumb'>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a className="text-muted" href={BREADCRUMB_DATA.HomeUrl} role="link" aria-label="breadcrumb-link"><i className="bi bi-shop"></i></a></li>
                <li className="breadcrumb-item"><a className="text-muted" href={BREADCRUMB_DATA.ProdsUrl} role="link" aria-label="breadcrumb-link">{BREADCRUMB_DATA.ProdsName}</a></li>
                <li className="breadcrumb-item active text-primary" aria-current="page">{detail.category}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col-md-6">
            <Carousel carouselName="prodCarousel" carouselPre={IS_IMAGES.length > 1} carouselNext={IS_IMAGES.length > 1}>
              <div className="carousel-inner h-100">
                <div className="carousel-item h-100 active" data-bs-interval="5000">
                  <div className="img_box">
                    <LazyLoadImg src={detail.imageUrl} className="d-block" alt={detail.title} />
                  </div>
                </div>
                {IS_IMAGES.length > 1 && (<>
                  {detail.imagesUrl?.map((item, index) => (
                    <div className="carousel-item h-100" data-bs-interval="5000" key={`${item}_${index}`}>
                      <div className="img_box">
                        <LazyLoadImg src={item} className="d-block" alt={detail.title} />
                      </div>
                    </div>
                  ))}
                </>)}
              </div>
            </Carousel>

          </div>
          {loadingPage ? (
            <div className="col-md-6">
              <div className="detail-info py-2 px-4" aria-hidden="true">
                <h2 className="card-title placeholder-glow">
                  <span className="placeholder col-12"></span>
                </h2>

                <div className="row my-2" >
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>

                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>

                <p className="card-text placeholder-glow text-end">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-6"></span>
                </p>

                <div className="card-text placeholder-glow d-flex justify-content-between">
                  <span className="placeholder col-4 rounded-3"></span>
                  <div>
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span className='ms-2' role="status">Loading...</span>
                    </button>
                    <button className="btn btn-outline-primary ms-2" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-6">
              <div className="detail-info py-2">
                <h2 className="fw-bold h1">{detail.title}</h2>
                <div className="row my-2">
                  <p>{detail.content}</p>
                  {/* <p className="text-muted">{detail.description}</p> */}
                  <HtmlContent className='detail-textInfo' htmlString={detail.description} />
                </div>
                <div className="row align-items-center">

                  <div className="col-12">
                    <p className="mb-0 text-muted text-end"><del>NT{detail.origin_price.toLocaleString('zh-TW')}</del></p>

                    <p className="h4 fw-bold text-end">NT{detail.price.toLocaleString('zh-TW')}</p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-6">
                    <InputStepper inputStepperNum={cartQty} setInputStepperNum={setCartQty} />
                  </div>
                  <div className="col-6">
                    <div className="detail-tool">
                      <button type="button" className="text-nowrap btn btn-primary w-100 py-2" role="link" aria-label="cart-add-link"
                        onClick={() => {
                          handleAddCart(detail.id, 'addCartMore')
                        }}><i className="bi bi-cart-check-fill"></i>
                      </button>
                      <button className={`btn ${trackID === detail.id ? 'btn-primary' : 'btn-outline-primary'} `} type="button" onClick={() => {
                        handleTrack(detail.id)
                      }} >
                        {trackID === detail.id ? (<i className="bi bi-bookmark-heart-fill"></i>) : (<i className="bi bi-bookmark-heart"></i>)}
                      </button>
                    </div>

                  </div>
                </div >
              </div >
            </div >
          )
          }

        </div >

        <div className="row">

        </div>
      </div >
      <h3 className="fw-bold">其他 {detail.category} 的商品</h3>
      <div className="detail-carouselBox">
        <div className="carouselBox">
          {moreProds.map((more) => (
            <Prods key={more.id} prod={more}
              isLoadingPage={loadingPage}
              isLoading={loadingAPI}
              handleClick={() => {
                handleAddCart(more?.id, 'addCart')
              }}
              handleTrack={handleTrack}
              trackList={trackList}
            />
          ))}
        </div>
      </div>
    </div >
  )
}
