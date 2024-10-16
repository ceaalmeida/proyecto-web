"use client";

import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider, SignInPage } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const providers = [{ id: "credentials", name: "Email and Password" }];

function CustomEmailField() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(null);
  };

  return (
    <TextField
      id="input-with-icon-textfield"
      label="Username"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
      value={email}
      onChange={handleEmailChange}
      error={emailError !== null}
      helperText={emailError}
    />
  );
}

function CustomPasswordField() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(null);
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type="password"
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setPasswordError(null)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
              size="small"
            >
              {passwordError ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={password}
        onChange={handlePasswordChange}
        error={passwordError !== null}
        helperText={passwordError}
      />
    </FormControl>
  );
}

function SlotsSignIn() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Aquí puedes agregar la lógica para enviar los datos al servidor
  }, [email, password]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      // Aquí puedes agregar la lógica para enviar los datos al servidor
      if (email.trim() === "asd@gmail.com" && password.trim() === "asd") {
        setError(null);
        router.replace("/home");
      } else if (email.trim() === "qwe@gmail.com" && password.trim() === "qwe") {
        setError(null);
        router.replace("/home.user");
      } else {
        setError("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AppProvider>
      <SignInPage providers={providers}>
        <CustomEmailField />
        <CustomPasswordField />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </SignInPage>
    </AppProvider>
  );
}

export default SlotsSignIn;
