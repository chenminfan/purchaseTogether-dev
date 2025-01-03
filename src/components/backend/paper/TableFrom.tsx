import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

type CTableFromType = {
  isSearch?: boolean,
  isNewButton?: boolean,
  children: JSX.Element | JSX.Element[]
  title: string,
  checkboxAllSelection: number,
  checkboxSelection: number,
  handleCheckboxDelete: () => void,
  handleProdOpen?: () => void,
  search?: string,
  handleChangeInput?;
  handleChangeInputBtn?;
}
export default function CTableFrom(props: CTableFromType) {
  const { isSearch = false, isNewButton = true, children, title, checkboxAllSelection, checkboxSelection, handleCheckboxDelete, handleProdOpen, search = '', handleChangeInput, handleChangeInputBtn } = props
  return (
    <Box component="section" sx={{ height: '100%' }}>
      <Typography variant="h4" component="div" sx={{ px: 3 }}>{title}</Typography>
      <Box component="div" sx={
        { display: 'flex', justifyContent: `${isSearch ? 'space-between' : 'flex-end'}`, p: 3, paddingBottom: '12px', height: '76px', borderBottom: '1px solid #ddd' }
      }>
        {isSearch && <Box component="div" sx={{
          display: 'flex', width: '100%', maxWidth: "300px", fontSize: '12px'
        }}>
          {/* <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="商品類別"
            inputProps={{ 'aria-label': 'search google maps' }}
          /> */}
          <TextField
            fullWidth label="商品類別"
            defaultValue={search}
            size="small"
            onChange={handleChangeInput}
            type='search'
          />
          <IconButton type="button" sx={{ p: '4px 10px', fontSize: '12px', marginLeft: '12px' }} aria-label="search" onClick={handleChangeInputBtn}>
            <i className="bi bi-search"></i>
          </IconButton>
        </Box>}
        {checkboxSelection > 1 && (
          <Button
            variant="contained"
            color="error"
            onClick={handleCheckboxDelete}
            sx={[{ padding: '0 12px', lineHeight: '1.5' }, { '>i:nth-of-type(1)': { fontSize: '16px' } }]}
            startIcon={<i className="bi-trash3-fill"></i>}
          >
            {checkboxSelection === checkboxAllSelection ? '全部刪除' : '刪除'}
          </Button>
        )}
        {isNewButton && checkboxSelection === 0 && (
          <Button
            variant="contained"
            sx={[{ marginLeft: checkboxSelection > 1 ? '12px' : '', padding: '0 12px', lineHeight: '1.5' }, { '>i:nth-of-type(1)': { fontSize: '16px' } }]}
            onClick={handleProdOpen}
            startIcon={<i className="bi bi-plus-lg"></i>}
          >
            新增商品
          </Button>
        )}

      </Box>
      {children}
    </Box>
  )
}
