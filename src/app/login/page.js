"use client";

import * as React from "react";
import { Typography, Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider, SignInPage } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the providers for authentication
const providers = [{ id: "credentials", name: "Email and Password" }];

// Sign in function to handle authentication

export default function SlotsSignIn() {
  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const signIn = async (provider, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (email.trim() === "asd@gmail.com" && password.trim() === "asd") {
      router.replace("/home");
    } else if (email.trim() === "qwe@gmail.com" && password.trim() === "qwe") {
      router.replace("/home.user");
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage providers={providers} signIn={signIn}>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </SignInPage>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        //sx={{ textAlign: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Contraseña o usuario<br/>incorrectos
        </Alert>
      </Snackbar>
    </AppProvider>
  );
}
