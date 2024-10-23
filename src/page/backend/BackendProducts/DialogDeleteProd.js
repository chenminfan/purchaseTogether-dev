
import React from 'react'
import Dialog from '../../../components/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendProductApi
} from '../../../data/Apis'

export default function DialogDeleteProd(props) {
  const { open, tampData, dialogRef, handleClose, getProds, theme, color, prodType } = props;

  const handleProdDelete = async () => {
    try {
      await postBackendProductApi(prodType, tampData)
    } catch (error) {

    }
    handleClose();
    getProds();
  }
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      dialogRef={dialogRef}
      maxWidth="sm"
      fullWidth
      dialogTitle={`${tampData.title} - 確認刪除`}
      handleSubmit={handleProdDelete}
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
