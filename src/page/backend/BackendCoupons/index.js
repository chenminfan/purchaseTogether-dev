import React, { useEffect, useRef, useState } from 'react'
import PaginationComponents from '../../../components/Pagination';
import DialogNewCoupon from './DialogNewCoupon';
import DialogDeleteCoupon from './DialogDeleteCoupon';
import {
  getBackendCouponApi,
} from '../../../data/Apis'

import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';


export default function BackendCoupons() {
  const [couponData, setCouponData] = useState([]);
  const [page, setPage] = useState([]);
  const columns = [
    { field: 'title', headerName: '品名', width: 180 },
    { field: 'isEnabled', headerName: '狀態', width: 80, },
    { field: 'price', headerName: '售價', width: 100, },
    { field: 'date', headerName: '使用期限', width: 100, },
    { field: 'code', headerName: '優惠碼', width: 100, },
    { field: 'tool', headerName: '', width: 180, },

  ];
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState('');
  const [tamp, setTamp] = useState('');
  const handleCouponOpen = (type, coupon) => {
    setTamp(coupon);
    setType(type);
    setOpen(true);
  }
  const handleCouponDeleteOpen = (type, coupon) => {
    setTamp(coupon);
    setType(type);
    setOpen(true);
  }
  const handleCouponClose = (reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };
  const dialogRef = useRef(null)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5733'
      },
    },
  });
  const getCoupons = async (page = 1) => {
    const couponRes = await getBackendCouponApi(page)
    setCouponData(couponRes.data.coupons)
    setPage(couponRes.data.pagination)
  }
  useEffect(() => {
    getCoupons();
  }, [])
  return (
    <>
      <Box component="section">
        <Typography variant="h4" component="div">優惠券列表</Typography>
        <Box component="div" sx={{ display: 'flex', marginBottom: '12px' }}>
          <Button
            sx={{ marginLeft: 'auto' }}
            onClick={() => handleCouponOpen('create', {})}
          >新增優惠券</Button>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 500, minWidth: '100%', }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      inputProps={{
                        'aria-label': 'select all desserts',
                      }}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.field} style={{ minWidth: col.width }}>{col.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {couponData.map((row) => {
                  const labelId = `enhanced-table-checkbox-${row.id}`;
                  return (
                    <TableRow key={row.id} onClick={() => { }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          // checked={ }
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.due_date}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                      <TableCell align="right">{row.price.toLocaleString('zh-TW')}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleCouponOpen('edit', row)}
                        >編輯</Button>
                        <Button
                          color="error"
                          onClick={() => handleCouponDeleteOpen('delete', row)}
                        >刪除</Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper >

        <PaginationComponents page={page} getPagination={getCoupons} />

      </Box >
      {type === 'delete' ? (
        <DialogDeleteCoupon
          open={type === 'delete' && open}
          getCoupons={getCoupons}
          couponType={type}
          tampData={tamp}
          handleClose={handleCouponClose}
          theme={theme}
          color="primary"
        />
      ) : (<DialogNewCoupon
        handleClose={handleCouponClose}
        getCoupons={getCoupons}
        couponType={type}
        tampData={tamp}
        open={type !== 'delete' && open}
        dialogRef={dialogRef}
        dialogTitle={type === 'create' ? '新增優惠券' : `編輯${tamp.title}`}
        dialogSubmitBtnText={type === 'edit' ? '儲存' : '新增'}
      />)}
    </>
  )
}
