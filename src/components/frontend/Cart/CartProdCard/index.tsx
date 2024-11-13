import React, { useState, useContext, useRef, useEffect } from 'react'
import LazyLoadImg from "@components/hook/LazyLoadImage";
import InputStepper from '@components/frontend/InputStepper'
import { postCartApi } from '@api/Apis';
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import { CartCheckProdType } from '@typeTS/CartCheck'
import './cartProdCard.scss'

type Props = {
  cart;
  checkout: () => void,
  isTool?: boolean
}

export default function CartProdCard(props: Props) {
  const { cart, checkout, isTool = true } = props
  const [inputStepperNum, setInputStepperNum] = useState<number>(cart.qty)
  const [state, dispatch] = useContext<any>(SnackbarContent);
  const inputStepperValue = useRef(0)
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [inputStepperEdit, setInputStepperEdit] = useState<boolean>(false);
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
      });
    } catch (error: any) {
      handleSnackbarError(dispatch, error);
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
      handleSnackbarSuccess(dispatch, res);
    } catch (error: any) {
      isLoadingRef.current = loadingPage
      setLoadingPage(false)
      handleSnackbarError(dispatch, error);
    }
  }

  useEffect(() => {
    inputStepperValue.current = inputStepperNum
  }, [inputStepperNum])

  return (
    <div className={`checkout checkout-card ${isTool ? 'checkout-tool' : ''}`} >
      <div className="card-image">
        <button className={`btn ${track ? 'btn-primary' : 'btn-light'} card-btn btn-sm `} type="button" onClick={() => setTrack((newTrack) => !newTrack)} >
          {track ? (<i className="bi bi-bookmark-heart-fill"></i>) : (<i className="bi bi-bookmark-heart"></i>)}
        </button>
        <div className="img_box">
          <LazyLoadImg className="card-img-top" src={cart.product.imageUrl} alt={cart.product.title} />
        </div>
      </div>
      <div className="card-info">
        {isTool && <button className="btn text-primary card-btn btn-sm" type="button" onClick={() => { handleDelete(cart) }}><i className="bi bi-x-lg"></i></button>}

        <a href={`#/main/prods/detail/${cart.id}`}>
          <span className="card-title">{cart.product.title}</span>
        </a>

        <div className="card-content">
          {isTool && <div className="card-inputStepper">
            <InputStepper
              inputStepperNum={inputStepperNum}
              setInputStepperNum={setInputStepperNum}
              handleClickAdd={(addNumber) => {
                getCart(cart, addNumber)
              }}
              handleClickCut={(cutNumber) => {
                getCart(cart, cutNumber)
              }}
              isDisabled={loadingPage}
              isEdit={(cart.qty !== inputStepperNum) && inputStepperEdit}
              handleClickSubmit={(inputNumber) => {
                getCart(cart, inputNumber)
              }}
              handleInputChange={
                (e) => {
                  setInputStepperEdit(true)
                  setInputStepperNum(Number(e))
                }
              }
            />
          </div>}
          <div className="card-total">
            <div className="card-price">NT$ {cart.total.toLocaleString('zh-TW')}</div>
            {cart.final_total !== cart.total && <div className="card-price">折扣後 NT$ {cart.final_total.toLocaleString('zh-TW')}</div>}
          </div>

        </div>

      </div>
    </div>
  )
}


