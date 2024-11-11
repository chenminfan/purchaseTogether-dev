import React, { useState, useContext, useRef, useEffect } from 'react'
import LazyLoadImg from "@components/hook/LazyLoadImage";
import Stepper from '@components/frontend/Stepper'
import { ProductsType } from '@typeTS/Products';
import { postCartApi } from '@api/Apis';
import { DialogContent } from '@provider/DialogProvider/DialogContent'
import './checkoutCard.scss'

type Props = {
  cart: {
    id: string,
    product: ProductsType,
    qty: number,
    total: number,
    final_total: number,
  },
  checkout: () => void,
}

export default function CheckoutCard(props: Props) {
  const { cart, checkout } = props
  const [stepperNum, setStepperNum] = useState(cart.qty)
  const [state, dispatch] = useContext<any>(DialogContent);
  const stepperValue = useRef(0)
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [stepperEdit, setStepperEdit] = useState<boolean>(false);
  const [track, setTrack] = useState<boolean>(false)

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
    isLoadingRef.current = loadingPage
    setLoadingPage(true)
    try {
      const res = await postCartApi('edit', data)
      isLoadingRef.current = loadingPage
      setLoadingPage(false)
      checkout()
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          message: res.data.message,
          snackbarState: res.data.success,
        }
      })
    } catch (error: any) {
      isLoadingRef.current = loadingPage
      setLoadingPage(false)
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
    <div className="checkout checkout-card" >
      <div className="card-image">
        <button className="btn btn-primary card-btn btn-sm" type="button" onClick={() => setTrack((newTrack) => !newTrack)} >
          {track ? (<i className="bi bi-bookmark-heart-fill"></i>) : (<i className="bi bi-bookmark-heart"></i>)}
        </button>
        <div className="img_box">
          <LazyLoadImg className="card-img-top" src={cart.product.imageUrl} alt={cart.product.title} />
        </div>
      </div>
      <div className="card-info">
        <button className="btn text-primary card-btn btn-sm" type="button" onClick={() => { handleDelete(cart) }}><i className="bi bi-x-lg"></i></button>
        <div className="card-title">{cart.product.title}</div>

        <div className="card-content">
          <div className="card-stepper">
            <Stepper
              stepperNum={stepperNum}
              setStepperNum={setStepperNum}
              handleClickAdd={(addNumber) => {
                getCart(cart, addNumber)
              }}
              handleClickCut={(cutNumber) => {
                getCart(cart, cutNumber)
              }}
              isDisabled={loadingPage}
              isEdit={(cart.qty !== stepperNum) && stepperEdit}
              handleClickSubmit={(inputNumber) => {
                getCart(cart, inputNumber)
              }}
              handleInputChange={
                (e) => {
                  setStepperEdit(true)
                  setStepperNum(Number(e))
                }
              }
            />
          </div>
          <div className="card-total">
            <div className="card-price">NT$ {cart.total.toLocaleString('zh-TW')}</div>
            {cart.final_total !== cart.total && <div className="card-price">折扣後 NT$ {cart.final_total.toLocaleString('zh-TW')}</div>}
          </div>

        </div>

      </div>
    </div>
  )
}