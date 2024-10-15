"use client";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { PawPrint } from "lucide-react";
import { useState } from "react";

export default function App({ onLogin }) {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [signin, setSignin] = useState(false);

  return (
    <Container component={"main"} maxWidth={"sx"}>
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
        <div>
          <Typography component="h1" variant="h3">
            Amigos de Patas
            {<PawPrint></PawPrint>}
          </Typography>
        </div>
        <div>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => router.push("/login")}
          >
            Iniciar Sesión
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => router.push("/login/create-account")}
          >
            Registrarse
          </Button>
        </div>
      </Paper>
    </Container>
  );
}
