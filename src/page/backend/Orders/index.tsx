import React, { useMemo, useEffect, useRef, useState, useContext } from 'react'
import Pagination from '@components/backend/Pagination';
import CTableFrom from '@components/backend/paper/TableFrom';
import { TableContent } from '@provider/TableProvider/TableContent'
import DialogEditOrders from './DialogEditOrders';
import DialogDeleteOrders from './DialogDeleteOrders';
import {
  getBackendOrdersApi,
} from '@api/Apis'
import { dataValue } from '@api/utilities/dataValue';
import { getTableSort, handleTableSort, handleTableOrder } from '@api/utilities/tableSort';

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

import { OrdersType } from '@typeTS/Orders'
import { PaginationType } from '@typeTS/PaginationType'

type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick';
export default function BackendOrders() {
  const [ordersData, setOrdersData] = useState<OrdersType[]>([]);
  const [ordersProdData, setOrdersProdData] = useState([]);
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
    { field: 'date', headerName: '訂單日期', width: 180 },
    { field: 'id', headerName: '訂單編號', width: 220 },
    { field: 'name', align: 'center', headerName: '訂單人', width: 120, },
    { field: 'message', align: 'center', headerName: '備註', width: 150, },
    { field: 'price', align: 'center', headerName: '訂單價格', width: 120, },
    { field: 'is_paid', align: 'center', headerName: '付款狀態', width: 120, },
  ];
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortOrderID, setSortOrderID] = useState('id');
  const [tableType, setTableType] = useState('');
  const [tamp, setTamp] = useState<OrdersType>(state.dataTamp);
  const getOrders = async (getPage = 1) => {
    const orderRes = await getBackendOrdersApi(getPage)
    setOrdersData(orderRes.data.orders)
    setOrdersProdData(orderRes.data.orders.products)
    isLoadingRef.current = false;
    setLoadingPage(false)
    setPage(orderRes.data.pagination)
    dispatch({
      type: 'RE_RENDER_CHECKBOX',
      table: { dataTamp: orderRes.data.pagination },
      tableData: ordersData,
    })
  }
  // 排序 start
  const handleSortOrder = handleTableOrder(sortOrderID, sortOrder, setSortOrder, setSortOrderID)
  const newSortOrder = handleTableSort()
  const getSort = getTableSort(newSortOrder)
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
  const handleOrderClose = (reason: CloseReason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };
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
        isNewButton={false}
        title="訂單列表"
        checkboxAllSelection={ordersData.length}
        checkboxSelection={state.dataTamp.length}
        handleCheckboxDelete={() => { handleClickDelete('allDelete') }}>
        <>
          <TableContainer sx={{ height: 'calc(100% - 182px)', minWidth: '100%' }}>
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
                  <TableCell style={{ minWidth: 160 }} colSpan={2} />
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
                    <TableCell>{dataValue(row.create_at)}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.user.name}</TableCell>
                    <TableCell>{row.message}</TableCell>
                    <TableCell>{Math.round(row.total).toLocaleString('zh-TW')}</TableCell>
                    <TableCell>{row.is_paid ? '付款' : '未付款'}</TableCell>
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
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Pagination page={page} getPagination={getOrders} pageLink="#/backend/order" />
          </Box>
        </>
      </CTableFrom>
      {tableType === 'delete' && (
        <DialogDeleteOrders
          open={open}
          page={page.current_page}
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
          page={page.current_page}
          getOrders={getOrders}
          orderType={tableType}
          tampDataALL={state.dataTamp}
          handleClose={handleOrderClose}
          theme={theme}
          color="primary"
        />
      )}
      {(tableType === 'edit') && (
        (<DialogEditOrders
          open={open}
          page={page.current_page}
          getOrders={getOrders}
          tampData={tamp}
          handleClose={handleOrderClose}
        />)
      )}
    </>
  )
}


