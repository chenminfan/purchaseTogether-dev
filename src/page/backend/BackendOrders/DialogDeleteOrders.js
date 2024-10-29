
import React, { useContext } from 'react'
import Dialog from '../../../components/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendOrdersApi
} from '../../../data/Apis'
import { DialogContent } from '../../../provider/DialogProvider/DialogContent'

export default function DialogDeleteOrders(props) {
  const { open, tampData, dialogRef, handleClose, getOrders, theme, color, couponType } = props;
  const [state, dispatch] = useContext(DialogContent);

  const dataValue = (value) => {
    const DATE = new Date(value)
    let date = DATE.getDate(); //15
    let month = (DATE.getMonth() + 1)  //6
    let year = DATE.getFullYear();  //2016
    if (month.length < 2) {
      month = '0' + month
    }
    if (date.length < 2) {
      date = '0' + date
    }
    return [year, month, date].join('/')
  }

  const handleOrdersDelete = async () => {
    try {
      if (couponType === 'delete') {
        console.log(couponType)
        const res = await postBackendOrdersApi(couponType, tampData)
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            message: res.data.message,
            snackbarState: res.data.success,
          }
        })

      } else if (couponType === 'allDelete') {
        console.log(couponType)
        await Promise.all(
          tampData.map((item) => postBackendOrdersApi(couponType, item))
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
    getOrders();
  }
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      dialogRef={dialogRef}
      maxWidth="sm"
      fullWidth
      dialogTitle={couponType === 'delete' ? `${tampData.title} - 確認刪除` : '當前頁商品全部刪除'}
      handleSubmit={handleOrdersDelete}
      dialogSubmitBtnText="確認刪除"
      dialogSubmitColor="error"
      theme={theme}
      color={color}
    >
      {couponType === 'delete' ? (
        <Box
          component="div"
          sx={[
            { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } }
          ]}
          noValidate
          autoComplete="off"
        >
          {tampData.title}
          <Box component="div">優惠券到期日：{dataValue(tampData.due_date)}</Box>
          <Box component="div">折扣數：{tampData.percent}</Box>
          <Box component="div">優惠碼：{tampData.code}</Box>
        </Box>
      ) : (
        <div>
          {tampData.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </Dialog>

  )
}
