"use client";
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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Adoptar({ element,onButtonClick}) {
  const router = useRouter();
  const [adopcion, setAdopcion] = useState();
  //window.alert(element.Precio_Adopción);
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
            nombreAdoptante: e.target.value,
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
            emailAdoptante: e.target.value,
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
            telefonoAdoptante: e.target.value,
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
            fecha: e.target.value,
          })
        }
      />
      <Button onClick={()=>onButtonClick("Animales")}>Aceptar</Button>
      <Button onClick={()=>onButtonClick("Animales")}>Salir</Button>
    </div>
  );
}
