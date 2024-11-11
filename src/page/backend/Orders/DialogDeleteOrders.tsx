
import React, { useContext } from 'react'
import Dialog from '../../../components/backend/Dialog'
import Box from '@mui/material/Box';
import {
  postBackendOrdersApi
} from '../../../data/Apis'
import { DialogContent } from '../../../provider/DialogProvider/DialogContent'
import { OrdersType, OrdersProdType } from '@typeTS/Orders'
import { ProductsType } from '@typeTS/Products'
type DialogDeleteCouponType = {
  open: boolean,
  page: number,
  getOrders;
  handleClose;
  orderType: string,
  color: string,
  tampData?: OrdersType,
  tampDataALL?: OrdersType[],
  theme: object,
}
export default function DialogDeleteOrders(props: DialogDeleteCouponType) {
  const { open, page, tampData = {
    create_at: 0,
    id: '',
    is_paid: false,
    message: '',
    products: {
      product: {
        title: '',
      },
      qty: 0,
      final_total: 0,
      total: 0,
      product_id: '',
    },
    total: 0,
    user: {
      address: '',
      email: '',
      name: '',
      tel: '',
    },
    num: 0
  }, tampDataALL = [], handleClose, getOrders, theme, color, orderType } = props;
  const [state, dispatch] = useContext<any>(DialogContent);

  const handleOrdersDelete = async () => {
    try {
      if (orderType === 'delete') {
        const res = await postBackendOrdersApi(orderType, tampData)
        dispatch({
          type: 'DIALOG_MESSAGE',
          snackbar: {
            message: res.data.message,
            snackbarState: res.data.success,
          }
        })

      } else if (orderType === 'allDelete') {
        await Promise.all(
          tampDataALL.map((item) => postBackendOrdersApi(orderType, item))
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
    getOrders(page, '');
  }
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      maxWidth="sm"
      fullWidth
      dialogTitle={orderType === 'delete' ? `${tampData?.id} - 確認刪除` : '當前頁商品全部刪除'}
      handleSubmit={handleOrdersDelete}
      dialogSubmitBtnText={"確認刪除"}
      dialogSubmitColor="error"
      theme={theme}
      color={color}
    >
      {orderType === 'delete' ? (
        <Box
          component="div"
          sx={[
            { '& .img_box': { width: '100%', maxWidth: '150px', paddingBottom: '150px', m: 1, } }
          ]}
        >
          <h3>訂單編號：{tampData.id}</h3>
          <Box component="div">訂購人：{tampData.user.name}</Box>
          <Box component="div">商品</Box>
        </Box>
      ) : (
        <div>
          {tampDataALL.map((item) => {
            return (
              <Box key={item.id} component="div">
                <h3>訂單編號：{item.id}</h3>
                <Box component="div">訂購人：{item.user.name}</Box>
              </Box>
            )
          })}
        </div>
      )}
    </Dialog>

  )
}
