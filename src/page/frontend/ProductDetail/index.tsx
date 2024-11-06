import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Stepper from '@components/frontend/Stepper'
import { getProductsIdApi, getProductsAllApi } from '@api/Apis/product/getProducts'
import { ProductsType } from '@typeTS/Products'
import Carousel from '@components/frontend/Carousel'
import Prods from '@components/frontend/Prods'
import './productDetail.scss'

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
  const getProds = async (prodId) => {
    const prodRes = await getProductsIdApi(prodId);
    const prodAllRes = await getProductsAllApi();
    setDetail(prodRes.data.product)
    setCategoryProds(prodAllRes.data.products)
  }

  useEffect(() => {
    getProds(id)
  }, [id])

  const IS_IMAGES = detail.imagesUrl?.filter((item) => item.length > 0 && item.includes('https://' || 'http://'))
  const moreProds = categoryProds.filter((item) => item.category.match(detail.category))
  console.log(detail)
  console.log(moreProds)
  const breadcrumbData = {
    HomeId: 'home',
    HomeName: 'home',
    HomeUrl: '#/',
    ProdsId: 'home',
    ProdsName: '商品分類',
    ProdsUrl: '#/prods',
  };
  return (
    <div className="detail_page">
      <div className='container-fluid py-2'>
        <div className="row align-items-center">
          <div className="col-md-7">

            <Carousel carouselName="prodCarousel"
              carouselPre={IS_IMAGES.length !== 0}
              carouselNext={IS_IMAGES.length !== 0}>
              <div className="carousel-inner h-100">
                {IS_IMAGES ? (
                  <div className="carousel-item h-100 active" data-bs-interval="5000">
                    <div className="img_box">
                      <img src={detail.imageUrl} className="d-block" alt={detail.title} />
                    </div>
                  </div>
                ) : (
                  <>
                    {detail.imagesUrl?.map((item, index) => (
                      <div className="carousel-item h-100" data-bs-interval="5000" key={`${item}_${index}`}>
                        <div className="img_box">
                          <img src={item} className="d-block" alt={detail.title} />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Carousel>



          </div>
          <div className="col-md-5">
            <div className="detail-info py-2">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb px-0 mb-0 py-3">
                  <li className="breadcrumb-item"><a className="text-muted" href={breadcrumbData.HomeUrl}><i className="bi bi-shop"></i></a></li>
                  <li className="breadcrumb-item"><a className="text-muted" href={breadcrumbData.ProdsUrl}>{breadcrumbData.ProdsName}</a></li>
                  <li className="breadcrumb-item active text-primary" aria-current="page">{detail.category}</li>
                </ol>
              </nav>
              <h2 className="fw-bold h1 my-2">{detail.title}</h2>
              <p className="mb-0 text-muted text-end"><del>NT{detail.origin_price.toLocaleString('zh-TW')}</del></p>
              <p className="h4 fw-bold text-end">NT{detail.price.toLocaleString('zh-TW')}</p>
              <div className="row align-items-center">
                <div className="col-6">
                  <Stepper />
                </div>
                <div className="col-6">
                  <a href="./checkout.html" className="text-nowrap btn btn-primary w-100 py-2"><i className="bi bi-cart-check-fill"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <p>{detail.content}</p>
          <p className="text-muted">{detail.description}</p>
        </div>
        <div className="row">
          <h3 className="fw-bold">其他 {detail.category} 的商品</h3>
          <div className="detail-carouselBox">
            <div className="carouselBox">
              {moreProds.map((more) => (
                <Prods key={more.id} prod={more} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
