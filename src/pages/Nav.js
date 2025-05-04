import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Button,
  Stack,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Switch,
  Dropdown,
  ListDivider,
  ListItemDecorator,
  MenuButton,
} from "@mui/joy";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import {
  AiFillMoon,
  AiFillSun,
  AiOutlineCheck,
  AiOutlineLogout,
  AiOutlineProfile,
} from "react-icons/ai";
import { useColorScheme } from "@mui/joy/styles";

function Navbar({ drawerIsOpen }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, setMode } = useColorScheme();

  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("my-app-theme-dark");
    return saved !== null ? JSON.parse(saved) : false;
  });
  const check = mode === "dark";
  useEffect(() => {
    localStorage.setItem("my-app-theme-dark", JSON.stringify(checked));
    setMode(checked ? "dark" : "light");
  }, [checked, setMode]);

  function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem("theme") || "dark";

    if (currentTheme === "dark") {
      root.style.setProperty("--background-color", "#ffffff");
      localStorage.setItem("theme", "light");
    } else {
      root.style.setProperty("--background-color", "hsl(240, 10%, 3.9%)");
      localStorage.setItem("theme", "dark");
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };
  console.log(user);

  return (
    <Grid
      sx={{
        px: 2,
        py: 2,
        bgcolor: mode === "light" ? "#f2f2f2" : "hsl(240, 10%, 3.9%)", //
        // border: "0.5px solid rgba(229, 231, 235, 0.14)",
        // borderTop: "0px solid",
        // boxShadow:
        //   "      rgba(72, 72, 75, 0.25) 70px 70px 100px -20px,  rgba(238, 229, 229, 0.3) 20px 20px 60px -30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "7px",
        position: "sticky",
        top: 0,
        marginTop: "-0.5%",
        // width: "99%",
        zIndex: drawerIsOpen ? null : 9999,
        // backdropFilter: "blur(20px)",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography level="h4" fontWeight="lg" sx={{}}>
          FinTrack
        </Typography>
      </Link>

      <Stack direction="row" spacing={2} alignItems="center">
        {user ? (
          <>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                justifyContent: "center",
                // bgcolor: "rgba(229, 231, 235, 0.14)",
                borderRadius: "5px",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily="monospace"
                visibility={!checked ? null : "hidden"}
              >
                Light Mode
              </Typography>

              <Switch
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  toggleTheme();
                }}
                sx={{
                  "--Switch-trackRadius": "99px",
                  "--Switch-trackWidth": "70px",
                  "--Switch-trackHeight": "40px",
                  "--Switch-thumbSize": "24px",
                  "--Switch-gap": "10px",
                  padding: "4px",
                }}
                slotProps={{
                  thumb: {
                    children: checked ? (
                      <AiFillMoon size={16} />
                    ) : (
                      <AiFillSun size={16} />
                    ),
                    sx: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                }}
              />
              <Typography
                fontFamily="monospace"
                visibility={checked ? null : "hidden"}
              >
                Dark Mode
              </Typography>
            </Grid>{" "}
            {/* <Dropdown>
              <IconButton onClick={handleMenuOpen}>
                <Avatar src={user?.profile_picture}>{user?.name[0]}</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                placement="bottom-end"
                sx={{ zIndex: 99999 }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Dropdown> */}
            <Dropdown>
              <MenuButton size="sm" variant="plain" color="transparent">
                {" "}
                <Avatar src={user?.profile_picture}>{user?.name[0]}</Avatar>
              </MenuButton>
              <Menu
                size="sm"
                sx={{
                  zIndex: 99999,
                }}
                placement="bottom"
              >
                <MenuItem>
                  <AiOutlineProfile /> Profile
                </MenuItem>
                <MenuItem>
                  <ListItemDecorator />
                  My account
                </MenuItem>
                <ListDivider />
                <MenuItem onClick={handleLogout}>
                  <AiOutlineLogout />
                  Logout
                </MenuItem>
              </Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Switch
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                toggleTheme();
              }}
              sx={{
                "--Switch-trackRadius": "99px",
                "--Switch-trackWidth": "70px",
                "--Switch-trackHeight": "40px",
                "--Switch-thumbSize": "24px",
                "--Switch-gap": "10px",
                padding: "4px",
              }}
              slotProps={{
                thumb: {
                  children: checked ? (
                    <AiFillMoon size={16} />
                  ) : (
                    <AiFillSun size={16} />
                  ),
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              }}
            />
            <Link
              to="/login"
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                "&:hover .hoverLabel": {
                  display: "none",
                },
              }}
            >
              <IconButton
                variant="soft"
                color="transparent"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  "&:hover + .hoverLabel": {
                    opacity: 1,
                  },
                }}
              >
                <LoginIcon
                  sx={{ color: mode === "light" ? "#333" : "inherit" }}
                />
              </IconButton>

              <Box
                className="hoverLabel"
                sx={{
                  zIndex: 1,
                  color: mode === "light" ? "black" : "white",
                  fontSize: "0.9rem",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  justifyContent: "flex-start",
                  pointerEvents: "none",
                  cursor: "default",
                  fontFamily: "monospace",
                }}
              >
                Login
              </Box>
            </Link>

            <Link
              to="/register"
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                "&:hover .hoverLabel": {
                  display: "none", // hidden by default, so it takes no space
                },
              }}
            >
              <IconButton
                variant="soft"
                color="transparent"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  "&:hover + .hoverLabel": {
                    opacity: 1,
                  },
                }}
              >
                <PersonAddAltOutlinedIcon
                  sx={{ color: mode === "light" ? "#333" : "inherit" }}
                />
              </IconButton>

              <Box
                className="hoverLabel"
                sx={{
                  zIndex: 1,
                  color: mode === "light" ? "black" : "white",
                  fontSize: "0.9rem",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  justifyContent: "flex-start",
                  pointerEvents: "none",
                  cursor: "default",
                  fontFamily: "monospace",
                }}
              >
                Sign Up
              </Box>
            </Link>
          </>
        )}
      </Stack>
    </Grid>
  );
}

export default Navbar;
