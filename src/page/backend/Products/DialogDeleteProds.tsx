
import React, { useContext } from 'react'
import Dialog from '@components/backend/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendProductsApi
} from '../../../data/Apis'
import { DialogContent } from '../../../provider/DialogProvider/DialogContent'
import { ProductsType } from '@typeTS/Products'

type DialogDeleteProdsType = {
  open: boolean,
  getProds;
  handleClose;
  prodType: string,
  color: string,
  tampData?: ProductsType,
  tampDataALL?: ProductsType[],
  theme: object,
}
export default function DialogDeleteProds(props: DialogDeleteProdsType) {
  const { open, tampData = {
    title: '',
    category: '',
    content: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    is_enabled: 0,
    imageUrl: ''
  }, tampDataALL = [], handleClose, getProds, theme, color, prodType } = props;
  const [state, dispatch] = useContext<any>(DialogContent);

  const handleProdDelete = async () => {
    try {
      if (prodType === 'delete') {
        const res = await postBackendProductsApi(prodType, tampData)
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            message: res.data.message,
            snackbarState: res.data.success,
          }
        })

      } else if (prodType === 'allDelete') {
        await Promise.all(
          tampDataALL.map((item) => postBackendProductsApi(prodType, item))
        )
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            messageLength: tampDataALL.length,
            snackbarState: true,
          }
        })
      }
    } catch (error: any) {
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
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
      maxWidth="sm"
      fullWidth
      dialogTitle={prodType === 'delete' ? `${tampData.title} - 確認刪除` : '刪除多筆資料'}
      dialogSubmitBtnText={prodType === 'delete' ? '確認刪除' : '確認刪除多筆資料'}
      handleSubmit={handleProdDelete}
      dialogSubmitColor="error"
      theme={theme}
      color={color}
    >
      {prodType === 'delete' ? (
        <Box
          component="div"
          sx={[
            { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } }
          ]}
        >
          {tampData.title}

          <Box component="div">
            <div className='img_box'><img src={tampData.imageUrl} alt={tampData.title} /></div>
          </Box>
          <Box component="div">商品類別：{tampData.category}</Box>
          <Box component="div">商品描述：{tampData.content}</Box>
          <Box component="div">商品說明：{tampData.description}</Box>
        </Box>
      ) : (
        <div>
          {tampDataALL.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </Dialog >

  )
}
