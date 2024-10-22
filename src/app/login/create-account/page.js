"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Avatar,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";

export default function CreateAccount({ onLogin }) {
  const [name, setNombre] = useState("");
  const [lastName, setApellido] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sendingToken, setSendingToken] = useState(false);
  const [token, setToken] = useState("");

  const [creating, setCreating] = useState(false);

  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const generarYEnviarToken = async (email) => {
    // Validar antes de enviar el token
    setCreating(true);
    const validaciones =
      validarNombre() &&
      validarApellido() &&
      validarUsuario() &&
      validarCorreo() &&
      validarPassword() &&
      validarConfirmPassword();

    console.log({
      name,
      lastName,
      username,
      email,
      password,
    });

    if (validaciones) {
      const token = Math.floor(100000 + Math.random() * 900000); // Genera un número entre 100000 y 999999
      await register();
      setCreating(false);
    }
  };

  const register = async () => {
    const id = Math.floor(100000 + Math.random() * 900000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          lastName,
          username,
          email,
          age: 20,
          password,
          permiso: "user",
        }),
      }
    );
  };

  const validarNombre = () => {
    setErrorNombre(""); // Resetea el error
    if (name.trim() === "") {
      setErrorNombre("El nombre es requerido");
      return false;
    } else if (/[0-9]/.test(name)) {
      setErrorNombre("El nombre no puede contener números");
      return false;
    }
    return true;
  };

  const validarApellido = () => {
    setErrorApellido(""); // Resetea el error
    if (lastName.trim() === "") {
      setErrorApellido("El apellido es requerido");
      return false;
    }
    if (/[0-9]/.test(lastName)) {
      setErrorApellido("El apellido no puede contener números");
      return false;
    }
    return true;
  };

  const validarUsuario = () => {
    setErrorUser(""); // Resetea el error
    if (username.trim() === "") {
      setErrorUser("El usuario es requerido");
      return false;
    }
    if (/[0-9]/.test(username)) {
      setErrorUser("El usuario no puede contener números");
      return false;
    }
    return true;
  };

  const validarCorreo = () => {
    setErrorEmail(""); // Resetea el error
    if (email.trim() === "") {
      setErrorEmail("El correo electrónico es requerido");
      return false;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setErrorEmail("El correo no es válido");
      return false;
    }
    return true;
  };

  const validarPassword = () => {
    setErrorPassword(""); // Resetea el error
    if (password.trim() === "") {
      setErrorPassword("La contraseña es requerida");
      return false;
    }
    if (password.length < 8) {
      setErrorPassword("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    return true;
  };

  const validarConfirmPassword = () => {
    setErrorConfirmPassword(""); // Resetea el error
    if (confirmPassword.trim() === "") {
      setErrorConfirmPassword("La confirmación de contraseña es requerida");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorConfirmPassword("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear cuenta
        </Typography>
        <Box
          sx={{
            mt: 1,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            autoComplete="nombre"
            autoFocus
            value={name}
            onChange={(e) => setNombre(e.target.value)}
            error={errorNombre !== ""}
            helperText={errorNombre}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="apellido"
            label="Apellido"
            name="apellido"
            autoComplete="apellido"
            value={lastName}
            onChange={(e) => setApellido(e.target.value)}
            error={errorApellido !== ""}
            helperText={errorApellido}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            name="user"
            autoComplete="user"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            error={errorUser !== ""}
            helperText={errorUser}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errorEmail !== ""}
            helperText={errorEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errorPassword !== ""}
            helperText={errorPassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errorConfirmPassword !== ""}
            helperText={errorConfirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => (creating ? null : generarYEnviarToken(email))}
          >
            {creating ? <CircularProgress /> : "Crear cuenta"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => (creating ? null : router.replace("/"))}
          >
            {creating ? <CircularProgress /> : "Iniciar Sesión"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
