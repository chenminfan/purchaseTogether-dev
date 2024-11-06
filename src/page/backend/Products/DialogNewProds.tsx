import React, { useEffect, useState, useContext } from 'react'
import Dialog from '@components/backend/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  postBackendProductsApi,
  postUploadApi,
} from '@api/Apis'
import { SnackbarContent, handleSnackbarSuccess, handleSnackbarError } from '@provider/SnackbarProvider/SnackbarContent'
import { ProductsType } from '@typeTS/Products'

// type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick';
type DialogNewProdsType = {
  open: boolean,
  dialogTitle: string,
  dialogSubmitBtnText: string,
  getProds;
  handleClose;
  prodType: string,
  tampData: ProductsType,
  page: number,

}

export default function DialogNewProds(props: DialogNewProdsType) {
  const { open, page, dialogTitle, dialogSubmitBtnText, getProds, handleClose = () => { }, prodType, tampData } = props;
  const [state, dispatch] = useContext<any>(SnackbarContent);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [imageUpdate, setImageUpdate] = useState<string>('');
  const [formData, setFormData] = useState<ProductsType>({
    title: '',
    category: '',
    content: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    is_enabled: 0,
    imageUrl: '',
    imagesUrl: ['', '', '', '', ''],
  })
  const handleInputKeyDown = (e) => {
    if (e.key === "e") e.preventDefault();
  }

  const getUploadImage = async (e) => {
    const { name, files } = e.target;
    if (!files[0]) {
      return
    }
    setImageUpdate(files[0].name)
    const fileData = new FormData();
    fileData.append(name, files[0])
    try {
      const res = await postUploadApi(fileData)
      setFormData({
        ...formData,
        imageUrl: res.data.imageUrl,//變數的方式帶入屬性
      })
    } catch (error: any) {

    }
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

    } else if (name.substring(0, 9) === 'imagesUrl') {
      const inputArray = ({ ...formData.imagesUrl, [name.substring(9, 10)]: value })
      const inputArrayIndex = Object.values(inputArray).map((item) => item ? item : '')

      setFormData({
        ...formData,
        imagesUrl: inputArrayIndex
      })
    }
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
        const res = await postBackendProductsApi(prodType, formData)
        handleSnackbarSuccess(dispatch, res);

      } else if (prodType === 'edit') {
        const res = await postBackendProductsApi(prodType, formData)
        handleSnackbarSuccess(dispatch, res);
      }
      handleClose();
      getProds(page, '');
    } catch (error: any) {
      handleSnackbarError(dispatch, error);
    }
  }

  useEffect(() => {
    if (prodType === 'create') {
      setFormData({
        title: 'DialogNewProds DialogNewProds',
        category: 'DialogNewProds DialogNewProds',
        content: 'DialogNewProds',
        origin_price: 3000,
        price: 300,
        unit: '個',
        description: 'DialogNewProds',
        is_enabled: 1,
        imageUrl: 'https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imagesUrl: ['', '', '', '', ''],
      })
    } else if (prodType === 'edit') {
      setFormData(tampData);
    }
  }, [prodType, tampData])

  return (
    <Dialog
      open={open}
      dialogTitle={dialogTitle}
      handleClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="xl"
      handleSubmit={handleProdSubmit}
      dialogSubmitBtnText={dialogSubmitBtnText}
    >
      <Box
        component="div"
        sx={[
          { '& .MuiTextField-root': { m: 1 } },
          { '& .MuiBox-root': { display: 'flex' } }
        ]}
      >
        <Box component="div" sx={[
          { '& > .MuiBox-root': { display: 'flex', flexDirection: 'column', flex: 1, m: 1, alignItems: 'flex-start' } },
          { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } },

        ]}>
          <div className='img_box'><img src={formData.imageUrl} alt={formData.title} /></div>

          <Box component="div">
            <TextField
              required
              fullWidth
              label="輸入主圖圖片網址"
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
                name="file"
                hidden
                accept="image/*"
                onChange={
                  (e) => {
                    getUploadImage(e)
                  }
                }
              />

            </Button>
            {imageUpdate}

          </Box>
        </Box>
        <Box component="div" sx={[
          { '& > .imagesUrl_box': { width: '100%', padding: '8px' } },
        ]}>
          {formData.imagesUrl && formData.imagesUrl?.map((item, index) => (
            <Box component="div" key={`${item}_imagesUrl${index}`} className='imagesUrl_box' sx={[
              { '&.MuiBox-root': { padding: '8px', display: 'flex', flexDirection: 'column', height: `${item.length !== 0 ? '220px' : 'auto'}` }, }
            ]}>
              <TextField
                required
                fullWidth
                label={`輸入圖片${index + 1}網址`}
                placeholder='請輸入圖片網址'
                name={`imagesUrl${index}`}
                value={item}
                onChange={(e) => handleInputChange(e)}
              />
              {item.length !== 0 && <div className='img_box'><img src={item} alt={formData.title} /></div>}
            </Box>
          ))}
        </Box>
        <Box component="div" sx={[
          { '& > .imagesUrl_box': { width: '100%', padding: '8px' } },
          { '.img_box': { padding: '8px' } },
        ]}>

        </Box>
        <Box component="div">
          <TextField
            fullWidth
            label="商品名稱title"
            placeholder='請輸入商品名稱'
            name="title"
            onChange={(e) => handleInputChange(e)}
            value={formData.title}
          />
          <TextField
            required
            fullWidth
            label="商品類別category"
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
            label="單位unit"
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
              checked={!!formData.is_enabled}
              name="is_enabled"
              onChange={(e) => handleInputChange(e)}
            />
          }
          label="是否啟用"
        />
      </Box>
    </Dialog >
  )
}
