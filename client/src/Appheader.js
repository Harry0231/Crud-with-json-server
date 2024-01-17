import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Menu,
  Avatar,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";

function AppHeader() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [displayUsername, setDisplayUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowMenu(false);
    } else {
      setShowMenu(true);
      const username = sessionStorage.getItem("username");
      if (!username) {
        navigate("/login");
      } else {
        setDisplayUsername(username);
      }
    }
    return () => {
      setAnchorElUser(null);
    };
  }, [location, navigate]);

  const handleMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget || document.body);
  };

  const handleClose = () => {
    if (anchorElUser) {
      setAnchorElUser(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    toast.success(`${displayUsername} Logout successful`);
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  return (
    <div>
      {showMenu && (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  marginLeft: "auto",
                }}
              >
                Welcome {displayUsername}
              </Typography>

              <Link
                to={"/"}
                style={{
                  marginRight: "30px",
                }}
                onClick={(event) => handleMenuOpen(event)}
              >
                <Typography variant="h6">Home</Typography>
              </Link>

              <Link
                to={"/create"}
                style={{
                  marginRight: "30px",
                }}
              >
                <Typography variant="h6">Add-Data</Typography>
              </Link>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={(event) => handleMenuOpen(event)}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayUsername)}&size=40`}
                      alt="User Avatar"
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>
                    <PersonIcon sx={{ marginRight: 1 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ marginRight: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
}

export default AppHeader;
