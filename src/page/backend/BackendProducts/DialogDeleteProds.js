
import React, { useContext } from 'react'
import Dialog from '../../../components/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendProductsApi
} from '../../../data/Apis'
import { DialogContent } from '../../../provider/DialogProvider/DialogContent'

export default function DialogDeleteProd(props) {
  const { open, tampData, dialogRef, handleClose, getProds, theme, color, prodType } = props;
  const [state, dispatch] = useContext(DialogContent);

  const handleProdDelete = async () => {
    try {
      if (prodType === 'delete') {
        const res = await postBackendProductsApi(prodType, tampData)
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            message: res.data.message,
            snackbarState: res.data.success,
          }
        })

      } else if (prodType === 'allDelete') {
        await Promise.all(
          tampData.map((item) => postBackendProductsApi(prodType, item))
        )
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            messageLength: tampData.length,
            snackbarState: true,
          }
        })
      }
    } catch (error) {
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          message: error?.response?.data?.message,
          snackbarState: error?.response?.data?.success,
        }
      })
    }
    handleClose();
    getProds();
  }
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      dialogRef={dialogRef}
      maxWidth="sm"
      fullWidth
      dialogTitle={prodType === 'delete' ? `${tampData.title} - 確認刪除` : '當前頁商品全部刪除'}
      handleSubmit={handleProdDelete}
      dialogSubmitBtnText="確認刪除"
      dialogSubmitColor="error"
      theme={theme}
      color={color}
    >
      {prodType === 'delete' ? (
        <Box
          component="div"
          sx={[
            { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } }
          ]}
          noValidate
          autoComplete="off"
        >
          {tampData.title}

          <Box component="div">
            <div className='img_box'><img src={tampData.imageUrl} alt={tampData.title} /></div>
          </Box>
          <Box component="div">商品類別：{tampData.category}</Box>
          <Box component="div">商品描述：{tampData.content}</Box>
          <Box component="div">商品說明：{tampData.description}</Box>
        </Box>
      ) : (
        <div>
          {tampData.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </Dialog >

  )
}
