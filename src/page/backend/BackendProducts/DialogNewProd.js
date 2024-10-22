import React, { useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
  const { open, dialogRef, getProds, handleProdClose, prodType, tampData } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // const [imageUpdate, setImageUpdate] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    is_enabled: 0,
    imageUrl: ''
  })


  const handleInputKeyDown = (e) => {
    if (e.key === "e") e.preventDefault();
  }
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const replaceString = value.replace(/[^\d]/g, '');
    e.preventDefault();
    if (['origin_price', 'price'].includes(name)) {
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
    // else if (e.target.type === 'input') {
    //   setImageUpdate(e.target.files)
    // } 
    else {
      setFormData({
        ...formData,
        [name]: value,//變數的方式帶入屬性
      })
    }
  }
  const handleProdSubmit = async () => {
    try {
      if (prodType === 'create') {
        await postBackendProduct(prodType, formData)
      } else if (prodType === 'edit') {
        await postBackendProduct(prodType, formData)
      }
      handleProdClose();
      getProds();
    } catch (error) {
    }

  }


  useEffect(() => {
    if (prodType === 'create') {
      setFormData({
        title: '',
        category: '',
        content: '',
        origin_price: 3000,
        price: 300,
        unit: '個',
        description: '',
        is_enabled: 1,
        imageUrl: 'https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      })
    } else if (prodType === 'edit') {
      setFormData(tampData);
    } else {

    }

  }, [prodType, tampData])
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
        <Box
          component="form"
          sx={[

            { '& .MuiTextField-root': { m: 1 } },
            { '& .MuiBox-root': { display: 'flex' } }
          ]
          }
          noValidate
          autoComplete="off"
        >
          <Box component="div" sx={[
            { '& > .MuiBox-root': { display: 'flex', flexDirection: 'column', flex: 1, m: 1, alignItems: 'flex-start' } },
            { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } }
          ]}>
            <div className='img_box'><img src={formData.imageUrl} alt={formData.title} /></div>

            <Box component="div">
              <TextField
                required
                fullWidth
                label="輸入圖片網址"
                placeholder='請輸入圖片網址'
                name="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange(e)}
              />
              <Button
                component="label"
              >
                上傳圖片
                <input
                  type="file"
                  hidden
                // onChange={(e)=>handleInputChange(e)}
                />
              </Button>
            </Box>
          </Box>
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
              label="商品類別"
              placeholder='請輸入商品類別'
              name="category"
              value={formData.category}
              onChange={(e) => handleInputChange(e)}
            />
          </Box>
          <Box component="div">
            <TextField
              required
              fullWidth
              label="單位"
              placeholder='請輸入商品單位'
              name="unit"
              value={formData.unit}
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              required
              fullWidth
              label="原價"
              placeholder='請輸入原價'
              name="origin_price"
              type="number"
              value={formData.origin_price}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => handleInputKeyDown(e)}
            />
            <TextField
              required
              fullWidth
              label="商品售價"
              placeholder='請輸入商品售價'
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => handleInputKeyDown(e)}
            />
          </Box>
          <Box component="div">
            <TextField
              required
              fullWidth
              label="商品描述"
              placeholder='請輸入商品描述'
              multiline
              rows={2}
              name="content"
              value={formData.content}
              onChange={(e) => handleInputChange(e)}
            />
          </Box>
          <Box component="div">
            <TextField
              fullWidth
              label="商品說明"
              placeholder='請輸入商品說明'
              multiline
              rows={2}
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange(e)}
            />
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(formData.is_enabled)}
                name="is_enabled"
                onChange={(e) => handleInputChange(e)}
              />
            }
            label="是否啟用"
          />
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleProdClose}>關閉</Button>
        <Button onClick={handleProdSubmit} autoFocus>
          {prodType === 'edit' ? '儲存' : '新增'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}
