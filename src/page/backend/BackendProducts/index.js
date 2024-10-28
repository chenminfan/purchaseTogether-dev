import React, { useEffect, useRef, useState } from 'react'
import PaginationComponents from '../../../components/Pagination';
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
import { sassTrue } from 'sass';

export default function BackendProducts() {
  const [prodData, setProdData] = useState([]);
  const [page, setPage] = useState([]);
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
  const [type, setType] = useState('');
  const [tamp, setTamp] = useState('');
  const [checkData, setCheckData] = useState([]);
  const handleProdOpen = (type, prod) => {
    setTamp(prod);
    setType(type);
    setOpen(true);
  }
  const handleProdDeleteOpen = (type, prod) => {
    setTamp(prod);
    setType(type);
    setOpen(true);
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

  const getAllDele = () => {
    setType('allDelete');
    setOpen(true);
  }
  // 當畫面有觸發其他function，useCallback避免被其他function re render
  const handleChangeCheck = (e, data) => {
    const { checked } = e.target;
    if (checked) {
      setCheckData([...checkData, data])
    } else {
      setCheckData(checkData.filter((item) => item !== data))
    }
    setNewIndexCheck(data === checkData)
  }
  const INDEX_CHECK = (newData) => checkData.includes(newData)
  const [newIndexCheck, setNewIndexCheck] = useState(INDEX_CHECK(prodData));
  const handleChangeCheckAll = (e, data) => {
    const { checked } = e.target
    if (checked) {
      const newSelected = data.map((item) => item)
      setCheckData(newSelected)
      setNewIndexCheck(data === prodData)
    } else {
      setCheckData([])
      setNewIndexCheck(false)
    }
  }
  const getProds = async (page = 1) => {
    const productRes = await getBackendProductsApi(page)
    setProdData(productRes.data.products)
    setPage(productRes.data.pagination)
    setNewIndexCheck(productRes.data.products === prodData)
  }

  useEffect(() => {
    getProds();
  }, [])
  console.log(checkData)
  console.log(newIndexCheck)
  const checkDataLength = checkData.length > 1;
  return (
    <>
      <Box component="section">
        <Typography variant="h4" component="div">產品列表</Typography>
        <Box component="div" sx={{ display: 'flex', justifyContent: 'flex-End', marginBottom: '12px' }}>
          {checkDataLength && <Button
            variant="contained"
            color="error"
            onClick={() => getAllDele()}
          >
            {checkData.length === prodData.length ? '全部刪除' : '刪除'}
          </Button>}
          <Button
            variant="contained"
            sx={{ marginLeft: checkDataLength ? '12px' : '' }}
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
                      checked={newIndexCheck}
                      onChange={(e) => {
                        handleChangeCheckAll(e, prodData)
                      }}
                    />
                  </TableCell>
                  {columns.map((col) => {
                    return (
                      <TableCell key={col.field} style={{ minWidth: col.width }}>{col.headerName}</TableCell>
                    )
                  })}
                  {!checkDataLength && <TableCell style={{ minWidth: 160 }}>

                  </TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {prodData.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={INDEX_CHECK(row)}
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
                      {!checkDataLength && (
                        <TableCell>
                          <Button
                            onClick={() => handleProdOpen('edit', row)}
                          >編輯</Button>
                          <Button
                            color="error"
                            onClick={() => handleProdDeleteOpen('delete', row)}
                          >刪除</Button>
                        </TableCell>
                      )}

                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper >


        <PaginationComponents page={page} getPagination={getProds} />

      </Box >
      {type === 'delete' && (
        <DialogNewProds
          open={type === 'delete' && open}
          getProds={getProds}
          prodType={type}
          tampData={tamp}
          handleClose={handleProdClose}
          theme={theme}
          color="primary"
        />
      )}
      {(type === 'edit ' || type === 'create') && (
        (<DialogNewProds
          handleClose={handleProdClose}
          getProds={getProds}
          prodType={type}
          tampData={tamp}
          open={(type === 'edit ' || type === 'create') && open}
          dialogRef={dialogRef}
          dialogTitle={type === 'create' ? '新增商品' : `編輯${tamp.title}`}
          dialogSubmitBtnText={type === 'edit' ? '儲存' : '新增'}
        />)
      )}
      {type === 'allDelete' && (
        <DialogNewProds
          open={type === 'allDelete' && open}
          getProds={getProds}
          prodType={type}
          tampData={checkData}
          handleClose={handleProdClose}
          theme={theme}
          color="primary"
        />
      )}
    </>
  )
}
