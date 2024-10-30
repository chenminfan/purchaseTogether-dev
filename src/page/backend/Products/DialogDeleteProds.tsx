
import React, { useContext } from 'react'
import Dialog from '@components/backend/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendProductsApi
} from '@api/Apis'
import { SnackbarContent, handleSnackbarSuccessAll, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'

export default function DialogDeleteProd(props) {
  const { open, dialogTitle, dialogSubmitBtnText, tampData, tampDataALL, dialogRef, handleClose, getProds, theme, color, prodType } = props;
  const [state, dispatch] = useContext<any>(SnackbarContent);

  const handleProdDelete = async () => {
    try {
      if (prodType === 'delete') {
        const res = await postBackendProductsApi(prodType, tampData)
        handleSnackbarSuccess(dispatch, res);

      } else if (prodType === 'allDelete') {
        await Promise.all(
          tampDataALL.map((item) => postBackendProductsApi(prodType, item))
        )
        const tampDataALL_LENGTH = tampDataALL.length
        handleSnackbarSuccessAll(dispatch, tampDataALL_LENGTH);
      }
    } catch (error: any) {
      handleSnackbarError(dispatch, error);
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
      dialogSubmitBtnText={dialogSubmitBtnText}
      dialogSubmitColor="error"
      theme={theme}
      color={color}
    >
      {prodType === 'delete' ? (
        <Box
          {...props}
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
