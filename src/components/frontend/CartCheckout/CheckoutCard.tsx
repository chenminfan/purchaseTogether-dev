import React, { useState, useContext, useRef, useEffect } from 'react'
import LazyLoadImg from "@components/hook/LazyLoadImage";
import Stepper from '@components/frontend/Stepper'
import { ProductsType } from '@typeTS/Products';
import { postCartApi } from '@api/Apis';
import { DialogContent } from '@provider/DialogProvider/DialogContent'

type Props = {
  cart: {
    final_total: number,
    id: string,
    product: ProductsType,
    qty: number,
    total: number
  },
  isSuccess: boolean,
  checkout: () => void,
}

export default function CheckoutCard(props: Props) {
  const { cart, isSuccess, checkout } = props
  const [stepperNum, setStepperNum] = useState(cart.qty)
  const [state, dispatch] = useContext<any>(DialogContent);
  const stepperValue = useRef(0)


  const handleDelete = async (cartData) => {
    try {
      const res = await postCartApi('delete', cartData)
      checkout()
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          message: res.data.message,
          snackbarState: res.data.success,
        }
      })
    } catch (error: any) {
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          message: error?.response?.data?.message,
          snackbarState: error?.response?.data?.success,
        }
      })
    }
  }
  const getCart = async (cart, qty) => {
    const data = {
      id: cart.id,
      product_id: cart.product.id,
      qty: qty,
    }
    try {
      const res = await postCartApi('edit', data)
      checkout()
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          message: res.data.message,
          snackbarState: res.data.success,
        }
      })
    } catch (error: any) {
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          message: error?.response?.data?.message,
          snackbarState: error?.response?.data?.success,
        }
      })
    }
  }

  useEffect(() => {
    stepperValue.current = stepperNum
  }, [stepperNum])
  return (
    <div className="checkout-card" >
      <div className="checkout-image">
        <button className="btn btn-primary checkout-btn btn-sm" type="button">
          {isSuccess ? (<i className="bi bi-bookmark-heart-fill"></i>) : (<i className="bi bi-bookmark-heart"></i>)}
        </button>
        <div className="img_box">
          <LazyLoadImg className="card-img-top" src={cart.product.imageUrl} alt={cart.product.title} />
        </div>
      </div>
      <div className="checkout-info">
        <button className="btn text-primary checkout-btn btn-sm" type="button" onClick={() => { handleDelete(cart) }}><i className="bi bi-x-lg"></i></button>
        <div className="checkout-title">{cart.product.title}</div>

        <div className="checkout-content">
          <div className="checkout-stepper">
            <Stepper
              stepperNum={stepperNum}
              setStepperNum={setStepperNum}
              handleClickAdd={(addNumber) => {
                getCart(cart, addNumber)
              }}
              handleClickCut={(cutNumber) => {
                getCart(cart, cutNumber)
              }}
            />
          </div>
          <div className="checkout-price">NT$ {cart.total.toLocaleString('zh-TW')}</div>
        </div>

      </div>
    </div>
  )
}