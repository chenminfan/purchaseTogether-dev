import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type CTableFromType = {
  children: JSX.Element,
  title: string,
  checkboxAllSelection: number,
  checkboxSelection: number,
  handleCheckboxDelete: () => void,
  handleProdOpen?: () => void,
}
export default function CTableFrom(props: CTableFromType) {
  const { children, title, checkboxAllSelection, checkboxSelection, handleCheckboxDelete, handleProdOpen } = props
  return (
    <Box component="section" sx={{ height: '100%' }}>
      <Typography variant="h4" component="div" sx={{ px: 3 }}>{title}</Typography>
      <Box component="div" sx={{ display: 'flex', justifyContent: 'flex-End', px: 3, paddingBottom: '12px', borderBottom: '1px solid #ddd' }}>
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
