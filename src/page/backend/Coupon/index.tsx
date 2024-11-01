import React, { useMemo, useEffect, useRef, useState, useContext } from 'react'
import Pagination from '@components/backend/Pagination';
import CTableFrom from '@components/backend/paper/TableFrom';
import { TableContent } from '@provider/TableProvider/TableContent'
import DialogNewCoupon from './DialogNewCoupon';
import DialogDeleteCoupon from './DialogDeleteCoupon';
import {
  getBackendCouponApi,
} from '@api/Apis'

import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { TableColumns } from '@typeTS/TableColumns'
import { CouponType } from '@typeTS/Coupon'
import { PaginationType } from '@typeTS/PaginationType'

export default function BackendCoupon() {
  const [couponData, setCouponData] = useState<CouponType[]>([]);
  const [page, setPage] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
  });
  const [state, dispatch] = useContext<any>(TableContent);
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortOrderID, setSortOrderID] = useState('');
  const [tableType, setTableType] = useState('');
  const [tamp, setTamp] = useState<CouponType>(state.dataTamp);
  const COLUMNS: TableColumns[] = [
    { field: 'title', headerName: '優惠券名稱', width: 120 },
    { field: 'percent', headerName: '折扣數', width: 120, },
    { field: 'due_date', headerName: '使用期限', width: 120, },
    { field: 'code', headerName: '優惠碼', width: 120, },
    { field: 'is_enabled', headerName: '狀態', width: 120, },

  ];
  const getCoupon = async (getPage = 1) => {
    const couponRes = await getBackendCouponApi(getPage)
    setCouponData(couponRes.data.coupons)
    isLoadingRef.current = false;
    setLoadingPage(false)
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
  const newSortOrder = (a: any, b: any, sortOrderID: string) => {
    if (a[sortOrderID] > b[sortOrderID]) {
      return -1;
    }
    if (a[sortOrderID] < b[sortOrderID]) {
      return 1;
    }
    return 0;
  }
  const getSort = (sortOrder: string, sortOrderID: string) => {
    return sortOrder === 'desc' ?
      (a: any, b: any) => newSortOrder(a, b, sortOrderID) :
      (a: any, b: any) => -newSortOrder(a, b, sortOrderID)
  }
  const SORT_DATA: CouponType[] = useMemo(() => {
    return [...couponData]
      .sort(getSort(sortOrder, sortOrderID))
  }, [couponData, sortOrder, sortOrderID])
  // 排序 end

  useEffect(() => {
    getCoupon();
  }, [])

  const dataValue = (value) => {
    const DATE = new Date(value)
    let date: string | number = DATE.getDate(); //15
    let month: string | number = (DATE.getMonth() + 1)  //6
    let year: string | number = DATE.getFullYear();  //2016
    if (month < 2) {
      month = '0' + month
    }
    if (date < 2) {
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
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5733'
      },
    },
  });

  const handleClickDelete = (type: string) => {
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
  if (loadingPage) {
    return (
      <Box component="div"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '350px' }}>
        <CircularProgress />
      </Box>
    )
  } else if (couponData.length === 0) {
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
        title="優惠券列表"
        checkboxAllSelection={couponData.length}
        checkboxSelection={state.dataTamp.length}
        handleCheckboxDelete={() => { handleClickDelete('allDelete') }}
        handleProdOpen={() => handleCouponOpen('create', {})}>
        <>
          <TableContainer sx={{ maxHeight: 'calc(100% - 154px)', minWidth: '100%' }}>
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
                  {COLUMNS.map((col) => (
                    <TableCell
                      key={col.field}
                      style={{ minWidth: col.width }}
                    >
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
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.percent}</TableCell>
                    <TableCell>{dataValue(row.due_date)}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                    <TableCell>
                      <Button
                        disabled={CHECK_DATA_LENGTH}
                        variant="outlined"
                        onClick={() => handleCouponOpen('edit', row)}
                      >
                        編輯
                      </Button>

                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        disabled={CHECK_DATA_LENGTH}
                        color="error"
                        onClick={() => handleCouponDeleteOpen('delete', row)}
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
            <Pagination page={page} getPagination={getCoupon} pageLink="#/backend/product" />
          </Box>

        </>
      </CTableFrom>
      {tableType === 'delete' && (
        <DialogDeleteCoupon
          open={open}
          getCoupon={getCoupon}
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
          getCoupon={getCoupon}
          couponType={tableType}
          tampDataALL={state.dataTamp}
          handleClose={handleCouponClose}
          theme={theme}
          color="primary"
        />
      )}
      {(tableType === 'edit' || tableType === 'create') && (
        (<DialogNewCoupon
          open={open}
          getCoupon={getCoupon}
          couponType={tableType}
          tampData={tamp}
          handleClose={handleCouponClose}
          dialogTitle={tableType === 'create' ? '新增優惠券' : `編輯${tamp.title}`}
          dialogSubmitBtnText={tableType === 'edit' ? '儲存' : '新增'}
        />)
      )}
    </>
  )
}
