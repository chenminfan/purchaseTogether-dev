import React, { useEffect, useState, useContext } from 'react'
import Dialog from '../../../components/backend/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  postBackendOrdersApi,
} from '../../../data/Apis'
import { DialogContent } from '../../../provider/DialogProvider/DialogContent'
import { ProductsType } from '@typeTS/Products'
import { OrdersType, OrdersProdType } from '@typeTS/Orders'

type DialogNewOrderType = {
  open: boolean,
  page: number,
  getOrders;
  handleClose;
  tampData;
}
export default function DialogNewOrder(props: DialogNewOrderType) {
  const { open, page, getOrders, handleClose, tampData } = props;
  const [, dispatch] = useContext<any>(DialogContent);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [newDate, setNewDate] = useState<Date>(new Date())
  const [formData, setFormData] = useState({
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
  })
  const [ordersProdData, setOrdersProdData] = useState<OrdersProdType[]>([]);
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    e.preventDefault();
    if (name === 'is_paid') {
      setFormData({
        ...formData,
        [name]: checked, //Number或＋
      })
    }
  }

  const handleOrderSubmit = async () => {
    try {
      const res = await postBackendOrdersApi('edit', formData)
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          type: 'success',
          message: res.data.message,
          snackbarState: res.data.success,
          autoHideDuration: 3000,
        }
      })
      handleClose();
      getOrders(page);
    } catch (error: any) {
      dispatch({
        type: 'DIALOG_MESSAGE',
        snackbar: {
          type: 'error',
          message: error?.response?.data?.message,
          snackbarState: error?.response?.data?.success,
        }
      })
    }
  }
  const Prod_Id = Object.keys(ordersProdData)
  const Prods = Object.values(ordersProdData)
  useEffect(() => {
    setFormData(tampData);
    setOrdersProdData(tampData.products);

  }, [tampData])

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="xl"
      dialogTitle={`編輯${formData.id}`}
      handleSubmit={handleOrderSubmit}
      dialogSubmitBtnText="儲存"
    >
      <Box
        component="div"
        sx={[
          { '& .MuiTextField-root': { m: 1 } },
          { '& .MuiBox-root': { display: 'flex' } }
        ]}
      >
        <Box component="div">
          <TextField
            required
            fullWidth
            label="email"
            name="email"
            value={formData.user.email}
            disabled
          />
          <TextField
            required
            fullWidth
            label="訂購人"
            name="name"
            value={formData.user.name}
            disabled
          />
          <TextField
            required
            fullWidth
            label="訂購人地址"
            name="address"
            value={formData.user.address}
            disabled
          />
        </Box>
        <Box component="div">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>商品</TableCell>
                <TableCell align="right">數量</TableCell>
                <TableCell align="right">折扣後</TableCell>
                <TableCell align="right">原價</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Prods.map((row) => (
                <TableRow
                  key={row.product_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row?.product?.title}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell align="right">{row.final_total}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!formData.is_paid}
              name="is_paid"
              onChange={(e) => handleInputChange(e)}
            />
          }
          label="付款狀態"
        />
      </Box>
    </Dialog>
  )
}
