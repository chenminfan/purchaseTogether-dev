import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import DialogNewProds from './DialogNewProds';
import {
  getBackendProducts,
} from '../../../data/Apis'


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
  const [data, setData] = useState([]);
  const [prodData, setProdData] = useState([]);
  const [page, setPage] = useState([]);
  const [selected, setSelected] = React.useState([]);
  useEffect(() => {
    (async () => {
      const productRes = await getBackendProducts()
      setData(productRes.data)
      setProdData(productRes.data.products)
      setPage(productRes.data.pagination)
    })()
  }, [])
  // console.log(data)
  const columns = [
    {
      field: 'imageUrl',
      headerName: '圖片',
      width: 100,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: '品名', width: 100 },
    { field: 'category', headerName: '分類', width: 120 },
    { field: 'content', headerName: '內容', width: 200 },
    { field: 'isEnabled', headerName: '狀態', width: 200, },
    { field: 'origin_price', headerName: '價格', width: 90, },
    { field: 'price', headerName: '售價', width: 90, },
    { field: 'tool', headerName: 'edit', width: 200, },

  ];
  const [open, setOpen] = React.useState(true);
  const handleProdOpen = () => {
    setOpen(true);
  }
  const handleProdClose = (e, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };
  const handleProdSubmit = () => setOpen(false);

  const dialogRef = useRef(null)
  // console.log()
  useEffect(() => {
    // dialogRef.current
  })
  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <Typography variant="h4" component="div">產品列表</Typography>
        <Box component="div" sx={{ display: 'flex', marginBottom: '12px' }}>
          <Button sx={{ marginLeft: 'auto' }} onClick={handleProdOpen}>新增商品</Button>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: '100%', }}>
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
                    <TableCell key={col.field} style={{ width: col.width }}>{col.headerName}</TableCell>
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
                        <div className='img_box'><img src={row.imageUrl} alt="" /></div>
                      </TableCell>
                      {/* <TableCell component="th" scope="row">{row.id} </TableCell> */}
                      <TableCell>{row.id} </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell><div className="text">{row.content}</div></TableCell>
                      <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                      <TableCell align="right">{row.origin_price}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell>
                        <Button>編輯</Button>
                        <Button>刪除</Button>
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
      <DialogNewProds
        open={open}
        dialogRef={dialogRef}
        handleProdClose={handleProdClose}
      />
    </>
  )
}
