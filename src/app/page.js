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
  Box,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

// Define the providers for authentication
const providers = [{ id: "credentials", name: "Email and Password" }];

// Sign in function to handle authentication

export default function SlotsSignIn() {
  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const [redirecting, setRedirecting] = useState(false);
  const [redirected, setRedirected] = useState(false);

  const sign = async (e) => {
    e.preventDefault();
    setRedirecting(true);
    if (validarEntrada()) {
      console.log("Entrando");
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.error) {
        setError(response.error);
        setOpenSnackbar(true);
        setRedirecting(false);
        return;
      }
      if (session?.user?.role === "user") {
        router.replace("/homeUser");
        setRedirected(true);
        // setRedirecting(false);
      }else if(session?.user?.role === "admin"){
        router.replace("/home");
        setRedirected(true);
        // setRedirecting(false);
      }
    } else {
      setError("Errores de Validacion");
      setOpenSnackbar(true);
      setRedirecting(false);
    }
    setRedirecting(false);
  };

  const validarEntrada = () => {
    return true;
  };

  const handleRegister = (e) => {
    router.push("/login/create-account");
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
        <Box
          component="form"
          onSubmit={redirected || redirecting ? null : sign}
          noValidate
          sx={{ mt: 1 }}
        >
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
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            {redirecting ? (
              <CircularProgress color="inherit" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            onClick={redirected || redirecting ? null : handleRegister}
          >
            {redirecting ? (
              <CircularProgress color="inherit" />
            ) : (
              "Crear Cuenta"
            )}
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
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
