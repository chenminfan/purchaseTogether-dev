import React, { forwardRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

const navLeftItems = [
  { nameId: 1, name: '產品列表', icon: 'bi-box-seam', link: '/backend/product' },
  { nameId: 2, name: '優惠券列表', icon: 'bi-ticket-perforated', link: '/backend/coupon' },
  { nameId: 3, name: '訂單列表', icon: 'bi-folder-check', link: '/backend/order' },];

const RouterLink = forwardRef(({ item }, ref) => {
  const location = useLocation();
  return (
    <ListItem ref={ref} disablePadding role={undefined}>
      <ListItemButton
        component={NavLink}
        to={item.link}
        selected={location.pathname === item.link}
      >
        <ListItemIcon>
          <i className={`bi ${item.icon}`}></i>
        </ListItemIcon>
        {item.name}
      </ListItemButton>
    </ListItem>
  )
})
export default function HeaderNav() {

  return (
    <List>
      {navLeftItems.map((item) => {
        return (
          <RouterLink key={item.nameId} item={item} />
        )
      })}
    </List >
  )

}



