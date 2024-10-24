
import React from 'react'
import Dialog from '../../../components/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendCouponApi
} from '../../../data/Apis'

export default function DialogDeleteCoupon(props) {
  const { open, tampData, dialogRef, handleClose, getCoupons, theme, color, couponType, snackbarSuccess } = props;
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
  const handleCouponDelete = async () => {
    try {
      await postBackendCouponApi(couponType, tampData)
    } catch (error) {

    }
    handleClose();
    getCoupons();
    snackbarSuccess();
  }
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      dialogRef={dialogRef}
      maxWidth="sm"
      fullWidth
      dialogTitle={`${tampData.title} - 確認刪除`}
      handleSubmit={handleCouponDelete}
      dialogSubmitBtnText="確認刪除"
      dialogSubmitColor="error"
      theme={theme}
      color={color}
    >
      <Box
        component="div"
        sx={[

          { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } }
        ]
        }
        noValidate
        autoComplete="off"
      >
        {tampData.title}
        <Box component="div">優惠券到期日：{dataValue(tampData.due_date)}</Box>
        <Box component="div">折扣數：{tampData.percent}</Box>
        <Box component="div">優惠碼：{tampData.code}</Box>

      </Box>
    </Dialog>

  )
}
