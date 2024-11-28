import React, { useState, useContext, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useOutletContext, useNavigate } from 'react-router-dom'
import CartStep from '@components/frontend/CartStep';
import CartProdCard from '@components/frontend/Cart/CartProdCard';
import TextArea from '@components/frontend/InputFrom/TextArea';
import Input from '@components/frontend/InputFrom/Input';
import Checkbox from '@components/frontend/InputFrom/Checkbox';
import { LoginContext } from '@provider/LoginProvider/LoginContext'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import { ProductsType } from '@typeTS/Products';
import { postOrdersApi } from '@api/Apis';
import './checkoutInfo.scss';


type CartCheckoutItemType = {
  final_total: number,
  id: string,
  product: ProductsType,
  qty: number,
  total: number
}
type CartCheckoutType = {
  checkout: () => void,
  cartData: {
    id: string,
    carts: CartCheckoutItemType[],
    final_total: number,
    total: number
  }
  cartStep: number,
  setCartStep: (number) => void,
}

export default function CartCheckoutInfo() {
  const { user, token } = useContext<any>(LoginContext)
  const navigate = useNavigate()
  const { cartData, checkout, cartStep, setCartStep } = useOutletContext<CartCheckoutType>();
  const cardInfo = cartData.carts.filter((item) => item)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [state, dispatch] = useContext<any>(SnackbarContent);
  const [check, setCheck] = useState('');
  const handleFormSubmit = handleSubmit(async (data) => {
    const { name, tel, email, address, message } = data;
    const dataFrom = {
      user: {
        name: user.displayName === null ? `${name}+ ${user.uid}` : `${user.displayName}+ ${user.uid}`,
        email: user.email === null ? email : user.email,
        tel: user.phoneNumber === null ? tel : user.phoneNumber,
        address
      },
      message: message,
    }
    try {
      const res = await postOrdersApi(dataFrom)
      setTimeout(() => {
        navigate(`/main/cart/pay/${res.data.orderId}`)
        setCartStep(2)
      }, 1500)
      handleSnackbarSuccess(dispatch, res);

    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
  })
  useEffect(() => {
    setCartStep(1)
    if ((token === '' || token === undefined) && user === null) {
      navigate('/main/memberLogin')
    }
    window.scrollTo(0, 0)
  }, [user, token])
  return (
    <div className="cart_page">
      <div className='container-fluid py-2'>
        <div className="row">
          <CartStep active={cartStep} />
        </div>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="checkout-from p-3">
              <form action="" onSubmit={handleFormSubmit}>
                <h4 className="fw-bold mb-4">結帳資訊</h4>
                <div className="checkout-body">
                  {user !== null && (
                    <>{user.displayName ? (
                      <Input id="name" labelText="聯絡人" type="text" value={user.displayName} disabled={user.displayName !== null} />) : (<Input
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
                      {user.email ? (<Input id="email" labelText="Email" type="text" value={user.email} disabled={user.email !== null} />) : (<Input register={register} errors={errors} id="email" labelText="Email" type="text" rules={{
                        required: {
                          value: true,
                          message: '請輸入 Email'
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email 格式不正確'
                        }
                      }} />)}
                      {user.phoneNumber ? (<Input id="tel" labelText="聯絡電話" type="tel" value={user.phoneNumber} disabled={user.phoneNumber !== null} />) : (<Input register={register} errors={errors} id="tel" labelText="聯絡電話" type="tel" rules={{
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
                    </>)}

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
                    checkboxText="請同意 隱私權"
                    required
                    name="checkbox"
                    type='checkbox' register={register} errors={errors} handleClick={e => setCheck(e.target.value)} value={check} rules={{ required: { value: true, message: '請同意隱私權' } }} />
                </div>
                <div className="checkout-footer">
                  <div className="d-grid gap-2">
                    <button type='submit' className='btn btn-primary' onClick={() => {
                      setCartStep(2)
                    }}>
                      送出填寫資訊
                    </button>
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
      </div>
    </div>
  )
}