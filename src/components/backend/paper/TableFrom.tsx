import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

type CTableFromType = {
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
  const { children, title, checkboxAllSelection, checkboxSelection, handleCheckboxDelete, handleProdOpen, search = '', handleChangeInput, handleChangeInputBtn } = props
  return (
    <Box component="section" sx={{ height: '100%' }}>
      <Typography variant="h4" component="div" sx={{ px: 3 }}>{title}</Typography>
      <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', p: 3, paddingBottom: '12px', borderBottom: '1px solid #ddd' }}>
        <Box component="div" sx={{
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
        </Box>
        {checkboxSelection !== 0 && (
          <Button
            variant="contained"
            color="error"
            onClick={handleCheckboxDelete}
          >
            {checkboxSelection === checkboxAllSelection ? '全部刪除' : '刪除'}
          </Button>
        )}
        {checkboxSelection === 0 && (
          <Button
            variant="contained"
            sx={{ marginLeft: checkboxSelection > 1 ? '12px' : '' }}
            onClick={handleProdOpen}
          >
            新增商品
          </Button>
        )}

      </Box>
      {children}
    </Box>
  )
}
