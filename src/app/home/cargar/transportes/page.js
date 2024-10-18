"use client";
import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewColumn as ViewColumnIcon,
} from "@mui/icons-material";
import {
  loadAllTransports,
  createTransport,
  deleteTransport,
  readTransport,
  updateTransport,
} from "../../../api/transporte/transporte.service";

export default function TransporteTable() {
  const [transportes, setTransportes] = useState([]);
  const [editingTransporte, setEditingTransporte] = useState(null);
  const [newTransporte, setNewTransporte] = useState({
    ID_Transporte: "",
    Vehículo: "",
    Modalidad: "",
    Precio: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [transporteToDelete, setTransporteToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [creatingTransport, setCreatingTransport] = useState(false);

  const loadAll = async () => {
    try {
      const data = await loadAllTransports();
      
      setTransportes(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleDelete = (id) => {
    setTransportes(transportes.filter((transporte) => transporte.id !== id));
  };

  const handleEdit = (transporte) => {
    setEditingTransporte(transporte);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    setTransportes(
      transportes.map((transporte) =>
        transporte.id === editingTransporte.id ? editingTransporte : transporte
      )
    );
    setOpenEditDialog(false);
  };

  const handleAdd = async () => {
    setCreatingTransport(true)
    const id = Math.max(...transportes.map((t) => t.id)) + 1;
    try {
        await createTransport(newTransporte)
    } catch (error) {
        console.log(error.message)
    }
    console.log(newTransporte);
    setTransportes([...transportes, { ...newTransporte, id }]);
    setNewTransporte({ ID_Transporte: "", Vehículo: "", Modalidad: "", Precio:"" });
    setOpenAddDialog(false);
    setCreatingTransport(false)
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
        sx={{ mt: 2 }}
      >
        Agregar Transporte
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">Vehículo</TableCell>
              <TableCell padding="checkbox">Modalidad</TableCell>
              <TableCell padding="checkbox">Precio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transportes.map((transporte) => (
              <TableRow key={transporte.ID_Transporte}>
                <TableCell>{transporte.Vehículo}</TableCell>
                <TableCell>{transporte.Modalidad}</TableCell>
                <TableCell>{transporte.Precio}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditingTransporte(transporte);
                      setOpenEditDialog(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setTransporteToDelete(transporte.ID_Transporte);
                      setOpenConfirmDialog(true);
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar transporte */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nuevo Transporte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles del nuevo transporte.
          </DialogContentText>

          <TextField
            key={"vehiculo"}
            margin="dense"
            label={"Vehículo"}
            type="text"
            fullWidth
            variant="standard"
            value={newTransporte.Vehículo}
            onChange={(e) =>
              setNewTransporte({
                ...newTransporte,
                Vehículo: e.target.value,
                ID_Transporte: Math.floor(100000 + Math.random() * 900000),
              })
            }
          />
          <TextField
            key={"modalidad"}
            margin="dense"
            label={"Modalidad"}
            type="text"
            fullWidth
            variant="standard"
            value={newTransporte.Modalidad}
            onChange={(e) =>
              setNewTransporte({
                ...newTransporte,
                Modalidad: e.target.value,
                ID_Transporte: Math.floor(100000 + Math.random() * 900000),
              })
            }
          />
          <TextField
            key={"precio"}
            margin="dense"
            label={"Precio"}
            type="text"
            fullWidth
            variant="standard"
            value={newTransporte.Precio}
            onChange={(e) =>
              setNewTransporte({
                ...newTransporte,
                Precio: e.target.value,
                ID_Transporte: Math.floor(100000 + Math.random() * 900000),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={creatingTransport ? null : handleAdd}>
            {creatingTransport? <CircularProgress/> : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar transporte */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Transporte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, modifique los detalles del transporte.
          </DialogContentText>
          {editingTransporte &&
            ["nombre", "capacidad", "tipoVehiculo"].map((field) => (
              <TextField
                key={field}
                margin="dense"
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type="text"
                fullWidth
                variant="standard"
                value={editingTransporte[field]}
                onChange={(e) =>
                  setEditingTransporte({
                    ...editingTransporte,
                    [field]: e.target.value,
                  })
                }
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
