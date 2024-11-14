"use client";
import AdopcionService from "./api/adopcion/adopcion.service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function Adoptar({ element, onButtonClick }) {
  const router = useRouter();
  const [adopcion, setAdopcion] = useState({
    ID_Adopcion: "",
    ID_Animal: "",
    Costo_Adopcion: "",
    Nombre_Adoptante: "",
    Email_Adoptante: "",
    Telefono_Adoptante: "",
    Fecha: "",
  });
  const [nuevo, setNuevo] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAdd = async () => {
    setOpenSnackbar(true)
    adopcion.ID_Adopcion = 1;
    adopcion.ID_Animal = element.ID_Animal;
    adopcion.Costo_Adopcion = element.Precio_Adopción;
    await AdopcionService.create(adopcion);
  };
  // useEffect(() => {
  //   const add = async () => {
  //     if (nuevo) {
  //       const res = await AdopcionService.create(nuevo);
  //     }
  //   };
  //   add();

  //   window.alert("bbb")
  //   setNuevo(null);
  // }, [updateCount]);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <div>
        <h1>
          {element.Nombre}
          <br />${element.Precio_Adopción}
        </h1>
      </div>
      <TextField
        margin="dense"
        label="Nombre Adoptante"
        fullWidth
        variant="outlined"
        value={element.nombreAdoptante}
        onChange={(e) =>
          setAdopcion({
            ...adopcion,
            Nombre_Adoptante: e.target.value,
          })
        }
      />
      <TextField
        margin="dense"
        label="Email Adoptante"
        fullWidth
        variant="outlined"
        value={element.emailAdoptante}
        onChange={(e) =>
          setAdopcion({
            ...adopcion,
            Email_Adoptante: e.target.value,
          })
        }
      />
      <TextField
        margin="dense"
        label="Teléfono Adoptante"
        fullWidth
        variant="outlined"
        value={element.telefonoAdoptante}
        onChange={(e) =>
          setAdopcion({
            ...adopcion,
            Telefono_Adoptante: e.target.value,
          })
        }
      />
      <TextField
        margin="dense"
        label="Fecha que va adoptar"
        type="date"
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={element.fecha}
        onChange={(e) =>
          setAdopcion({
            ...adopcion,
            Fecha: e.target.value,
          })
        }
      />
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
          Ah adoptado a {element.Nombre}
        </Alert>
      </Snackbar>
      <Button
        onClick={() => {
          handleAdd(), onButtonClick("Animales");
        }}
      >
        Aceptar
      </Button>
      <Button onClick={() => onButtonClick("Animales")}>Salir</Button>
    </div>
  );
}
