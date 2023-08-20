import { Grid } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './../style/style.css';
import KPI from './DataSummary';
import GroupListManager from './GroupListManager';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const SideBar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [selectedItem, setSelectedItem] = useState('Group Lists');

  const menuItems = [
    { id: 1, label: 'Group Lists', component: <GroupListManager /> },
    { id: 2, label: 'KPI', component: <KPI /> },
  ];

  const handleListItemClick = (item: any | React.SetStateAction<null>) => {
    setSelectedItem(item);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          height: 100,
          backgroundColor: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: '700',
          borderBottom: '1px solid #ccc',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Link to='/'>
          {/* <MediaQuery minWidth={120}> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <img
                src={logo}
                alt='Logo'
                style={{
                  height: 'auto',
                  maxWidth: '20vh',
                }}
              />
            </Grid>
          </Grid>
          {/* </MediaQuery> */}
        </Link>
      </Toolbar>
      <Divider />
      <div style={{ 
        color: '#5BA5DB', 
        fontFamily: 'Barlow', 
        fontWeight: 500, }}>
        <h3 style={{ padding: 20 }}>Dashboard</h3>
        <List disablePadding>
          {menuItems.map(item => (
            <ListItem
              key={item.id}
              disablePadding
              button
              selected={selectedItem === item.label}
              onClick={() => handleListItemClick(item.label)}
            >
              <ListItemButton>
                <ListItem>{item.label}</ListItem>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          height: 100,
          backgroundColor: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: '700',
          borderBottom: '1px solid #ccc',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          justifyContent: 'center',
        }}
      >
        <Toolbar style={{ alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{
                display: { sm: 'none' },
                marginRight: 200,
              }}
            >
              <MenuIcon
                style={{
                  fontSize: 40,
                }}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div
          style={{
            marginTop: 100,
          }}
        >
          {selectedItem && menuItems.find(item => item.label === selectedItem)?.component}
        </div>
      </Box>
    </Box>
  );
};

export default SideBar;
