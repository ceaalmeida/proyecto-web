"use client";

import * as React from "react";
import {
  Typography,
  Snackbar,
  Alert,
  Container,
  CssBaseline,
  Paper,
  Avatar,
  TextField,
  Button,
  Box
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const signIn = async (e) => {
    
    e.preventDefault()

    if (email.trim() === "asd@gmail.com" && password.trim() === "asd") {
      router.replace("/home");
    } else if (email.trim() === "qwe@gmail.com" && password.trim() === "qwe") {
      router.replace("/homeUser");
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
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
          Contraseña o usuario
          <br />
          incorrectos
        </Alert>
      </Snackbar>
    </Container>
  );
}
