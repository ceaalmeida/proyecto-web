"use client";

import { Button, Container, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <Container>
        <Typography>Logueado Como {session.user?.email}</Typography>
        <Button onClick={() => signOut()}>Cerrar Sesión</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography>No hay usuario logueado</Typography>
      <Button onClick={() => signIn()}>Iniciar Sesión</Button>
    </Container>
  );
}
