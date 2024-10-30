import React, { useMemo, useEffect, useRef, useState, useContext } from 'react'
import Pagination from '@components/backend/Pagination';
import CTableFrom from '@components/backend/paper/TableFrom';
import { TableContent } from '@provider/TableProvider/TableContent'
import DialogEditOrders from './DialogEditOrders';
import DialogDeleteOrders from './DialogDeleteOrders';
import {
  getBackendOrdersApi,
} from '@api/Apis'

import { createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';

import { OrdersType } from '@typeTS/Orders'
import { PaginationType } from '@typeTS/PaginationType'


export default function BackendOrders() {
  const [ordersData, setOrdersData] = useState<OrdersType[]>([]);
  const [page, setPage] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
  });
  const [state, dispatch] = useContext<any>(TableContent);
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const columns = [
    { field: 'create_at', headerName: '訂單日期', width: 120 },
    { field: 'id', headerName: '訂單編號', width: 120 },
    { field: 'is_paid', align: 'center', headerName: '付款', width: 100, },
    { field: 'message', align: 'center', headerName: '備註', width: 100, },
    { field: 'products', align: 'center', headerName: '產品資訊', width: 150, },
    { field: 'user', align: 'center', headerName: '訂單人', width: 150, },
    { field: 'tool', headerName: '', width: 180, },

  ];
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortOrderID, setSortOrderID] = useState('id');
  const [tableType, setTableType] = useState('');
  const [tamp, setTamp] = useState<OrdersType>(state.dataTamp);
  const getOrders = async (getPage = 1) => {
    const orderRes = await getBackendOrdersApi(getPage)
    setOrdersData(orderRes.data.orders)
    isLoadingRef.current = false;
    setLoadingPage(false)
    setPage(orderRes.data.pagination)
    dispatch({
      type: 'RE_RENDER_CHECKBOX',
      table: { dataTamp: orderRes.data.pagination },
      tableData: ordersData,
    })
  }
  const dataValue = (value) => {
    const DATE = value
    let date = DATE.getDate().toString(); //15
    let month = (DATE.getMonth() + 1).toString()  //6
    let year = DATE.getFullYear().toString();  //2016
    if (month.length < 2) {
      month = '0' + month
    }
    if (date.length < 2) {
      date = '0' + date
    }
    return [year, month, date].join('-')
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
  const SORT_DATA = useMemo(() => {
    return [...ordersData]
      .sort(getSort(sortOrder, sortOrderID))
  }, [ordersData, sortOrder, sortOrderID])
  // 排序 end
  useEffect(() => {
    getOrders();

  }, [])

  const handleOrderOpen = (type, order) => {
    setTamp(order);
    setOpen(true);
    setTableType(type);
  }
  const handleOrderDeleteOpen = (type, order) => {
    setTamp(order);
    setOpen(true);
    setTableType(type);
  }
  const handleOrderClose = (reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };
  const dialogRef = useRef<HTMLInputElement>(null)
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
      tableData: ordersData
    })
  }
  const CHECK_DATA_LENGTH = state.dataTamp.length > 1;
  if (loadingPage) {
    return (
      <Box component="div"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '350px' }}>
        <CircularProgress />
      </Box>
    )
  } else if (ordersData.length === 0) {
    return (
      <Box component="div"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '350px' }}>
        暫無資料
      </Box>
    )
  }
  return (
    <>
      <CTableFrom
        title="訂單列表"
        checkboxAllSelection={ordersData.length}
        checkboxSelection={state.dataTamp.length}
        handleCheckboxDelete={() => { handleClickDelete('allDelete') }}>
        <>
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
                          handleChangeCheckAll(e, ordersData)
                        }}
                      />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell
                        key={col.field}
                        style={{ minWidth: col.width }}>
                        <TableSortLabel
                          active={sortOrderID === col.field}
                          // direction={sortOrder ? sortOrder : 'asc'}
                          onClick={() => handleSortOrder(col.field)}
                        >
                          {col.headerName}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SORT_DATA.map((row) => (
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
                      <TableCell>{dataValue(row.due_date)}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.percent}</TableCell>
                      <TableCell>{dataValue(row.due_date)}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                      <TableCell>
                        <Button
                          disabled={CHECK_DATA_LENGTH}
                          onClick={() => handleOrderOpen('edit', row)}
                        >
                          編輯
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          disabled={CHECK_DATA_LENGTH}
                          onClick={() => handleOrderDeleteOpen('delete', row)}
                        >
                          刪除
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Pagination page={page} getPagination={getOrders} pageLink="#/backend/product" />
        </>
      </CTableFrom>
      {tableType === 'delete' && (
        <DialogDeleteOrders
          open={open}
          getOrders={getOrders}
          orderType={tableType}
          tampData={tamp}
          handleClose={handleOrderClose}
          theme={theme}
          color="primary"
        />
      )}
      {tableType === 'allDelete' && (
        <DialogDeleteOrders
          open={open}
          getOrders={getOrders}
          orderType={tableType}
          tampData={state.dataTamp}
          handleClose={handleOrderClose}
          theme={theme}
          color="primary"
        />
      )}
      {(tableType === 'edit' || tableType === 'create') && (
        (<DialogEditOrders
          open={open}
          getOrders={getOrders}
          prodType={tableType}
          tampData={tamp}
          handleClose={handleOrderClose}
          dialogRef={dialogRef}
          dialogTitle={`編輯${tamp.title}`}
          dialogSubmitBtnText={tableType === 'edit' ? '儲存' : '新增'}
        />)
      )}
    </>
  )
}
