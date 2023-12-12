import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { searchByTitle } from "../thunks/filterThunk";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../thunks/loginUserThunk";
import { RootState, AppDispatch } from "../store";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TheatersIcon from "@mui/icons-material/Theaters";

const settings = ["Account", "Watchlist", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${
        name.split(" ")[1] ? name.split(" ")[1][0] : ""
      }`,
      sx: {
        bgcolor: stringToColor(name),
      },
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* Convert string to hash */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    /* Convert hash to color */
    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginUserReducer.isLoggedIn
  );
  const username = useSelector(
    (state: RootState) => state.loginUserReducer.username
  );

  const dispatch: AppDispatch = useDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      // Check if searchTerm is not just empty spaces
      dispatch(searchByTitle(searchTerm));
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleIconClick = () => {
    navigate("/");
  };

  function handleMenuClick(setting: string): void {
    if (setting === "Account") {
      navigate("/account/edit");
    }
    if (setting === "Watchlist") {
      navigate("/watchlist");
    }
    if (setting === "Logout") {
      dispatch(logout(username));
    }
  }

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(45deg, #0f0f0f, #323232, #0d7377, #14ffec)",
        marginBottom: "3rem",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TheatersIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            onClick={handleIconClick}
          />
          <Typography
            onClick={handleIconClick}
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NAUTY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <TheatersIcon
            onClick={handleIconClick}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            onClick={handleIconClick}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NAUTY
          </Typography>

          <Box
            sx={{ flexGrow: 2.5, display: { xs: "none", md: "flex" } }}
          ></Box>

          <Box sx={{ flexGrow: 2.5 }}>
            <TextField
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Search"
              variant="outlined"
              size="small"
              style={{
                backgroundColor: "white",
                marginRight: "10px",
                borderRadius: "1rem",
              }}
            />
          </Box>
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {username ? (
                    <Avatar {...stringAvatar(username)} />
                  ) : (
                    <Avatar src="/broken-image.jpg" />
                  )}
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
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <IconButton onClick={() => navigate("/account/login")}>
                <LoginIcon style={{ color: "white" }} />
              </IconButton>

              <Box
                sx={{ flexGrow: 0.1, display: { xs: "none", md: "flex" } }}
              ></Box>

              <IconButton onClick={() => navigate("/account")}>
                <HowToRegIcon style={{ color: "white" }} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
