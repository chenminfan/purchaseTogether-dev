import React, { useEffect, useState } from 'react'
import Dialog from '../../../components/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  postBackendCouponApi,
} from '../../../data/Apis'

export default function DialogNewCoupon(props) {
  const { open, dialogRef, getCoupons, handleClose, couponType, tampData } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [newDate, setNewDate] = useState(new Date())
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    is_enabled: 0,
    due_date: 6547658,
    code: "testCode"
  })

  const handleInputKeyDown = (e) => {
    if (e.key === "e") e.preventDefault();
  }

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const replaceString = value.replace(/[^\d]/g, '');
    e.preventDefault();
    if (['price'].includes(name)) {
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
    }
    else {
      setFormData({
        ...formData,
        [name]: value,//變數的方式帶入屬性
      })
    }
  }
  const handleCouponSubmit = async () => {
    try {
      if (couponType === 'create') {
        await postBackendCouponApi(couponType, formData)
      } else if (couponType === 'edit') {
        await postBackendCouponApi(couponType, formData)
      }
      handleClose();
      getCoupons();
    } catch (error) {
    }

  }
  useEffect(() => {
    if (couponType === 'create') {
      setFormData({
        title: '',
        price: 0,
        is_enabled: 0,
        due_date: '',
        code: "testCode"
      })
    } else if (couponType === 'edit' || couponType === 'delete') {
      setFormData(tampData);
    }

  }, [couponType, tampData])

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      dialogRef={dialogRef}
      fullScreen={fullScreen}
      maxWidth="xl"
      dialogTitle={couponType === 'create' ? '新增商品' : `編輯${formData.title}`}
      handleSubmit={handleCouponSubmit}
      dialogSubmitBtnText={couponType === 'edit' ? '儲存' : '新增'}
    >
      <Box
        component="div"
        sx={[

          { '& .MuiTextField-root': { m: 1 } },
          { '& .MuiBox-root': { display: 'flex' } }
        ]
        }
        noValidate
        autoComplete="off"
      >
        <Box component="div">
          <TextField
            required
            fullWidth
            label="商品名稱"
            placeholder='請輸入商品名稱'
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
            value={formData.due_date}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleInputKeyDown(e)}
          />
        </Box>
        <Box component="div">
          <TextField
            required
            fullWidth
            label="優惠券價格"
            placeholder='請輸入優惠券價格'
            name="price"
            type="number"
            value={formData.price}
            views={["year", "month", "day"]}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleInputKeyDown(e)}
          />
          <TextField
            required
            fullWidth
            label="優惠碼"
            placeholder='code'
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
