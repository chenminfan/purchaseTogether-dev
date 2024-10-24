
import React from 'react'
import Dialog from '../../../components/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendCouponApi
} from '../../../data/Apis'

export default function DialogDeleteCoupon(props) {
  const { open, tampData, dialogRef, handleClose, getCoupons, theme, color, couponType } = props;

  const handleCouponDelete = async () => {
    try {
      await postBackendCouponApi(couponType, tampData)
    } catch (error) {

    }
    handleClose();
    getCoupons();
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
        <Box component="div">
          <div className='img_box'><img src={tampData.imageUrl} alt={tampData.title} /></div>
        </Box>
        <Box component="div">商品類別：{tampData.category}</Box>
        <Box component="div">商品描述：{tampData.content}</Box>
        <Box component="div">商品說明：{tampData.description}</Box>

      </Box>
    </Dialog>

  )
}
