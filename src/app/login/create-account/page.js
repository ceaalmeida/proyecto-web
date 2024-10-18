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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "lucide-react";

import { useRouter } from "next/navigation";

export default function CreateAccount({ onLogin }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassoword] = useState("");
  const [email, setEmail] = useState("");
  const [sendingToken, setSendingToken] = useState(false);
  const [token, setToken] = useState("");

  const [errorNombre, setErrorNombre] = useState("");
  const [estadoErrorNombre, setEstadoErrorNombre] = useState(false);
  const [errorApellido, setErrorApellido] = useState("");
  const [estadoErrorApellido, setEstadoErrorApellido] = useState(false);
  const [errorUser, setErrorUser] = useState("");
  const [estadoErrorUser, setEstadoErrorUser] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [estadoErrorPassword, setEstadoErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [estadoErrorConfirmPassword, setEstadoErrorConfirmPassword] =
    useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [estadoErrorEmail, setEstadoErrorEmail] = useState(false);
  const [error, setError] = useState("");

  const [estadoError, setEstadoError] = useState(false);

  const router = useRouter();

  const generarYEnviarToken = async (email) => {
    // Generar un número aleatorio como token
    const token = Math.floor(100000 + Math.random() * 900000); // Genera un número entre 100000 y 999999

    // Aquí deberías hacer una llamada a tu API para enviar el correo
    try {
      const response = await fetch("./create-account.js", {
        // Asegúrate de tener esta API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el token");
      }

      // Puedes mostrar un mensaje al usuario indicando que se ha enviado el token
      alert(
        "Se ha enviado un token a tu correo para autorizar la creación de la cuenta."
      );
      setSendingToken(true);
      setToken(token);
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo enviar el token. Intenta nuevamente.");
    }
  };

  const validateToken = () => {};

  const validarNombre = () => {
    setEstadoErrorNombre(false); // Resetea el estado de error
    if (nombre.trim() === "") {
      setEstadoErrorNombre(true); // Si el nombre está vacío, marca el estado de error
      setErrorNombre("El nombre es requerido");
      setEstadoError(true);
      return false;
    } else if (/[0-9]/.test(nombre)) {
      setErrorNombre("El nombre no puede contener números");
      setError("El nombre no puede contener números");
      setEstadoError(true);
      return false;
    }
    return true;
  };

  const validarApellido = () => {
    setEstadoErrorApellido(false); // Resetea el estado de error
    if (apellido.trim() === "") {
      setEstadoErrorApellido(true); // Si el apellido está vacío, marca el estado de error
      setErrorApellido("El apellido es requerido");
      setEstadoError(true);
      return false;
    }
    if (/[0-9]/.test(apellido)) {
      setErrorApellido(true);
      setError("El apellido no puede contener números");
      setEstadoError(true);
      return false;
    }
    return true;
  };

  const validarUsuario = () => {
    if (user.trim() === "") {
      setError("El usuario es requerido");
      setErrorUser(true);
      setEstadoError(true);
      return false;
    }
    if (/[0-9]/.test(user)) {
      setError("El usuario no puede contener números");
      setErrorUser(true);
      setEstadoError(true);
      return false;
    }
    return true;
  };

  const validarCorreo = () => {
    if (email.trim() === "") {
      setErrorEmail("El correo electrónico es requerido");
      setErrorEmail(true);
      setEstadoError(true);
      return false;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setError("El correo no es válido");
      setErrorEmail(true);
      setEstadoError(true);
      return false;
    }
    return true;
  };
  const validarPassword = () => {
    if (password.trim() === "") {
      setError("La contraseña es requerida");
      setErrorPassword(true);
      setEstadoError(true);
      return false;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      setErrorPassword(true);
      setEstadoError(true);
      return false;
    }
    return true;
  };
  const validarConfirmPassword = () => {
    if (confirmPassword.trim() === "") {
      setError("La contraseña de confirmación es requerida");
      setErrorConfirmPassword(true);
      setEstadoError(true);
      return false;
    }
    if (confirmPassword !== password) {
      setError("Las contraseñas no coinciden");
      setErrorConfirmPassword(true);
      setEstadoError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validarNombre() &&
      validarApellido() &&
      validarUsuario() &&
      validarCorreo() &&
      validarPassword() &&
      validarConfirmPassword();

    if (!estadoError) {
      alert("formulario valido");
    } else alert("Formulario inválido");
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Crear Cuenta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            autoComplete="nombre"
            autoFocus
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {estadoErrorNombre && (
            <Typography color="error" variant="body2">
              {errorNombre}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="apellido"
            label="Apellido"
            name="apellido"
            autoComplete="apellido"
            autoFocus
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          {estadoErrorApellido && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorApellido}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            name="user"
            autoComplete="user"
            autoFocus
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          {errorUser && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassoword(e.target.value)}
          />
          {errorConfirmPassword && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear Cuenta
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={router.refresh("/login")}
          >
            Iniciar Sesión
          </Button>
        </Box>
        <Dialog open={sendingToken}>
          <DialogTitle>Validar Correo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se ha enviado un correo electrónico a tu dirección de correo
              electrónico con un enlace de validación
              <br />
              Por favor introduzca el código en el siguiente cuadro de texto
            </DialogContentText>
            <TextField
              margin="dense"
              id="token"
              label="Código de validación"
              type="text"
              fullWidth
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={validateToken}
            >
              Validar
            </Button>
            <Button onClick={() => setSendingToken(false)}>Cancelar</Button>
          </DialogContent>
        </Dialog>
      </Paper>
    </Container>
  );
}
