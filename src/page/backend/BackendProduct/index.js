import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import DialogNewProd from './DialogNewProd';
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
export default function BackendProduct() {
  const [prodData, setProdData] = useState([]);
  const [page, setPage] = useState([]);

  const getProds = async () => {
    const productRes = await getBackendProductsApi()
    setProdData(productRes.data.products)
    setPage(productRes.data.pagination)
  }
  useEffect(() => {
    getProds();
  }, [])
  const columns = [
    {
      field: 'imageUrl',
      headerName: '圖片',
      width: 90,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'title', headerName: '品名', width: 120 },
    { field: 'category', headerName: '分類', width: 120 },
    { field: 'content', headerName: '內容', width: 150 },
    { field: 'isEnabled', headerName: '狀態', width: 80, },
    { field: 'origin_price', headerName: '價格', width: 100, },
    { field: 'price', headerName: '售價', width: 100, },
    { field: 'tool', headerName: '', width: 180, },

  ];
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState('');
  const [tamp, setTamp] = useState('');
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
  return (
    <>
      <Box component="section">
        <Typography variant="h4" component="div">產品列表</Typography>
        <Box component="div" sx={{ display: 'flex', marginBottom: '12px' }}>
          <Button
            sx={{ marginLeft: 'auto' }}
            onClick={() => handleProdOpen('create', {})}
          >新增商品</Button>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 540, minWidth: '100%', }}>
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
                {prodData.map((row) => {
                  // const isItemSelected = selected.includes(row.id);
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
                      <TableCell sx={[{ '&>.img_box': { width: '50px', height: '50px' }, }]}>
                        <div className='img_box'><img src={row.imageUrl} alt={row.id} /></div>
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell><div className="text">{row.content}</div></TableCell>
                      <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                      <TableCell align="right">{row.origin_price.toLocaleString('zh-TW')}</TableCell>
                      <TableCell align="right">{row.price.toLocaleString('zh-TW')}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleProdOpen('edit', row)}
                        >編輯</Button>
                        <Button
                          color="error"
                          onClick={() => handleProdDeleteOpen('delete', row)}
                        >刪除</Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper >

        <nav className='page'>
          <ul className="page-box">
            <li className="page-item"><NavLink to={`/backend/product/`}><i className="bi bi-caret-left-fill"></i></NavLink></li>
            {[...Array(page.total_pages)].map((item, index) => (
              <li className="page-item" key={`item_${index}`}><NavLink to={`/backend/product/#${index + 1}`}>{index + 1}</NavLink></li>
            ))}
            <li className="page-item"><NavLink to={`/backend/product/`}><i className="bi bi-caret-right-fill"></i></NavLink></li>
          </ul>
        </nav>

      </Box >
      {type === 'delete' ? (
        <DialogDeleteProd
          open={type === 'delete' && open}
          getProds={getProds}
          prodType={type}
          tampData={tamp}
          handleClose={handleProdClose}
          theme={theme}
          color="primary"
        />
      ) : (<DialogNewProd
        handleClose={handleProdClose}
        getProds={getProds}
        prodType={type}
        tampData={tamp}
        open={type !== 'delete' && open}
        dialogRef={dialogRef}
        dialogTitle={type === 'create' ? '新增商品' : `編輯${tamp.title}`}
        dialogSubmitBtnText={type === 'edit' ? '儲存' : '新增'}
      />)}
    </>
  )
}
