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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "lucide-react";

import { useRouter } from "next/navigation";

export default function Login({ onLogin }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router=useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí normalmente se haría una llamada a una API para autenticar
        // Por ahora, simularemos una autenticación básica
        if (user === "qwe" && password === "qwe") {
            setError("");

            router.push('/home.user')
            setUser("");
            setPassword("")

            // onLogin(user);
        } else if(user === "asd" && password === "asd"){
            router.push('/home')
            setUser("");
            setPassword("")

        }else{
            setError("Usuario o contraseña incorrectos");
        }
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
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    />
                    {error && (
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
                        Iniciar Sesión
                    </Button>
                    <h1>Crear cuenta</h1>
                </Box>
            </Paper>
        </Container>
    );
}
