
import React, { useContext } from 'react'
import Dialog from '../../../components/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendProductApi
} from '../../../data/Apis'
import { DialogContent } from '../../../provider/DialogProvider/DialogContent'

export default function DialogDeleteProd(props) {
  const { open, tampData, dialogRef, handleClose, getProds, theme, color, prodType } = props;
  const [state, dispatch] = useContext(DialogContent);

  const handleProdDelete = async () => {
    try {
      if (tampData.length === 1) {
        const res = await postBackendProductApi(prodType, tampData)
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            type: 'success',
            message: res.data.message,
            snackbarState: res.data.success,
          }
        })

      }
      else {
        const res = await Promise.all(
          tampData.map((item) => postBackendProductApi(prodType, item))
        )
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            type: 'success',
            message: `成功刪除${tampData.length}筆資料`,
            snackbarState: true,
          }
        })
        console.log(res)
      }
    } catch (error) {
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          type: 'error',
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
      dialogTitle={tampData.length < 0 ? `${tampData.title} - 確認刪除` : '當前頁商品全部刪除'}
      handleSubmit={handleProdDelete}
      dialogSubmitBtnText="確認刪除"
      dialogSubmitColor="error"
      theme={theme}
      color={color}
    >
      {tampData.length === 1 ? <Box
        component="div"
        sx={[

          { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } }
        ]
        }
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

      </Box> : (
        <div>
          {tampData.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </Dialog >

  )
}
