
import React, { useContext } from 'react'
import Dialog from '@components/backend/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendCouponApi
} from '@api/Apis'
import { SnackbarContent, handleSnackbarSuccessAll, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import { CouponType } from '@typeTS/Coupon'

type DialogDeleteCouponType = {
  open: boolean,
  page: number,
  getCoupon;
  handleClose;
  couponType: string,
  color: string,
  tampData?: CouponType,
  tampDataALL?: CouponType[],
  theme: object,
}
export default function DialogDeleteCoupon(props: DialogDeleteCouponType) {
  const { open, page, tampData = {
    id: '',
    title: '',
    percent: 0,
    due_date: 0,
    is_enabled: 0,
    code: ''
  }, tampDataALL = [], handleClose, getCoupon, theme, color, couponType } = props;
  const [state, dispatch] = useContext<any>(SnackbarContent);

  const dataValue = (value) => {
    const DATE = new Date(value)
    let date: string | number = DATE.getDate(); //15
    let month: string | number = (DATE.getMonth() + 1)  //6
    let year: string | number = DATE.getFullYear();  //2016
    if (month < 2) {
      month = '0' + month
    }
    if (date < 2) {
      date = '0' + date
    }
    return [year, month, date].join('/')
  }

  const handleCouponDelete = async () => {
    try {
      if (couponType === 'delete') {
        const res = await postBackendCouponApi(couponType, tampData)
        handleSnackbarSuccess(dispatch, res);

      } else if (couponType === 'allDelete') {
        await Promise.all(
          tampDataALL.map((item) => postBackendCouponApi(couponType, item))
        )
        const tampDataALL_LENGTH = tampDataALL.length
        handleSnackbarSuccessAll(dispatch, tampDataALL_LENGTH);
      }
    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
    handleClose();
    getCoupon(page, '');
  }

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      maxWidth="sm"
      fullWidth
      dialogTitle={couponType === 'delete' ? `${tampData.title} - 確認刪除` : '當前頁商品全部刪除'}
      handleSubmit={handleCouponDelete}
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
        >
          {tampData.title}
          <Box component="div">優惠券到期日：{dataValue(tampData.due_date)}</Box>
          <Box component="div">折扣數：{tampData.percent}</Box>
          <Box component="div">優惠碼：{tampData.code}</Box>
        </Box>
      ) : (
        <div>
          {tampDataALL.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </Dialog>

  )
}
