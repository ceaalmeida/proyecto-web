"use client";
import React, { useState, useEffect } from "react";
import { readUserByEmailRegister } from "../../api/user/user.service";
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
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

export default function CreateAccount({ onLogin }) {
  const [name, setNombre] = useState("");
  const [lastname, setApellido] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sendingToken, setSendingToken] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenGenerado, setTokenGenerado] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [correoEnviado, setCorreoEnviado] = useState(false)

  const router = useRouter();

  useEffect(() => {
    if (tokenGenerado !== null && !correoEnviado) {  // Asegura que `tokenGenerado` no sea null antes de enviar el correo
      enviarCorreo(tokenGenerado); // Llama a la función para enviar el correo con el token actualizado
      setCorreoEnviado(true)
    }
  }, [tokenGenerado, correoEnviado]);

  const validarNombre = () => {
    setErrorNombre("");
    if (name.trim() === "" || /[0-9]/.test(name)) {
      setErrorNombre("El nombre es requerido y no puede contener números");
      return false;
    }
    return true;
  };

  const validarApellido = () => {
    setErrorApellido("");
    if (lastname.trim() === "" || /[0-9]/.test(lastname)) {
      setErrorApellido("El apellido es requerido y no puede contener números");
      return false;
    }
    return true;
  };

  const validarUsuario = () => {
    setErrorUser("");
    if (username.trim() === "" || /[0-9]/.test(username)) {
      setErrorUser("El usuario es requerido y no puede contener números");
      return false;
    }
    return true;
  };

  const validarCorreo = async () => {
    setErrorEmail("");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !regex.test(email)) {
      setErrorEmail("El correo electrónico es requerido o no es válido");
      return false;
    }
    if (await existeCuenta()) {
      setErrorEmail("El correo electrónico ya está en uso");
      return false;
    }
    return true;
  };

  const existeCuenta = async () => {
    try {
      await getSession();
      const data = await readUserByEmailRegister(email);
      return !!data;
    } catch {
      return false;
    }
  };

  const validarPassword = () => {
    setErrorPassword("");
    if (password.length < 8) {
      setErrorPassword("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    return true;
  };

  const validarConfirmPassword = () => {
    setErrorConfirmPassword("");
    if (password !== confirmPassword) {
      setErrorConfirmPassword("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const validarEntradas = () => {
    const validaciones =
      validarNombre() &&
      validarApellido() &&
      validarUsuario() &&
      validarCorreo() &&
      validarPassword() &&
      validarConfirmPassword();
    if (validaciones) {
      setSendingToken(true);
      generarYEnviarToken();
    }
  };

  const generarYEnviarToken = async () => {
    setTokenGenerado(Math.floor(100000 + Math.random() * 900000));
    console.log(tokenGenerado)
    setIsCounting(true);
    setCorreoEnviado(false)
  };

  const enviarCorreo = async () => {
    const html = `<div><h1>Hola, ${name}. Este es tu código de validación: ${tokenGenerado} !</h1></div>`;
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Token para validar creación de cuentas",
        html: html,
      }),
    });
  };

  const register = async () => {
    const id = Math.floor(100000 + Math.random() * 900000);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name,
        lastname,
        username,
        email,
        age: 20,
        password,
        permiso: "user",
      }),
    });
  };

  const validateToken = async () => {
    console.log("El qie escribi",token)
    console.log("El que me mando",tokenGenerado)
    if (tokenGenerado.toString() === token) {
      try {
        await register();
        setSendingToken(false);
        setToken(null);
        setTokenGenerado(null);
        router.replace("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("El token no es correcto");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
      setToken(null);
      setTokenGenerado(null);
    }
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const handleResendCode = () => {
    setCountdown(60);
    setIsCounting(true);
    generarYEnviarToken();
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
          Crear cuenta
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            autoFocus
            value={name}
            onChange={(e) => setNombre(e.target.value)}
            error={!!errorNombre}
            helperText={errorNombre}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="apellido"
            label="Apellido"
            value={lastname}
            onChange={(e) => setApellido(e.target.value)}
            error={!!errorApellido}
            helperText={errorApellido}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            error={!!errorUser}
            helperText={errorUser}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errorEmail}
            helperText={errorEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errorPassword}
            helperText={errorPassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errorConfirmPassword}
            helperText={errorConfirmPassword}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={validarEntradas}
          >
            {creating ? <CircularProgress color="inherit" /> : "Crear cuenta"}
          </Button>
        </Box>
      </Paper>

      <Dialog open={sendingToken}>
        <DialogTitle>Validar Correo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCounting
              ? `Código enviado. Por favor ingrese el código (Tiempo restante: ${countdown}s)`
              : "¿No recibiste el código? Haz clic en reenviar"}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Código de validación"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button disabled={isCounting} onClick={handleResendCode}>
            Reenviar código
          </Button>
          <Button onClick={validateToken} color="primary">
            Validar
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
}
