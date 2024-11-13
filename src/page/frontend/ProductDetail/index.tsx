import React, { useRef, useEffect, useState, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import LazyLoadImg from "@components/hook/LazyLoadImage";
import { useParams } from 'react-router-dom'
import InputStepper from '@components/frontend/InputStepper'
import { getProductsIdApi, getProductsAllApi, postCartApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'
import Carousel from '@components/frontend/Carousel'
import Prods from '@components/frontend/Prods'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import './productDetail.scss'

type contextType = {
  checkout: () => void,
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
  const isLoadingRef = useRef(true)
  const { checkout } = useOutletContext<contextType>();
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [, dispatch] = useContext<any>(SnackbarContent);
  const [cartQty, setCartQty] = useState(1)

  const getProds = async (prodId) => {
    try {
      const prodRes = await getProductsIdApi(prodId);
      const prodAllRes = await getProductsAllApi();
      setDetail(prodRes.data.product)
      setCategoryProds(prodAllRes.data.products)
    } catch (error) {
      const errorRes = error
    }
  }

  useEffect(() => {
    getProds(id)
    isLoadingRef.current = false
    setLoadingPage(false)
  }, [id])

  const IS_IMAGES = detail.imagesUrl?.filter((item) => item.length > 0 && item.includes('https://' || 'http://'))
  const moreProds = categoryProds.filter((item) => item.category.match(detail.category))
  const breadcrumbData = {
    HomeId: 'home',
    HomeName: 'home',
    HomeUrl: '#/',
    ProdsId: 'home',
    ProdsName: '商品分類',
    ProdsUrl: '#/prods',
    // ProdsUrl: '#/prods',
  };

  const handleAddCart = async (prod, type = '') => {
    const addCart = {
      product_id: prod,
      qty: type === 'addCartMore' ? cartQty : 1,
    }
    try {
      if (type !== '') {
        const res = await postCartApi(type, addCart)
        checkout()
        handleSnackbarSuccess(dispatch, res);
      }

    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
  }
  return (
    <div className="detail_page">
      <div className='container-fluid py-2'>
        <div className="row align-items-center">
          <div className="col-md-7">
            <Carousel carouselName="prodCarousel" carouselPre={IS_IMAGES.length > 1} carouselNext={IS_IMAGES.length > 1}>
              <div className="carousel-inner h-100">
                <div className="carousel-item h-100 active" data-bs-interval="5000">
                  <div className="img_box">
                    <LazyLoadImg src={detail.imageUrl} className="d-block" alt={detail.title} />
                  </div>
                </div>
                {IS_IMAGES && (<>
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
            <div className="col-md-5">
              <div className="detail-info py-2" aria-hidden="true">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb px-0 mb-0 py-3">
                    <span className="placeholder col-7"></span>
                  </ol>
                </nav>

                <h2 className="card-title placeholder-glow">
                  <span className="placeholder col-12"></span>
                </h2>

                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
          ) : (
            <div className="col-md-5">
              <div className="detail-info py-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb px-0 mb-0 py-3">
                    <li className="breadcrumb-item"><a className="text-muted" href={breadcrumbData.HomeUrl} role="link" aria-label="breadcrumb-link"><i className="bi bi-shop"></i></a></li>
                    <li className="breadcrumb-item"><a className="text-muted" href={breadcrumbData.ProdsUrl} role="link" aria-label="breadcrumb-link">{breadcrumbData.ProdsName}</a></li>
                    <li className="breadcrumb-item active text-primary" aria-current="page">{detail.category}</li>
                  </ol>
                </nav>

                <h2 className="fw-bold h1 my-2">{detail.title}</h2>

                <p className="mb-0 text-muted text-end"><del>NT{detail.origin_price.toLocaleString('zh-TW')}</del></p>

                <p className="h4 fw-bold text-end">NT{detail.price.toLocaleString('zh-TW')}</p>

                <div className="row align-items-center">
                  <div className="col-6">
                    <InputStepper inputStepperNum={cartQty} setInputStepperNum={setCartQty} />
                  </div>
                  <div className="col-6">
                    <button type="button" className="text-nowrap btn btn-primary w-100 py-2" role="link" aria-label="cart-add-link"
                      onClick={() => {
                        handleAddCart(detail.id, 'addCartMore')
                      }}><i className="bi bi-cart-check-fill"></i>
                    </button>
                  </div>
                </div >
              </div >
            </div >
          )
          }

        </div >

        {loadingPage ? (
          <div className="row my-5" >
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        ) : (
          <div className="row my-5">
            <p>{detail.content}</p>
            <p className="text-muted">{detail.description}</p>
          </div>
        )}

        <div className="row">
          <h3 className="fw-bold">其他 {detail.category} 的商品</h3>
          <div className="detail-carouselBox">
            <div className="carouselBox">
              {moreProds.map((more) => (
                <Prods key={more.id} prod={more} isLoading={loadingPage} handleClick={() => {
                  handleAddCart(more?.id, 'addCart')
                }} />
              ))}
            </div>

          </div>
        </div>
      </div >
    </div >
  )
}
