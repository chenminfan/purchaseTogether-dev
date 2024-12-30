
import React, { useContext } from 'react'
import Dialog from '@components/backend/Dialog'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';

import {
  postBackendOrdersApi
} from '@api/Apis'
import { SnackbarContent, handleSnackbarSuccessAll, handleSnackbarSuccess } from '@provider/SnackbarProvider/SnackbarContent'
import { OrdersType, OrdersProdType } from '@typeTS/Orders'
type DialogDeleteCouponType = {
  open: boolean,
  page: number,
  getOrders;
  handleClose;
  orderType: string,
  color: string,
  tempData?: OrdersType,
  tempDataALL?: OrdersType[],
  theme: object,
}
export default function DialogDeleteOrders(props: DialogDeleteCouponType) {
  const { open, page, tempData = {
    create_at: 0,
    id: '',
    is_paid: false,
    message: '',
    products: {
      product: {},
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
  }, tempDataALL = [], handleClose, getOrders, theme, color, orderType } = props;
  const [_, dispatch] = useContext<any>(SnackbarContent);

  const handleOrdersDelete = async () => {
    try {
      if (orderType === 'delete') {
        const res = await postBackendOrdersApi(orderType, tempData)
        handleSnackbarSuccess(dispatch, res);
      } else if (orderType === 'allDelete') {
        await Promise.all(
          tempDataALL.map((item) => postBackendOrdersApi(orderType, item))
        )
        const tempDataALL_LENGTH = tempDataALL.length
        handleSnackbarSuccessAll(dispatch, tempDataALL_LENGTH);
      }
    } catch (error: any) {
      handleClose();
    }
    handleClose();
    getOrders(page, '');
  }
  const Prods = Object.values(tempData.products)
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      maxWidth="sm"
      fullWidth
      dialogTitle={orderType === 'delete' ? `${tempData?.id} - 確認刪除` : '刪除多筆訂單'}
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
          <h5>No.：{tempData.id}</h5>
          <Box component="div" sx={{ color: '#64b5f6', fontWeight: '500', }}>訂購人：{tempData.user.name}</Box>
          <Table sx={{ padding: '8px 16px' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>商品</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Prods.map((prod) => (
                <TableRow
                  key={prod.product_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{prod.product.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ) : (
        <div>
          <Box component="div">
            {tempDataALL.map((item, index) => (
              <Box key={item.id} component="div" sx={{ padding: '8px 0', borderBottom: 1, borderColor: 'divider' }}>
                <h5>No.：{item.id}</h5>
                <Box component="div" sx={{ color: '#64b5f6', fontWeight: '500', }}>訂購人：{item.user.name}</Box>
                <Table sx={{ padding: '8px 16px' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>商品</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(item.products).map((prod) => (
                      <TableRow
                        key={prod.product_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{prod.product.title}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            ))}
          </Box>

        </div>
      )
      }
    </Dialog >

  )
}
