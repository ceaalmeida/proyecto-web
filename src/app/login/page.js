"use client";

import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
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
const signIn = async (provider, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  // Simulate an API call for sign-in
  if (email.trim() === "asd@gmail.com" && password.trim() === "asd") {
    //alert(`Signed in successfully with ${provider.name}`);
    return true; // Indicate success
  } else if (email.trim() === "qwe@gmail.com" && password.trim() === "qwe") {
    //alert(`Signed in successfully with ${provider.name}`);
    return true; // Indicate success
  } else {
    alert("Invalid email or password");
    return false; // Indicate failure
  }
};

export default function SlotsSignIn() {
  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <AppProvider theme={theme}>
      <SignInPage
        providers={providers}
        signIn={async (provider, formData) => {
          const success = await signIn(provider, formData);
          if (success) {
            // Redirect based on user
            if (formData.get('email') === "asd@gmail.com") {
              router.replace("/home");
            } else if (formData.get('email') === "qwe@gmail.com") {
              router.replace("/home.user");
            }
          } else {
            setError("Invalid email or password");
          }
        }}
      >
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </SignInPage>
    </AppProvider>
  );
}
