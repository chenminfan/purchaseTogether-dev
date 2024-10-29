import React, { useMemo, useEffect, useRef, useState, useContext } from 'react'
import PaginationComponents from '../../../components/Pagination';
import { TableContent } from '../../../provider/TableProvider/TableContent'
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
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';

export default function BackendCoupons() {
  const [couponData, setCouponData] = useState([]);
  const [page, setPage] = useState([]);
  const [state, dispatch] = useContext(TableContent);
  const columns = [
    { field: 'title', headerName: '優惠券名稱', width: 200 },
    { field: 'percent', align: 'center', headerName: '折扣數', width: 100, },
    { field: 'due_date', align: 'center', headerName: '使用期限', width: 120, },
    { field: 'code', align: 'center', headerName: '優惠碼', width: 100, },
    { field: 'is_enabled', align: 'center', headerName: '狀態', width: 80, },
    { field: 'tool', headerName: '', width: 180, },

  ];
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortOrderID, setSortOrderID] = useState('title');
  const [tableType, setTableType] = useState('');
  const [tamp, setTamp] = useState(state.dataTamp);
  const getCoupons = async (page = 1) => {
    const couponRes = await getBackendCouponApi(page)
    setCouponData(couponRes.data.coupons)
    setPage(couponRes.data.pagination)
    dispatch({
      type: 'RE_RENDER_CHECKBOX',
      table: { dataTamp: couponRes.data.pagination },
      tableData: couponData,
    })
  }

  // 排序 start
  const handleSortOrder = (order) => {
    const isAsc = sortOrderID === order && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc')
    setSortOrderID(order)
  }
  const newSortOrder = (a, b, sortOrderID) => {
    if (b[sortOrderID] < a[sortOrderID]) {
      return -1;
    }
    if (b[sortOrderID] > a[sortOrderID]) {
      return 1;
    }
    return 0;
  }
  const getSort = (sortOrder, sortOrderID) => {
    return sortOrder === 'desc' ?
      (a, b) => newSortOrder(a, b, sortOrderID) :
      (a, b) => -newSortOrder(a, b, sortOrderID)
  }
  const sortData = useMemo(() => {
    return [...couponData]
      .sort(getSort(sortOrder, sortOrderID))
  }, [couponData, sortOrder, sortOrderID])
  // 排序 end
  useEffect(() => {
    getCoupons();
  }, [])


  const dataValue = (value) => {
    const DATE = new Date(value)
    let date = DATE.getDate(); //15
    let month = (DATE.getMonth() + 1)  //6
    let year = DATE.getFullYear();  //2016
    if (month.length < 2) {
      month = '0' + month
    }
    if (date.length < 2) {
      date = '0' + date
    }
    return [year, month, date].join('/')
  }
  const handleCouponOpen = (type, coupon) => {
    setTamp(coupon);
    setOpen(true);
    setTableType(type);
  }
  const handleCouponDeleteOpen = (type, coupon) => {
    setTamp(coupon);
    setOpen(true);
    setTableType(type);
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

  const handleClickDelete = (type) => {
    setOpen(true);
    setTableType(type)
  }

  const CHECK_STATE = (newData) => state.dataTamp.includes(newData)
  // 當畫面有觸發其他function，useCallback避免被其他function re render
  const handleChangeCheck = (e, data) => {
    dispatch({
      type: 'TABLE_CHECKBOX',
      table: {
        target: e.target,
        dataTamp: data,
      }
    })
  }
  const handleChangeCheckAll = (e, data) => {
    dispatch({
      type: 'TABLE_CHECKBOX_ALL',
      table: {
        target: e.target,
        dataTamp: data,
      },
      tableData: couponData
    })
  }
  const CHECK_DATA_LENGTH = state.dataTamp.length > 1;
  return (
    <>
      <Box component="section">
        <Typography variant="h4" component="div">優惠券列表</Typography>
        <Box component="div" sx={{ display: 'flex', justifyContent: 'flex-End', marginBottom: '12px' }}>
          {CHECK_DATA_LENGTH && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClickDelete('allDelete')}
            >
              {state.dataTamp.length === couponData.length ? '全部刪除' : '刪除'}
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ marginLeft: CHECK_DATA_LENGTH ? '12px' : '' }}
            onClick={() => handleCouponOpen('create', {})}
          >
            新增優惠券
          </Button>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 500, minWidth: '100%', }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name="checkAll"
                      color="primary"
                      checked={state.checkBool}
                      onChange={(e) => {
                        handleChangeCheckAll(e, couponData)
                      }}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.field} align={col.align} style={{ minWidth: col.width }}>
                      <TableSortLabel
                        active={sortOrderID === col.field}
                        direction={sortOrder ? sortOrder : 'asc'}
                        onClick={() => handleSortOrder(col.field)}
                      >
                        {col.headerName}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={CHECK_STATE(row)}
                        onChange={(e) => {
                          handleChangeCheck(e, row)
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.percent}</TableCell>
                    <TableCell>{dataValue(row.due_date)}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                    {!CHECK_DATA_LENGTH && (
                      <TableCell>
                        <Button
                          onClick={() => handleCouponOpen('edit', row)}
                        >
                          編輯
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleCouponDeleteOpen('delete', row)}
                        >
                          刪除
                        </Button>
                      </TableCell>
                    )}

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper >

        <PaginationComponents page={page} getPagination={getCoupons} />

      </Box >
      {tableType === 'delete' && (
        <DialogDeleteCoupon
          open={open}
          getCoupons={getCoupons}
          couponType={tableType}
          tampData={tamp}
          handleClose={handleCouponClose}
          theme={theme}
          color="primary"
        />
      )}
      {tableType === 'allDelete' && (
        <DialogDeleteCoupon
          open={open}
          getCoupons={getCoupons}
          couponType={tableType}
          tampData={state.dataTamp}
          handleClose={handleCouponClose}
          theme={theme}
          color="primary"
        />
      )}
      {(tableType === 'edit' || tableType === 'create') && (
        (<DialogNewCoupon
          open={open}
          getCoupons={getCoupons}
          prodType={tableType}
          tampData={tamp}
          handleClose={handleCouponClose}
          dialogRef={dialogRef}
          dialogTitle={tableType === 'create' ? '新增優惠券' : `編輯${tamp.title}`}
          dialogSubmitBtnText={tableType === 'edit' ? '儲存' : '新增'}
        />)
      )}
    </>
  )
}
