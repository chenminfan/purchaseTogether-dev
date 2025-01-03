import { useMemo, useEffect, useRef, useState, useContext } from 'react'
import Pagination from '@components/backend/Pagination';
import CTableFrom from '@components/backend/paper/TableFrom';
import { TableContent, handleTableCheckbox } from '@provider/TableProvider/TableContent'
import DialogNewProds from './DialogNewProds';
import DialogDeleteProds from './DialogDeleteProds';
import {
  getBackendProductsApi,
  getBackendProductsCategoryApi
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
import { TableColumns } from '@typeTS/TableColumns'
import { PaginationType } from '@typeTS/PaginationType'
import { ProductsType } from '@typeTS/Products'
import { getTableSort, handleTableSort, handleTableOrder } from '@api/utilities/tableSort';
type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick';
export default function BackendProducts() {
  const [prodData, setProdData] = useState<ProductsType[]>([]);
  const [page, setPage] = useState<PaginationType>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  });
  const [state, dispatch] = useContext<any>(TableContent);
  const isLoadingRef = useRef(true)
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [sortOrderID, setSortOrderID] = useState<string>('');
  const [tableType, setTableType] = useState<string>('');
  const [tamp, setTamp] = useState<ProductsType>(state.dataTamp);

  const COLUMNS: TableColumns[] = [
    {
      field: 'imageUrl',
      headerName: '圖片',
      width: 90,
      // valueGetter: (value, row) => `${prodData.firstName || ''} ${prodData.lastName || ''}`,
    },
    { field: 'title', headerName: '品名', width: 180 },
    // { field: 'category', headerName: '分類', width: 120 },
    // { field: 'content', headerName: '內容', width: 200 },
    { field: 'imagesUrl', headerName: '小圖', width: 200, },
    { field: 'is_enabled', headerName: '狀態', width: 90, },
    { field: 'origin_price', headerName: '價格', width: 90, },
    { field: 'price', headerName: '售價', width: 90, },
  ];

  // 搜尋
  const [search, setSearch] = useState('')
  const [searchBTN, setSearchBTN] = useState('')

  // 搜尋

  // 排序 start
  const handleSortOrder = handleTableOrder(sortOrderID, sortOrder, setSortOrder, setSortOrderID)
  const newSortOrder = handleTableSort()
  const getSort = getTableSort(newSortOrder)
  // 排序 end
  const categoryId = Array.from(new Set(prodData.map((item) => item.category))).find((item) => item)

  const getProds = async (getPage = 1, category = searchBTN) => {
    if (category !== '') {
      const productRes = await getBackendProductsCategoryApi(getPage, category)
      setProdData(productRes.data.products)
      setPage(productRes.data.pagination)
      handleTableCheckbox(dispatch, productRes, prodData);
    } else {
      const productRes = await getBackendProductsApi(getPage)
      setProdData(productRes.data.products)
      isLoadingRef.current = false;
      setLoadingPage(false)
      setPage(productRes.data.pagination)
      handleTableCheckbox(dispatch, productRes, prodData);
    }
  }

  const SEARCH_DATA = useMemo(() => {
    return [...prodData
      .filter((item) => item.category.match(searchBTN))]
      .sort(getSort(sortOrder, sortOrderID))
  }, [searchBTN, prodData, sortOrder, sortOrderID])


  useEffect(() => {
    getProds(1, searchBTN);
  }, [searchBTN])

  const handleChangeInput = (e: any) => {
    setSearch(e.target.value)
    return
  }

  const handleChangeInputBtn = () => {
    setSearchBTN(search)
    getProds()
  }

  const handleProdOpen = (type: string, prod) => {
    setTamp(prod);
    setOpen(true);
    setTableType(type)
  }
  const handleProdDeleteOpen = (type: string, prod) => {
    setTamp(prod);
    setOpen(true);
    setTableType(type);
  }
  const handleProdClose = (reason: CloseReason) => {
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
  const CHECK_STATE = (newData: object) => state.dataTamp.includes(newData)
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


  if (loadingPage) {
    return (
      <Box ref={isLoadingRef} component="div"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '350px' }}>
        <CircularProgress />
      </Box>
    )
  } else if (searchBTN !== categoryId && prodData.length === 0) {
    return (
      <CTableFrom
        isSearch
        title="產品列表"
        checkboxAllSelection={prodData.length}
        checkboxSelection={state.dataTamp.length}
        handleCheckboxDelete={() => { handleClickDelete('allDelete') }}
        handleProdOpen={() => { handleProdOpen('create', {}) }}
        search={search}
        handleChangeInput={(e) => { handleChangeInput(e) }}
        handleChangeInputBtn={() => { handleChangeInputBtn() }}
      >
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '350px' }}>
          搜尋的類別暫無資料
        </Box>
      </CTableFrom>
    )
  } else if (searchBTN === '' && prodData.length === 0) {
    return (
      <Box component="div"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', maxHeight: '350px' }}>
        暫無資料
      </Box>
    )
  }
  return (
    <>
      {/* <>{JSON.stringify(sortData)}</> */}
      <CTableFrom
        isSearch
        title="產品列表"
        checkboxAllSelection={prodData.length}
        checkboxSelection={state.dataTamp.length}
        handleCheckboxDelete={() => { handleClickDelete('allDelete') }}
        handleProdOpen={() => { handleProdOpen('create', {}) }}
        search={search}
        handleChangeInput={(e) => { handleChangeInput(e) }}
        handleChangeInputBtn={() => { handleChangeInputBtn() }}
      >
        <>
          <TableContainer sx={{ height: 'calc(100% - 182px)', minWidth: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
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
                  {COLUMNS.map((col) => (
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
                {SEARCH_DATA.map((row) => {
                  const Filter_IMAGE = row.imagesUrl?.filter((item) => item.length > 0 && item.includes('https://' || 'http://'))
                  return (
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
                      <TableCell>
                        {row.title}
                      </TableCell>
                      {/* <TableCell>{row.category}</TableCell> */}
                      {/* <TableCell><div className="text">{row.content}</div></TableCell> */}
                      <TableCell align="center" sx={[
                        { '.row-image': { display: 'flex' } },
                        { '.img_box + .img_box': { marginLeft: '4px' } },
                        { '.img_box': { width: '30px', height: '30px' } }
                      ]}>
                        <div className="row-image">
                          { }
                          {Filter_IMAGE.map((item, index) => (
                            <div className='img_box' key={`Filter_IMAGE-img${index}`}><img src={item} alt={row.id} /></div>))}
                        </div>

                      </TableCell>
                      <TableCell>{row.is_enabled ? '啟用' : '未啟用'}</TableCell>
                      <TableCell align="right">{row.origin_price.toLocaleString('zh-TW')}</TableCell>
                      <TableCell align="right">{row.price.toLocaleString('zh-TW')}</TableCell>
                      <TableCell>
                        <Button
                          disabled={CHECK_DATA_LENGTH}
                          variant="contained"
                          onClick={() => handleProdOpen('edit', row)}
                          sx={[
                            { padding: '4px', lineHeight: '1.5', minWidth: '55px', boxShadow: 'none' }
                          ]}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>

                      </TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          disabled={CHECK_DATA_LENGTH}
                          variant="contained"
                          onClick={() => handleProdDeleteOpen('delete', row)}
                          sx={[
                            { padding: '4px', lineHeight: '1.5', minWidth: '55px', boxShadow: 'none' }
                          ]}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Pagination page={page} getPagination={getProds} pageLink="#/backend/product" />
          </Box>
        </>
      </CTableFrom>
      {tableType === 'delete' && (
        <DialogDeleteProds
          open={open}
          searchWord={searchBTN}
          page={page.current_page}
          getProds={getProds}
          prodType={tableType}
          tampData={tamp}
          handleClose={handleProdClose}
          theme={theme}
          color="primary"
        />
      )}
      {tableType === "allDelete" && (
        <DialogDeleteProds
          open={open}
          searchWord={searchBTN}
          page={page.current_page}
          getProds={getProds}
          prodType={tableType}
          tampDataALL={state.dataTamp}
          handleClose={handleProdClose}
          theme={theme}
          color="primary"
        />
      )}
      {(tableType === 'edit' || tableType === 'create') && (
        (<DialogNewProds
          open={open}
          searchWord={searchBTN}
          page={page.current_page}
          getProds={getProds}
          prodType={tableType}
          tampData={tamp}
          handleClose={handleProdClose}
          dialogTitle={tableType === 'create' ? '新增商品' : `編輯${tamp.title}`}
          dialogSubmitBtnText={tableType === 'edit' ? '儲存' : '新增'}
        />)
      )}
    </>
  )
}