import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { onAuthStateChanged } from "firebase/auth";

import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../../Utils/hooks";
import {
  logoutUser,
  selectAuth,
  setUser,
} from "../../Utils/reducers/authSlice";
import { useLoginUserMutation } from "../../Utils/reducers/fireAuthReducer";
import { auth } from "../../Utils/firebaseConfig";
import { AuthInterface } from "../../Types/types";
import { useLocation, useNavigate } from "react-router-dom";

const theme = createTheme();

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const user = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await loginUser({
      email: formData.email,
      password: formData.password,
    }).unwrap();
    dispatch(setUser(user));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          } as AuthInterface)
        );
      } else {
        dispatch(logoutUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user.uid) {
      navigate("/dashboard/home", { replace: true });
    }
  }, [location, navigate, user.uid]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
        elevation={3}
      >
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          }}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="text"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="text"
                  handleShowPassword={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              autoFocus
              type="email"
              half={false}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              half={false}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                half={false}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
