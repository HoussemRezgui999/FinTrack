import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  AiOutlineBarChart,
  AiOutlineMoneyCollect,
  AiOutlineSchedule,
  AiOutlineSetting,
  AiOutlineVerified,
  AiOutlineWallet,
  AiOutlineCaretRight,
  AiOutlineDollar,
  AiFillSun,
  AiFillMoon,
  AiOutlineMail,
  AiOutlineInbox,
  AiOutlineMenuFold,
  AiOutlineDashboard,
} from "react-icons/ai";
import {
  Divider,
  IconButton,
  ListItem,
  Switch,
  Avatar,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  List,
  Drawer,
  Typography,
  Grid,
  useColorScheme,
} from "@mui/joy";

const navItems = [
  {
    text: "Overview",
    icon: <AiOutlineDashboard />,
    path: "/dashboard",
  },
  {
    text: "Transactions",
    icon: <AiOutlineWallet />,
    path: "/transactions",
  },
  { text: "Categories", icon: <AiOutlineCaretRight />, path: "/categories" },
  { text: "Budgets", icon: <AiOutlineDollar />, path: "/budgets" },
  { text: "Reports", icon: <AiOutlineBarChart />, path: "/reports" },
  {
    text: "Scheduled Reports",
    icon: <AiOutlineSchedule />,
    path: "/scheduled-reports",
  },
  { text: "Verify Email", icon: <AiOutlineVerified />, path: "/verify-email" },
  { text: "Settings", icon: <AiOutlineSetting />, path: "/settings" },
];

const SideBar = ({ user, setDrawerIsOpen }) => {
  console.log({ user });
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const { mode, setMode } = useColorScheme();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    setDrawerIsOpen(newOpen);
  };

  const DrawerList = (
    <Grid
      sx={{
        px: 2,
        py: 2,
        width: "100%",
        zIndex: 9999,
        backgroundColor: mode === "light" ? "#f0f0f0" : "hsl(240, 10%, 3.9%)",
        height: "100%",
        // backdropFilter: "blur(5px)",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          justifyContent: "center",
          backgroundColor: mode === "light" ? "#f0f0f0" : "hsl(240, 10%, 3.9%)",

          borderRadius: "5px",
          width: "100%",
        }}
      >
        {/* <Button color="white" sx={{ gap: 1 }}>
          <AiFillSun color="white" />
          <Typography fontFamily="monospace">Light</Typography>
        </Button>
        <Divider orientation="vertical" />
        <Button color="white" sx={{ gap: 1 }}>
          <AiFillMoon color="white" />
          <Typography fontFamily="monospace">Dark</Typography>
        </Button> */}
        {/* <Switch size="lg" variant="soft" /> */}
      </Grid>

      {/* User info */}
      <Grid display="flex" alignItems="center" gap={2}>
        <Avatar />
        <Typography
          sx={{
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {user?.first_name || user?.last_name
            ? `${user.first_name} ${user.last_name}`
            : "Hello stranger :)"}
          <Typography sx={{ fontFamily: "monospace" }}>{user?.name}</Typography>
        </Typography>
      </Grid>

      {/* Navigation items */}
      <List sx={{}}>
        {navItems.map(({ text, icon, path }) => (
          <React.Fragment key={text}>
            <ListItemButton
              component={NavLink}
              to={path}
              sx={{
                borderRadius: 1,
                mb: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
              }}
              activeClassName="Mui-selected"
            >
              <ListItemDecorator
                sx={{ color: mode === "light" ? "black" : "white" }}
              >
                {icon}
              </ListItemDecorator>
              <ListItemContent
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "monospace",
                    color: mode === "light" ? "black" : "white",
                  },
                }}
              >
                {text}
              </ListItemContent>
            </ListItemButton>
            <Divider sx={{ color: "white", width: "90%", mx: "auto" }} />
          </React.Fragment>
        ))}
      </List>
      {/* if you still need a second section, you can repeat the same pattern */}
    </Grid>
  );

  return (
    <>
      {isSmall || isMedium ? (
        <div>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              display: "flex",
              justifyContent: "stretch",
              position: "fixed",
              height: "100%",

              background: "transparent",
            }}
          >
            <AiOutlineMenuFold />
          </IconButton>
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            variant="soft"
            size={isSmall ? "sm" : isMedium ? "md" : "lg"}
            sx={{ zIndex: 99999 }}
            PaperProps={{
              sx: {
                backgroundColor: "hsl(240, 10%, 3.9%)",
                // backdropFilter: "blur(5px)",
                height: "100%",
              },
            }}
          >
            {DrawerList}
          </Drawer>
        </div>
      ) : (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 2,
            py: 2,
            bgcolor:
              mode === "light" ? "#ebebeb" : "hsla(240, 7.70%, 2.50%, 0.15)",
            border:
              mode === "light"
                ? "0.5px solid hsla(240, 7.70%, 2.50%, 0.15)"
                : "0.5px solid rgba(229, 231, 235, 0.14)",
            gap: 2,
            width: "20%",
            // maxWidth: "20%",
            mt: 2,
            borderRadius: "7px",
            height: "80%",
            position: "fixed",
          }}
        >
          {/* Theme toggle */}

          {/* User info */}
          <Grid display="flex" alignItems="center" gap={2}>
            <Avatar />
            <Typography
              sx={{
                fontFamily: "monospace",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {user?.first_name || user?.last_name
                ? `${user.first_name} ${user.last_name}`
                : "Hello stranger :)"}
              <Typography
                sx={{
                  fontFamily: "monospace",
                  color: mode === "light" ? "#333" : null,
                }}
              >
                {user?.name}
              </Typography>
            </Typography>
          </Grid>

          {/* Navigation items */}
          <List sx={{}}>
            {navItems.map(({ text, icon, path }) => (
              <React.Fragment key={text}>
                <ListItemButton
                  component={NavLink}
                  to={path}
                  sx={{
                    borderRadius: "7px",
                    mb: 1,
                    display: "flex",
                    flexDirection: isMedium ? "column" : "row",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                  activeClassName="Mui-selected"
                >
                  <ListItemDecorator sx={{ color: "inherit" }}>
                    {icon}
                  </ListItemDecorator>
                  <ListItemContent sx={{ fontFamily: "monospace" }}>
                    {text}
                  </ListItemContent>
                </ListItemButton>
                <Divider sx={{ color: "inherit", width: "90%", mx: "auto" }} />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      )}
    </>
  );
};

export default SideBar;
