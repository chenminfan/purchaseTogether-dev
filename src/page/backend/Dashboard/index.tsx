import React, { useEffect, useState } from 'react';
import SnackbarProvider from '@provider/SnackbarProvider'
import TableProvider from '@provider/TableProvider'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  postUserCheckApi,
} from '@api/Apis'
import './backend.scss'
import HeaderNav from '@components/backend/HeaderNav'
import CSnackbar from '@components/backend/Snackbar';


const DRAWER_WIDTH = 340;

export default function Dashboard(props) {
  const { window } = props;
  const navigate = useNavigate()
  const logout = () => {
    document.cookie = 'hexToken=;'
    navigate('/')
  }
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  axios.defaults.headers.common['Authorization'] = token
  useEffect(() => {
    if (!token) {
      return navigate('/')
    }
    (async () => {
      try {
        await postUserCheckApi();
      } catch (error: any) {
        if (!error.response.data.success) {
          navigate('/')
        }
      }
    })()
  }, [token, navigate])

  const CONTAINER =
    window !== undefined ? () => window().document.body : undefined;
  const navItems = [
    { nameId: 1, name: '公告資訊', icon: 'bi-box-seam', link: '/backend' },
    { nameId: 2, name: '登出', icon: 'bi-ticket-perforated', link: '/', handleClick: logout }];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
      },
      // dark: {
      //   main: '#000'
      // }
    },
  });
  return (
    <SnackbarProvider>
      <Box sx={{ display: 'flex', height: '100vh', mxaHeight: '100%' }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar component="nav"
            enableColorOnDark
            sx={{
              color: 'primary.main',
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              ml: { sm: `${DRAWER_WIDTH}px` },
            }}
          >
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { xs: 'block', sm: 'none', width: '52px', } }}>
                <ListItemIcon sx={{ color: '#000', maxWidth: '52px', minWidth: 'inherit' }}><i className="bi bi-list"></i></ListItemIcon>
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: '#000', flexGrow: 1, display: { xs: 'block', sm: 'none' } }}
              >
                後台管理
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                {navItems.map((navItem) => (
                  <Button
                    key={navItem.nameId}
                    href={`#${navItem.link}`}
                    variant="outlined"
                    sx={{ color: '#000' }}
                    onClick={navItem.handleClick}>
                    {navItem.name}
                  </Button>
                ))}
              </Box>
            </Toolbar>

          </AppBar>
        </ThemeProvider>

        <Box
          component="div"
          sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={CONTAINER}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
              },
            }}
          >
            <div>
              <Toolbar>
                <Typography
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >後台管理
                </Typography>
              </Toolbar>

              <Divider />
              <HeaderNav />
            </div>
          </Drawer>
          <nav>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: DRAWER_WIDTH,
                  background: '#f5f6fa',
                },
              }}
              open
            >
              <div>
                <Toolbar>
                  <Typography
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                    後台管理
                  </Typography>
                </Toolbar>

                <Divider />
                <HeaderNav />
              </div>
            </Drawer>
          </nav>
        </Box>
        {
          token && (
            <Box
              component="main"
              className="backend"
              sx={{
                flexGrow: 1,
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              }}
            >
              <TableProvider>
                <Outlet />
              </TableProvider>
            </Box>
          )
        }
        <CSnackbar />
      </Box >
    </SnackbarProvider>
  )
}
