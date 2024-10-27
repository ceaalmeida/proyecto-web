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
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function CreateAccount({ onLogin }) {
  const [name, setNombre] = useState("");
  const [lastname, setApellido] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sendingToken, setSendingToken] = useState(false);
  const [token, setToken] = useState("");
  const [tokenGenerado, setTokenGenerado] = useState("");
  const [countdown, setCountdown] = useState(60); // Estado para el contador
  const [isCounting, setIsCounting] = useState(false); // Estado para saber si el contador está activo

  const [creating, setCreating] = useState(false);

  const { data: session, status } = useSession();

  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [i, setI] = useState(0);

  const router = useRouter();

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
    if (lastname.trim() === "") {
      setErrorApellido("El apellido es requerido");
      return false;
    }
    if (/[0-9]/.test(lastname)) {
      setErrorApellido("El apellido no puede contener números");
      return false;
    }
    return true;
  };

  const validarUsuario = async () => {
    setErrorUser(""); // Resetea el error
    if (username.trim() === "") {
      setErrorUser("El usuario es requerido");
      return false;
    }
    if (/[0-9]/.test(username)) {
      setErrorUser("El usuario no puede contener números");
      return false;
    }
    const existe = existeUsuario();
    if (existe) {
      setErrorUser("El nombre de usuario ya está en uso");
      return false;
    }
    return true;
  };

  const existeUsuario = async () => {
    let existe = false;
    
    try {
      sign()
      if (session?.user?.token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user?.token}`,
            },
          }
        );
        const data = await response.json();
        data.filter((e) => {
          if (e.username === username) {
            existe = true;
          }
        });
      }
      return existe;
    } catch (error) {
      console.log(error);
    }
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

    if (existeCuenta()) {
      setErrorEmail("El correo electrónico ya está en uso");
      return false;
    }
    return true;
  };

  const sign = async () => {
    const x = process.env.ADMIN_ROLE_EMAIL;
    const y = process.env.ADMIN_ROLE_PASSWORD;
    console.log("Entrando");
    const response = await signIn("credentials", {
      x,
      y,
      redirect: false,
    });
    if (response?.error) {
      setError(response.error);
      return;
    }
  };

  const existeCuenta = async () => {
    let existe = false;
    try {
      sign();
      console.log("LOGEADO");
      if (session?.user?.token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user?.token}`,
            },
          }
        );
        const data = response.json();
        data.filter((e) => {
          if (e.email === email) {
            return true;
          }
        });
      }
      return existe;
    } catch (error) {
      console.log(error);
    }
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

  const generarYEnviarToken = async () => {
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
      lastname,
      username,
      email,
      password,
    });

    if (validaciones) {
      setTokenGenerado(Math.floor(100000 + Math.random() * 900000));
      console.log(tokenGenerado);
      // await enviarCorreo();
      setSendingToken(true);
    } else {
      setCreating(false);
    }
  };

  const enviarCorreo = async () => {
    try {
      const html = `
      <div>
        <h1>
          Welcome, ${name}. This is your token: ${tokenGenerado} !
        </h1>
      </div>
    `;
      const response = await fetch("/api/send/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Token para Validar Correo",
          html,
        }),
      });
      console.log("PINGAAAA");
      console.log(await response.json());
    } catch (error) {
      console.error("Error sending email:", error);
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
          lastname,
          username,
          email,
          age: 20,
          password,
          permiso: "user",
        }),
      }
    );
  };

  const validateToken = async () => {
    if (tokenGenerado.toString() === token) {
      await register();
      setSendingToken(false);
      setCreating(false);
      setToken("");
      setTokenGenerado("");
      router.replace("/");
    } else {
      console.log("PINGA");
      setError("El token no es correcto");
      setOpenSnackbar(true);
    }
  };

  React.useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
      clearInterval(timer);
      setToken("");
      setTokenGenerado("");
    }

    return () => clearInterval(timer); // Limpiar el intervalo al desmontar
  }, [isCounting, countdown]);

  const handleResendCode = () => {
    setCountdown(60);
    setIsCounting(true);
    generarYEnviarToken();
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
            value={lastname}
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
            onClick={() => (creating ? null : setSendingToken(true))}
          >
            {creating ? <CircularProgress color="inherit" /> : "Crear cuenta"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => (creating ? null : router.replace("/"))}
          >
            {creating ? <CircularProgress color="inherit" /> : "Iniciar Sesión"}
          </Button>
        </Box>
        {/* Enviar Correo */}
        <Dialog open={sendingToken}>
          <DialogTitle>Validar Correo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isCounting
                ? "  Se ha enviado un correo electrónico a tu dirección de correoelectrónico con un enlace de validación. Por favor introduzca el código en el siguiente cuadro de texto"
                : "Toque enviar para enviar"}
            </DialogContentText>
            <TextField
              margin="dense"
              id="token"
              label="Código de validación"
              type="text"
              fullWidth
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                console.log(tokenGenerado);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isCounting}
              sx={{ mt: 3, mb: 2 }}
              onClick={validateToken}
            >
              Validar
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setSendingToken(false);
                  setCreating(false);
                  setTokenGenerado("");
                  setToken("");
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleResendCode}
                disabled={isCounting}
                style={{ margin: "0 10px" }} // Margen para separación
              >
                {isCounting ? `Reenviar en ${countdown}s` : "Enviar Código"}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setSendingToken(false);
                  setToken("");
                  setTokenGenerado(false);
                }}
              >
                Cambiar de Correo
              </Button>
            </div>
          </DialogContent>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            //sx={{ textAlign: "right" }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => {
              setOpenSnackbar(false);
            }}
          >
            <Alert
              onClose={() => {
                setOpenSnackbar(false);
              }}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Dialog>
      </Paper>
    </Container>
  );
}
