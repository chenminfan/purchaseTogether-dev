import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  postBackendProduct,
} from '../../../data/Apis'

export default function DialogNewProd(props) {
  const { open, dialogRef, handleProdClose } = props;
  const [imageUpdate, setImageUpdate] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    origin_price: 3000,
    price: 300,
    unit: '',
    description: '',
    is_enabled: 1,
    imageUrl: 'https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (['origin_price', 'price'].includes(name)) {
      setFormData({
        ...formData,
        [name]: Number(value), //變數的方式帶入屬性
      })
    } else if (name === 'is_enabled') {
      setFormData({
        ...formData,
        [name]: Number(e.target.checked), //Number或＋
      })
    }
    else if (e.target.type === 'input') {
      setImageUpdate(e.target.files)
    } else {
      setFormData({
        ...formData,
        [name]: value,//變數的方式帶入屬性
      })
    }
  }
  const handleProdSubmit = async () => {
    try {
      await postBackendProduct(formData)
      handleProdClose()
    } catch (error) {
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleProdClose}
      ref={dialogRef}
      fullScreen={fullScreen}
      maxWidth="xl"
      closeAfterTransition={false}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
        新增商品
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleProdClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <i className="bi bi-x"></i>
      </IconButton>
      <DialogContent sx={
        [
          { '& > .MuiBox-root': { display: 'flex', flexDirection: 'column' } }]
      }>
        {/* <DialogContentText id="alert-dialog-description">
          我的商品我的商品我的商品我的商品我的商品我的商品我的商品我的商品我的商品我的商品
        </DialogContentText> */}
        <Box
          component="form"
          sx={[

            { '& .MuiTextField-root': { m: 1, width: '100%' } },
            { '& .MuiBox-root': { display: 'flex' } }
          ]
          }
          noValidate
          autoComplete="off"
        >
          <Box component="div" sx={[
            { '& .MuiTextField-root': { m: 0 } },
            { '& > .MuiBox-root': { display: 'flex', flexDirection: 'column', m: 1, } },
            { '& > .img_box': { m: 1, width: 'calc(50% - 16px)', paddingBottom: '50%' } }
          ]}>
            <div className='img_box'><img src={formData.imageUrl} alt="" /></div>
            <Box component="div">
              <TextField
                required
                id="outlined-required"
                label="輸入圖片網址"
                placeholder='請輸入圖片網址'
                name="imageUrl"
                defaultValue={formData.imageUrl}
                onChange={handleInputChange}
              />
              <Button
                component="label"
              >
                上傳圖片
                <input
                  type="file"
                  hidden
                // onChange={handleInputChange}
                />
              </Button>
            </Box>
          </Box>
          <Box component="div">
            <TextField
              required
              id="outlined-required"
              label="商品名稱"
              placeholder='請輸入商品名稱'
              name="title"
              onChange={handleInputChange}
              defaultValue={formData.title}
            />
            <TextField
              required
              id="outlined-required"
              label="商品類別"
              placeholder='請輸入商品類別'
              name="category"
              defaultValue={formData.category}
              onChange={handleInputChange}
            />
          </Box>
          <Box component="div">
            <TextField
              required
              id="outlined-required"
              label="單位"
              placeholder='請輸入商品單位'
              name="unit"
              defaultValue={formData.unit}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="原價"
              placeholder='請輸入原價'
              name="origin_price"
              defaultValue={formData.origin_price}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="商品售價"
              placeholder='請輸入商品售價'
              name="price"
              defaultValue={formData.price}
              onChange={handleInputChange}
            />
          </Box>
          <Box component="div">
            <TextField
              id="outlined-required"
              label="商品描述"
              placeholder='請輸入商品描述'
              name="content"
              defaultValue={formData.content}
              onChange={handleInputChange}
            />
          </Box>
          <Box component="div">
            <TextField
              id="outlined-required"
              label="商品說明"
              placeholder='請輸入商品說明'
              name="description"
              defaultValue={formData.description}
              onChange={handleInputChange}
            />
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                defaultValue={formData.is_enabled}
                name="is_enabled"
                onChange={handleInputChange}
              />
            }
            label="是否啟用"
          />
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleProdClose}>關閉</Button>
        <Button onClick={handleProdSubmit} autoFocus>
          新增
        </Button>
      </DialogActions>
    </Dialog >
  )
}
