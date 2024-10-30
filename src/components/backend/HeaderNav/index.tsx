import React, { forwardRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

export type NavLeftItemsType = {
  nameId?: number,
  name: string,
  icon: string,
  link: string,
};
export const navLeftItems: NavLeftItemsType[] = [
  { nameId: 1, name: '產品列表', icon: 'bi-box-seam', link: '/backend/product' },
  { nameId: 2, name: '優惠券列表', icon: 'bi-ticket-perforated', link: '/backend/coupon' },
  { nameId: 3, name: '訂單列表', icon: 'bi-folder-check', link: '/backend/order' }
];

const RouterLink = forwardRef<HTMLDivElement, NavLeftItemsType>(({ name, link, icon }: NavLeftItemsType, ref) => {
  const location = useLocation();
  return (
    <div ref={ref}>
      <ListItem>
        <ListItemButton
          component={NavLink}
          to={link}
          selected={location.pathname === link}
        >
          <ListItemIcon>
            <i className={`bi ${icon}`}></i>
          </ListItemIcon>
          {name}
        </ListItemButton>
      </ListItem>
    </div>
  )
})

export default function HeaderNav() {
  return (
    <List>
      {navLeftItems.map((item) => {
        return (
          <RouterLink key={item.nameId} name={item.name} link={item.link} icon={item.icon} />
        )
      })}
    </List >
  )

}





