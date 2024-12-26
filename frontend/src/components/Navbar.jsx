import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";

const Navbar = () => {
  const { user, login, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const pages = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            MyApp
          </Link>
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button key={page.name} color="inherit" component={Link} to={page.path}>
              {page.name}
            </Button>
          ))}
          {user ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={login}>
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={handleMenuClose}
                component={Link}
                to={page.path}
              >
                {page.name}
              </MenuItem>
            ))}
            <MenuItem onClick={handleMenuClose}>
              {user ? (
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={login}>
                  Login
                </Button>
              )}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;