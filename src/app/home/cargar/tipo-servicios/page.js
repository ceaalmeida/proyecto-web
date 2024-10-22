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
  Stack,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  createService,
  deleteService,
  loadAllServices,
  readService,
  updateService,
} from "../../../api/tipo-de-servicio/tipo-de-servicio.service";
import { useSession } from "next-auth/react";

export default function ServiceTypeTable() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    ID_Servicio: "",
    Nombre_Servicio: "",
  });
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [creatingService, setCreatingService] = useState(false);
  const [editService, setEditService] = useState(false);
  const [deletingService, setDeletingService] = useState(false);

  const [alertUser, setAlertUser] = useState(false);

  const {data: session, status} = useSession()

  const loadServices = async () => {
    const data = await loadAllServices(session?.user?.token);
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSaveEdit = async() => {
    setEditService(true);
    console.log(editingService);
    await updateService(editingService.ID_Servicio, editingService,session?.user?.token)

    setServices(
      services.map((service) =>
        service.ID_Servicio === editingService.ID_Servicio
          ? editingService
          : service
      )
    );
    setOpenEditDialog(false);
    setEditService(false);
  };

  const handleAdd = async () => {
    setCreatingService(true);
    const ID_Servicio = Math.max(...services.map((s) => s.ID_Servicio)) + 1;
    await createService(newService, session?.user?.token);

    setServices([...services, { ...newService, ID_Servicio }]);
    setNewService({
      ID_Servicio: "",
      Nombre_Servicio: "",
    });
    setOpenAddDialog(false);
    setCreatingService(false);
    setAlertUser(false);
  };

  const handleDelete = async () => {
    setDeletingService(true);
    await deleteService(serviceToDelete, session?.user?.token);
    setServices(
      services.filter((service) => service.ID_Servicio !== serviceToDelete)
    );
    setOpenConfirmDialog(false);
    setDeletingService(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ width: "100%", mt: 2, mb: 2 }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mt: 2 }}
        >
          Agregar Tipo de Servicio
        </Button>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mt: 2 }}
        >
          Agregar Tipo de Servicio
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Servicio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.ID_Servicio}>
                <TableCell>{service.Nombre_Servicio}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditingService(service);
                      setOpenEditDialog(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setServiceToDelete(service.ID_Servicio);
                      setOpenConfirmDialog(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para agregar tipo de servicio */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nuevo Tipo de Servicio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese el nombre del nuevo tipo de servicio.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={newService.Nombre_Servicio}
            onChange={(e) =>
              setNewService({
                ...newService,
                Nombre_Servicio: e.target.value,
                ID_Servicio: Math.floor(100000 + Math.random() * 900000),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button
            onClick={creatingService ? null : handleAdd}
            disabled={!newService.Nombre_Servicio || creatingService}
          >
            {creatingService ? <CircularProgress /> : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={alertUser}>
        <DialogContent>
          <DialogContentText>
            Por favor, espere mientras se crea el nuevo tipo de servicio.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar tipo de servicio */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Tipo de Servicio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, modifique el nombre del tipo de servicio.
          </DialogContentText>
          {editingService && (
            <TextField
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              value={editingService.Nombre_Servicio}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  Nombre_Servicio: e.target.value,
                })
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit}>
            {editService ? <CircularProgress /> : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Eliminar Tipo de Servicio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar el tipo de servicio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={deletingService ? null : handleDelete} color="error">
            {deletingService ? <CircularProgress color="error" /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
