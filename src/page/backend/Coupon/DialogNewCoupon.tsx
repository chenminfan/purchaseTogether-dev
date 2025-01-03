import React, { useEffect, useState, useContext } from 'react'
import Dialog from '@components/backend/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  postBackendCouponApi,
} from '@api/Apis'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import { CouponType } from '@typeTS/Coupon'


type DialogNewCouponType = {
  open: boolean,
  page: number,
  dialogTitle: string,
  dialogSubmitBtnText: string,
  getCoupon;
  handleClose;
  couponType: string,
  tampData: CouponType,
}
export default function DialogNewCoupon(props: DialogNewCouponType) {
  const { open, page, getCoupon, dialogTitle, dialogSubmitBtnText, handleClose, couponType, tampData } = props;
  const [_, dispatch] = useContext<any>(SnackbarContent);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [newDate, setNewDate] = useState(new Date())
  const [formData, setFormData] = useState({
    title: '',
    percent: 0,
    is_enabled: 0,
    due_date: 0,
    code: ""
  })
  const dataValue = (value) => {
    const DATE = value
    let date = DATE.getDate().toString(); //15
    let month = (DATE.getMonth() + 1).toString()  //6
    let year = DATE.getFullYear().toString();  //2016
    if (month.length < 2) {
      month = '0' + month
    }
    if (date.length < 2) {
      date = '0' + date
    }
    return [year, month, date].join('-')
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "e") e.preventDefault();
  }

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const replaceString = value.replace(/[^\d]/g, '');
    e.preventDefault();
    if (['percent'].includes(name)) {
      if (!/\d*/.test(value)) return
      setFormData({
        ...formData,
        [name]: Number(replaceString), //變數的方式帶入屬性
      })
    } else if (name === 'is_enabled') {
      setFormData({
        ...formData,
        [name]: Number(checked), //Number或＋
      })
    } else if (name === 'due_date') {
      setNewDate(new Date(value))
      setFormData({
        ...formData,
        [name]: new Date(value).getTime(),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,//變數的方式帶入屬性
      })
    }
  }

  const handleCouponSubmit = async () => {
    try {
      if (couponType === 'create') {
        const res = await postBackendCouponApi(couponType, formData)
        handleSnackbarSuccess(dispatch, res);
      } else if (couponType === 'edit') {
        const res = await postBackendCouponApi(couponType, formData)
        handleSnackbarSuccess(dispatch, res);
      }
      handleClose();
      getCoupon(page, '');
    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
  }
  useEffect(() => {
    if (couponType === 'create') {
      setFormData({
        title: '',
        percent: 80,
        is_enabled: 0,
        due_date: new Date().getTime(),
        code: "frost"
      })
      setNewDate(new Date());
    } else if (couponType === 'edit' || couponType === 'delete') {
      setFormData(tampData);
      setNewDate(new Date(tampData.due_date));
    }

  }, [couponType, tampData])

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="xl"
      dialogTitle={dialogTitle}
      handleSubmit={handleCouponSubmit}
      dialogSubmitBtnText={dialogSubmitBtnText}
    >
      <Box
        component="div"
        sx={[{ '& .MuiTextField-root': { m: 1 } }, { '& .MuiBox-root': { display: 'flex' } }
        ]}
      >
        <Box component="div">
          <TextField
            required
            fullWidth
            label="優惠券名稱"
            placeholder='請輸入優惠券名稱'
            name="title"
            onChange={(e) => handleInputChange(e)}
            value={formData.title}
          />
          <TextField
            required
            fullWidth
            label="使用期限"
            placeholder='請輸入使用期限'
            name="due_date"
            type="date"
            value={dataValue(newDate)}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleInputKeyDown(e)}
          />
        </Box>
        <Box component="div">
          <TextField
            required
            fullWidth
            label="折扣數"
            placeholder='請輸入折扣數'
            name="percent"
            type="number"
            value={formData.percent}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleInputKeyDown(e)}
          />
          <TextField
            required
            fullWidth
            label="優惠碼"
            placeholder='請輸入優惠碼'
            name="code"
            value={formData.code}
            onChange={(e) => handleInputChange(e)}
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!formData.is_enabled}
              name="is_enabled"
              onChange={(e) => handleInputChange(e)}
            />
          }
          label="是否啟用"
        />
      </Box>
    </Dialog>
  )
}
