import React, { useRef, useState, useContext, useEffect } from 'react'
import { User, getAuth } from "firebase/auth";
import { useForm } from "react-hook-form"
import { useOutletContext, useNavigate } from 'react-router-dom'
import CartStep from '@components/frontend/CartStep';
import CartProdCard from '@components/frontend/Cart/CartProdCard';
import TextArea from '@components/frontend/InputFrom/TextArea';
import Tooltip from '@components/frontend/Tooltip';
import Input from '@components/frontend/InputFrom/Input';
import Checkbox from '@components/frontend/InputFrom/Checkbox';
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import { ProductsType } from '@typeTS/Products';
import { postOrdersApi } from '@api/Apis';
import './checkoutInfo.scss';
import { CartCheckProdType } from '@typeTS/CartCheck'

type CartCheckoutType = {
  AUTH_STATE: User | null,
  loggedIn: boolean,
  checkout: () => void,
  cartData: {
    id: string,
    carts: CartCheckProdType[],
    final_total: number,
    total: number,

  }
  cartStep: number,
  setCartStep: (number) => void,
}

export default function CartCheckoutInfo() {
  const { USER_MEMBER, USER_TOKEN } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const { loggedIn, cartData, checkout, cartStep, setCartStep } = useOutletContext<CartCheckoutType>();
  const cardInfo = cartData.carts.filter((item) => item)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [_, dispatch] = useContext<any>(SnackbarContent);
  const [check, setCheck] = useState('');
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const handleFormSubmit = handleSubmit(async (data) => {
    isLoadingRef.current = loadingPage
    setLoadingPage(true)
    const { name, tel, email, address, message } = data;
    const dataFrom = {
      user: {
        name: USER_MEMBER.displayName === null ? `${name}+ ${USER_MEMBER.uid}` : `${USER_MEMBER.displayName}+ ${USER_MEMBER.uid}`,
        email: USER_MEMBER.email === null ? email : USER_MEMBER.email,
        tel: USER_MEMBER.phoneNumber === null ? tel : USER_MEMBER.phoneNumber,
        address
      },
      message: message,
    }
    try {
      const res = await postOrdersApi(dataFrom)

      isLoadingRef.current = false
      setLoadingPage(false)
      setTimeout(() => {
        navigate(`/main/cart/pay/${res.data.orderId}`)
        setCartStep(2)

      }, 1500)
      handleSnackbarSuccess(dispatch, res);
      checkout()
    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
  })

  useEffect(() => {
    if (loggedIn && USER_TOKEN !== '') {
      window.scrollTo(0, 0)
    }
    setCartStep(1)
  }, [loggedIn])


  return (
    <div className="cart_page">
      <div className='container-xl py-2 px-5'>
        <div className="row">
          <CartStep active={cartStep} />
        </div>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="checkout-from p-3">
              <form action="" onSubmit={handleFormSubmit}>
                <h4 className="fw-bold mb-4">結帳資訊</h4>
                <div className="checkout-body">
                  {getAuth().currentUser && (
                    <>{USER_MEMBER.displayName ? (
                      <Input id="name" labelText="聯絡人" type="text" value={USER_MEMBER.displayName} disabled={USER_MEMBER.displayName !== null} />) : (<Input
                        register={register} errors={errors} id="name" labelText="聯絡人" type="text" rules={{
                          required: {
                            value: true,
                            message: '請輸入 聯絡人'
                          },
                          maxLength: {
                            value: 10,
                            message: '聯絡人名稱不超過10個字長'
                          }
                        }} />)}
                      {USER_MEMBER.email ? (<Input id="email" labelText="Email" type="text" value={USER_MEMBER.email} disabled={USER_MEMBER.email !== null} />) : (<Input register={register} errors={errors} id="email" labelText="Email" type="text" rules={{
                        required: {
                          value: true,
                          message: '請輸入 Email'
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email 格式不正確'
                        }
                      }} />)}
                      {USER_MEMBER.phoneNumber ? (<Input id="tel" labelText="聯絡電話" type="tel" value={USER_MEMBER.phoneNumber} disabled={USER_MEMBER.phoneNumber !== null} />) : (<Input register={register} errors={errors} id="tel" labelText="聯絡電話" type="tel" rules={{
                        required: {
                          value: true,
                          message: '請輸入 聯絡電話'
                        },
                        minLength: {
                          value: 6,
                          message: '電話不少於 6 碼',
                        },
                        maxLength: {
                          value: 12,
                          message: '電話不大於 12 碼',
                        }
                      }} />)}
                    </>
                  )}

                  <Input register={register} errors={errors} id="address" labelText="聯繫地址" type="address"
                    rules={{
                      required: {
                        value: true,
                        message: '請輸入 聯繫地址'
                      }
                    }} />
                  <TextArea register={register} errors={errors} id="message" rows={5} labelText="我要跟你說..." />
                  <Checkbox
                    id="checkbox"
                    checkboxText="請同意"
                    required
                    name="checkbox"
                    type='checkbox' register={register} errors={errors} handleClick={e => setCheck(e.target.value)} value={check} rules={{ required: { value: true, message: '請同意隱私權' } }} >
                    <Tooltip text="請確認您的權益">
                      <a href="#" data-bs-toggle="modal" data-bs-target="#checkModal">隱私權</a>
                    </Tooltip>

                  </Checkbox>

                  <div className="modal fade" id="checkModal" tabIndex={-1} aria-labelledby="checkModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="checkModalLabel">隱私權</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                          </button>
                        </div>
                        <div className="modal-body">
                          行銷隱私權是指在行銷過程中，保護消費者的個人隱私和數據安全。這包括以下幾個方面：
                          <ol className='list-group list-group-numbered m-3'>
                            <li className='list-group-item'>資訊收集：本公司在收集消費者個人信息時，必須明確告知其用途，並取得消費者的同意。</li>
                            <li className='list-group-item'>資訊使用：本公司只能在取得消費者同意的範圍內使用其個人信息，不得逾越合法範圍。</li>
                            <li className='list-group-item'>資訊保護：本公司必須採取合理的安全措施，確保個人信息的安全，防止未經授權的訪問或洩漏。</li>
                            <li className='list-group-item'>資訊權益：消費者有權要求查閱、更正或刪除其個人信息，並有權對本公司的資訊處理行為提出異議。
                            </li>
                          </ol>
                          確保消費者的隱私權和數據安全，同時也增強了消費者對本公司的信任。
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout-footer">
                  <div className="d-grid gap-2">
                    <Tooltip text="請再次確認您的填寫資訊">
                      <button type='submit' className='btn btn-primary' onClick={() => {
                        setCartStep(2)
                      }} disabled={loadingPage}>
                        {loadingPage ? (
                          <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span className="ms-2" role="status">Loading...送出填寫資訊中！</span>
                          </>
                        ) : "送出填寫資訊"}
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 col-md">
            <div className="checkout-list p-3">
              <h4 className="fw-bold">結帳明細</h4>
              <div className="checkout-body">

                <div className="checkout-info-card">
                  {cardInfo.map((cart) => (
                    <CartProdCard
                      key={`cart${cart.id}`}
                      cart={cart}
                      checkout={checkout}
                      isTool={false}
                    />
                  ))}
                </div>
                <div className="checkout-item">
                  <div className="checkout-title">原價小計</div>
                  <div className="checkout-content">NT$ {cartData.total.toLocaleString('zh-TW')}</div>
                </div>
                {/* <div className="checkout-item">
                  <div className="checkout-title">支付方式</div>
                  <div className="checkout-content"></div>
                </div> */}
              </div>
              <div className="checkout-footer">
                <div className="checkout-item checkout-item-total">
                  <div className="checkout-title">Total</div>
                  <div className="checkout-content">NT ${Math.round(cartData.final_total).toLocaleString('zh-TW')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}