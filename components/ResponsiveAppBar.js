"use client";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from "@mui/material";


const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleProfileClick = () => {
    handleCloseUserMenu();
    router.push('/profile');
  };

  const handleLogoClick = () => {
    router.push('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.setItem('logout', 'true')
    // Redirige al usuario al inicio de sesión con el parámetro en la URL
    router.push('/login');
  }

  return (
    <AppBar
    position="static" 
    sx={{ backgroundColor: '#00CC66', margin: '0px', position: 'sticky', top: 0, paddingLeft: '20px',  paddingRight: '20px' }}
    >
    <div 
    style={{
      margin:0,
      paddingRight: 0,
      paddingLeft: 0,
    }}
    >
        <Toolbar disableGutters>
          <IconButton onClick={handleLogoClick} color="inherit">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={62}
              height={62}
              top={9}
              left={10}
              border={2}
              onClick={handleLogoClick}
              sx={{ cursor: 'pointer', mr: 2, display: { xs: 'none', md: 'flex' }, border: 1, opacity: 1 }}
            />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Image
              src="/assets/images/usericon.png"
              alt="usericon"
              width={51}
              height={51}
              top={12}
              left={1374}
              border={2}
              onClick={handleOpenUserMenu}
              sx={{ cursor: 'pointer', mr: 2, display: { xs: 'none', md: 'flex' }, border: 1, opacity: 1 }}
            />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem>
                  <Typography textAlign="center">
                    <Link href="/profile" style={{ color: 'black', textDecoration: 'none' }}>
                      Mi perfil
                      </Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                <Typography textAlign="center">
                  <Button onClick = {handleLogout}
                          style={{
                            color: 'black',
                            textDecoration: 'none',
                            padding :0,
                            textTransform:'none',
                            fontSize:'1rem'
                          }}
                  >
                    Cerrar Sesion
                    </Button>
                </Typography>
              </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
        </div>
    </AppBar>
  );
};

export default ResponsiveAppBar;
