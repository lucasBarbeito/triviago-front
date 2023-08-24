"use client";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/navigation';

const ResponsiveAppBar= () =>  {
  const settings = ['Mi perfil', 'Cerrar sesión'];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    router.push('/profile');
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    router.push('/logout');
  };

  const handleLogoClick = () => {
    router.push('/home');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00CC66' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton onClick={handleLogoClick} color="inherit">
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            onClick={handleLogoClick}
            component="a"
            href="/"
            sx={{
              cursor: 'pointer',
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              width: 1440,
              height:80,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {setting === 'Profile' ? (
                      <a href="/profile">{setting}</a>
                    ) : (
                      <a href="/logout">{setting}</a>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
