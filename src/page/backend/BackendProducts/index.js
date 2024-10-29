import React, { useEffect, useRef, useState, useContext } from 'react'
import PaginationComponents from '../../../components/Pagination';
import { TableContent } from '../../../provider/TableProvider/TableContent'
import DialogNewProds from './DialogNewProds';
import DialogDeleteProd from './DialogDeleteProd';
import {
  getBackendProductsApi,
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

export default function BackendProducts() {
  const [prodData, setProdData] = useState([]);
  const [page, setPage] = useState([]);
  const [state, dispatch] = useContext(TableContent);
  const columns = [
    {
      field: 'imageUrl',
      headerName: '圖片',
      width: 85,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'title', headerName: '品名', width: 120 },
    { field: 'category', headerName: '分類', width: 180 },
    { field: 'content', headerName: '內容', width: 200 },
    { field: 'isEnabled', headerName: '狀態', width: 80, },
    { field: 'origin_price', headerName: '價格', width: 100, },
    { field: 'price', headerName: '售價', width: 100, },

  ];
  const [open, setOpen] = useState(false);
  const [tableType, setTableType] = useState('');
  const [tamp, setTamp] = useState(state.dataTamp);
  const getProds = async (page = 1) => {
    const productRes = await getBackendProductsApi(page)
    setProdData(productRes.data.products)
    setPage(productRes.data.pagination)
    dispatch({
      type: 'RE_RENDER_CHECKBOX',
      table: { dataTamp: productRes.data.pagination },
      tableData: prodData,
    })
  }
  useEffect(() => {
    getProds();
  }, [])
  const handleProdOpen = (type, prod) => {
    setTamp(prod);
    setOpen(true);
    setTableType(type)
  }
  const handleProdDeleteOpen = (type, prod) => {
    setTamp(prod);
    setOpen(true);
    setTableType(type);
  }
  const handleProdClose = (reason) => {
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
      tableData: prodData
    })
  }
  const CHECK_DATA_LENGTH = state.dataTamp.length > 1;
  return (
    <>
      <Box component="section">
        <Typography variant="h4" component="div">產品列表</Typography>
        <Box component="div" sx={{ display: 'flex', justifyContent: 'flex-End', marginBottom: '12px' }}>
          {CHECK_DATA_LENGTH && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClickDelete('allDelete')}
            >
              {state.dataTamp.length === prodData.length ? '全部刪除' : '刪除'}
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ marginLeft: CHECK_DATA_LENGTH ? '12px' : '' }}
            onClick={() => handleProdOpen('create', {})}
          >
            新增商品
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
                        handleChangeCheckAll(e, prodData)
                      }}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.field} style={{ minWidth: col.width }}>{col.headerName}</TableCell>
                  ))}
                  {!CHECK_DATA_LENGTH && <TableCell style={{ minWidth: 160 }}>

                  </TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {prodData.map((row) => (
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
                    <TableCell sx={[{ '&>.img_box': { width: '50px', height: '50px' }, }]}>
                      <div className='img_box'><img src={row.imageUrl} alt={row.id} /></div>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell><div className="text">{row.content}</div></TableCell>
                    <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                    <TableCell align="right">{row.origin_price.toLocaleString('zh-TW')}</TableCell>
                    <TableCell align="right">{row.price.toLocaleString('zh-TW')}</TableCell>
                    {!CHECK_DATA_LENGTH && (
                      <TableCell>
                        <Button
                          onClick={() => handleProdOpen('edit', row)}
                        >
                          編輯
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleProdDeleteOpen('delete', row)}
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


        <PaginationComponents page={page} getPagination={getProds} />

      </Box >
      {tableType === 'delete' && (
        <DialogDeleteProd
          open={open}
          getProds={getProds}
          prodType={tableType}
          tampData={tamp}
          handleClose={handleProdClose}
          theme={theme}
          color="primary"
        />
      )
      }
      {tableType === "allDelete" && (
        <DialogDeleteProd
          open={open}
          getProds={getProds}
          prodType={tableType}
          tampData={state.dataTamp}
          handleClose={handleProdClose}
          theme={theme}
          color="primary"
        />
      )}

      {(tableType === 'edit' || tableType === 'create') && (
        (<DialogNewProds
          open={open}
          getProds={getProds}
          prodType={tableType}
          tampData={tamp}
          handleClose={handleProdClose}
          dialogRef={dialogRef}
          dialogTitle={tableType === 'create' ? '新增商品' : `編輯${tamp.title}`}
          dialogSubmitBtnText={tableType === 'edit' ? '儲存' : '新增'}
        />)
      )
      }
    </>
  )
}
