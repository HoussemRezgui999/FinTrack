import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  Button,
  Divider,
  Input,
  Avatar,
  Box,
  FormControl,
  Grid,
  Icon,
  IconButton,
  Tooltip,
  Typography,
  SvgIcon,
  Alert,
  useColorScheme,
} from "@mui/joy";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import { AiOutlineStock, AiOutlineWarning } from "react-icons/ai";
import { ReactComponent as Arrow } from "../arrow-trend-down-svgrepo-com (5).svg";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { mode, setMode } = useColorScheme();

  const {
    register,
    fetchProfile,
    successfulCreation,
    resetSuccessfulCreation,
  } = useContext(AuthContext);
  console.log(successfulCreation);

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    resetSuccessfulCreation();
  }, [successfulCreation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const ok = await register(name, email, password);
    if (ok) {
      navigate("/login", {
        state: { successfulCreation: true },
      });
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  const arrowProps = {
    component: Arrow,
    inheritViewBox: true,
    sx: {
      color: mode === "light" ? "#333" : "#fff",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      fontSize: isSmall ? 50 : 80,
      transform: "rotate(105deg)",
      width: "75%",
      marginBottom: "-100%",
    },
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifySelf: "center",
        px: 2,
        py: 2,
        bgcolor: mode === "light" ? "#ebebeb" : "hsla(240, 7.70%, 2.50%, 0.15)", //
        border:
          mode === "light"
            ? "0.5px solid hsla(240, 7.70%, 2.50%, 0.15)"
            : "0.5px solid rgba(229, 231, 235, 0.14)",
        flexDirection: "column",
        gap: 5,
        width: "100%",
        maxWidth: isSmall ? "90%" : "40%",
        marginTop: isSmall ? "5%" : "2%",
        borderRadius: "7px",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          marginLeft: "auto ",
          alignSelf: "center",
          transform:
            "translateX(0%) translateY(-62%) rotate(-90deg) scaleX(-1)",
        }}
      >
        <SvgIcon {...arrowProps} />
      </div>
      <FormControl
        onSubmit={handleSubmit}
        style={{
          gap: 10,
          display: "flex",
          justifySelf: "center",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            lineHeight: 2,
            fontSize: "2.5rem",
            // letterSpacing: "-0.5rem",
            fontFamily: "monospace",
          }}
        >
          Sign Up
        </Typography>
        {error ? (
          <Alert color="danger" variant="plain">
            <AiOutlineWarning size={"3%"} />
            {error}
          </Alert>
        ) : (
          <></>
        )}

        <Box>
          <Typography
            sx={{
              // letterSpacing: "-0.5rem",
              fontFamily: "monospace",
            }}
          >
            User Name
          </Typography>
          <Input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box>
          <Typography
            sx={{
              // letterSpacing: "-0.5rem",
              fontFamily: "monospace",
            }}
          >
            Email
          </Typography>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        <Box>
          <Typography
            sx={{
              // letterSpacing: "-0.5rem",
              fontFamily: "monospace",
            }}
          >
            Password
          </Typography>{" "}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </Box>
        <Box>
          <Typography
            sx={{
              // letterSpacing: "-0.5rem",
              fontFamily: "monospace",
            }}
          >
            Confirm Password
          </Typography>{" "}
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </Box>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
          sx={{
            color: mode === "light" ? "black" : "inherit",
            border:
              mode === "light"
                ? "0.5px solid hsla(240, 7.70%, 2.50%, 0.15)"
                : "0.5px solid rgba(229, 231, 235, 0.14)",
            width: "40%",
            boxShadow: "3.1px 6.2px 6.2px hsl(0deg 0% 0% / 0.40)",
            "&:hover": {
              transform: "translateY(-5%)",
            },
            "&:hover .login": {
              color: "black",
            },
            alignSelf: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: 5,
          }}
        >
          <Typography className="login" fontFamily={"monospace"}>
            Register
          </Typography>
        </Button>
      </FormControl>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <IconButton
          type="submit"
          variant="outlined"
          sx={{
            color: "inherit",
            border: "0px solid rgba(229, 231, 235, 0.14)",
          }}
        >
          <Tooltip title="Sign Up with Google" arrow>
            <Typography>
              <FaGoogle size={25} />
            </Typography>
          </Tooltip>
        </IconButton>{" "}
        <IconButton
          type="submit"
          variant="outlined"
          sx={{
            color: "inherit",
            border: "0px solid rgba(229, 231, 235, 0.14)",
            "&:hover .faceBook": {
              visibility: "visible",
              display: "inline",
              transition: "opacity 0.3s ease",
              fontSize: "0.9rem",
              opacity: 1,
            },
          }}
        >
          <Tooltip title="Sign Up with Facebook" arrow>
            <Typography>
              <FaFacebookF size={25} />
            </Typography>
          </Tooltip>
        </IconButton>{" "}
      </Grid>{" "}
      <Divider>Or</Divider>
      <Link style={{ alignSelf: "center" }} to="/login">
        <Typography style={{ fontFamily: "monospace" }}>
          Already have have an account? Sign in.
        </Typography>
      </Link>
      <div
        style={{
          position: "relative",
          // marginLeft: "auto ",
          alignSelf: "start",
          transform: "translateX(-65%) translateY(-60%) rotate(0)",
        }}
      >
        <SvgIcon {...arrowProps} />
      </div>
    </Grid>
  );
}
