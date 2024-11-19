import React, { useMemo, useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useScreen } from '@api/utilities/useScreen'
import LazyLoadImg from "@components/hook/LazyLoadImage";
import Input from '@components/frontend/InputFrom/Input';
import { getProductsAllApi } from '@api/Apis'
import { ProductsType } from '@typeTS/Products'

import './home.scss'

const Home = () => {
  const boxImageText = [{
    title: '你是最好的品牌嗎？你是最好的..？....',
    text: '各大品牌，各大商品，歡迎與我們一起攜手共同推廣，開箱嚴格評比，給你最棒的商品，啾咪。 ',
    imageUrl: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title2: '良心好貨Ｘ實惠好物Ｘ資訊安全',
    text2: '良心商品，實質又優惠，除了商品安全品質外，我們高度重視你我資訊交易安全，致力於保護消費者資訊，持續提升資訊防護，加強提醒，保護你我每一人',
    imageUrl2: "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }]
  const [prod, setProd] = useState<ProductsType[]>([])
  const [couponData, setCouponData] = useState('Buy together Buy');
  const [isShow, setIsShow] = useState(false);

  const getData = async () => {
    try {
      const prodRes = await getProductsAllApi();
      setProd(prodRes.data.products)
    } catch (error) {
    }
  }
  const {
    register,
    formState: { errors },
  } = useForm()
  const [windowHeight]: number[] = useScreen();

  const handleCopy = () => {
    navigator.clipboard.writeText(couponData)
    setIsShow((show) => !show)
  }
  const PROD_RANDOM = useMemo(() => {
    return [...prod]
      .sort(() => {
        return 0.5 - Math.random();
      })
      .slice(0, 6);
  }, [prod])
  const [sortOrder, setSortOrder] = useState<boolean>(true);
  const PROD_SORT = prod.filter((product) => {
    return product.id;
  })
    .sort((a: any, b: any) => { return sortOrder ? a.id - b.id : b - a.id });

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='home_page'>
      <section className={`home-section is-show`}>
        <div className="home-group">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="home-box">
                  <div className="box col-md-6 col-sm-12">
                    <h2>
                      <div className="box-title">
                        最高優惠/ 快速送達/ 回饋大放送
                      </div>
                    </h2>
                    <div className="box-content">
                      <p>基本回饋3％，點數無上限，最高回饋21%，購物站內筆筆享最高1%，購物站外折扣天天送折價券</p>
                      <p>限時到達，立即下單～立即送到</p>
                      <p>～品牌加碼無上限～</p>

                    </div>
                    <div className="box-btn">
                      <a href='#/main/prods' type="button" className="text-nowrap btn btn-primary py-2" role="link" aria-label="box-link">
                        立即購買
                      </a>
                    </div>
                  </div>
                </div>
                <div className="home-slide">
                  {PROD_SORT.map((prod) => (
                    <div className="home-slide-item" key={`image_${prod.id}`}>
                      <div className="box-image">
                        <div className="img_box">
                          <LazyLoadImg className="" src={prod.imageUrl} alt={prod.title} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`home-section ${windowHeight > 350 ? 'is-show' : ''}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="home-list">

                {PROD_RANDOM.map((prod) => (
                  <div className="home-item" key={`home_text${prod.title}`}>
                    <div className="box">
                      <div className="box-image">
                        <div className="img_box">
                          <LazyLoadImg className="" src={prod.imageUrl} alt={prod.title} />
                        </div>
                      </div>
                      <h3><a href={`#/main/prods/detail/${prod.id}`}>
                        <div className="box-title">
                          {prod.title}
                        </div>
                      </a></h3>
                      <div className="box-content">{prod.content}</div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`home-section home-section-color ${windowHeight > 1290 ? 'is-show' : ''}`}>
        <div className="home-box bg-body-secondary">
          <div className="box col-md-6 col-sm-12">
            <h4>
              <div className="box-title">
                優惠碼大放送
              </div>
            </h4>
            <div className="box-content">
              <div className="coupons">
                <div className="coupons-image"><div className="img_box"><LazyLoadImg className="" src="https://images.unsplash.com/photo-1651439372230-6a8f1c2aa597?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="code" /></div></div>
                <div className="coupons-text">
                  <div className="box-input">
                    <Input
                      register={register} errors={errors} id="code" labelText="" type="text" value={couponData} />
                    <button type='button' className='btn btn-primary' onClick={() => { handleCopy() }}>
                      複製
                    </button>
                    <div className={`box-input-icon border-success text-opacity-75 bg-success-subtle text-success-emphasis fade ${isShow ? 'is-show' : ''}`}><i className="bi bi-check2-circle"></i>已複製</div>
                  </div>

                  <p>直接key 直接折抵，無時效，請盡情購物</p>
                </div>
              </div>
            </div>
            <div className="home-subContent">折價券進行消費折抵，以本購物站系統為準，保留隨時變更，修改，終止等條款內容之權利</div>
          </div>
        </div>
      </section>
      <section className={`home-section home-section-imgBox ${windowHeight > 1900 ? 'is-show' : ''}`}>
        {boxImageText.map((info, index) => (
          <div className="container-fluid" key={`home_${index}`}>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="home-box home-imgBox">
                  <div className="box col-10">
                    <h4>
                      <div className="box-title">
                        {info.title2}
                      </div>
                    </h4>
                    <div className="box-content">{info.text2}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="img_box"><LazyLoadImg className="" src={info.imageUrl2} alt={info.title2} /></div>
              </div >
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="img_box"><LazyLoadImg className="" src={info.imageUrl} alt={info.title} /></div>
              </div >
              <div className="col-md-6 col-sm-12">
                <div className="home-box home-imgBox">
                  <div className="box col-10">
                    <h4>
                      <div className="box-title">
                        {info.title}
                      </div>
                    </h4>
                    <div className="box-content">{info.text}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className={`home-section home-section-color ${windowHeight > 2500 ? 'is-show' : ''}`}>
        <div className="home-box bg-body-secondary">
          <div className="box col-10">
            <h4>
              <div className="box-title">
                與我們聯絡
              </div>
            </h4>
            <div className="box-content">
              為消費者提供互動化，個性化的購物體驗，或許相關度高的商品消息，作伙買，作伙Buy，共享美好生活。誠摯歡迎各界廠商跨領域合作，凡行銷活動、商品贊助、廣告互惠，歡迎洽談～
            </div>
            <div className="home-subContent">
              本公司提供多樣化的商品及服務，滿足消費者，為商家提供銷售平台，不定期推出相關促銷活動。
            </div>
            <div className="box-input">
              <Input
                register={register} errors={errors} id="email" labelText="" type="email" placeholder="您的信箱" />
              <button type='button' className='btn btn-primary'>
                訂閱
              </button>
            </div>

          </div>
        </div>
      </section>
      <button
        className='btn btn-primary btn-BUY-top'
        onClick={() => {
          window.scrollTo(0, 0)
        }}>
        <i className="bi bi-arrow-up-circle"></i>
      </button>
    </div >
  );
}

export default Home;