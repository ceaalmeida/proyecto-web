"use client";
import React, { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewColumn as ViewColumnIcon,
} from "@mui/icons-material";

const initialServices = [
  { ID_Servicio: 1, Nombre_Servicio: "Veterinario" },
  { ID_Servicio: 2, Nombre_Servicio: "Paseo" },
  { ID_Servicio: 3, Nombre_Servicio: "Alimentación" },
];

export default function ServiceTypeTable() {
  const [services, setServices] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleColumns, setVisibleColumns] = useState(["nombre"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    ID_Servicio: "",
    Nombre_Servicio: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [creatingService, setCreatingService] = useState(false);
  const [alertUser, setAlertUser] = useState(false);

  const loadServices = async () => {
    const response = await fetch("http://localhost:3000/tipo-de-servicio/", {
      method: "GET",
    });
    const services = await response.json();
    console.log(services);
    setServices(services)
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (ID_Servicio) => {
    setServices(
      services.filter((service) => service.ID_Servicio !== ID_Servicio)
    );
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    setServices(
      services.map((service) =>
        service.ID_Servicio === editingService.ID_Servicio
          ? editingService
          : service
      )
    );
    setOpenEditDialog(false);
  };

  const handleAdd = async () => {
    setCreatingService(true);
    const ID_Servicio = Math.max(...services.map((s) => s.ID_Servicio)) + 1;
    const response = await fetch("http://localhost:3000/tipo-de-servicio", {
      method: "POST",
      body: JSON.stringify(newService),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    console.log(data);

    setServices([...services, { ...newService, ID_Servicio }]);
    setNewService({
      ID_Servicio: "",
      Nombre_Servicio: "",
    });
    setOpenAddDialog(false);
    setCreatingService(false);
    setAlertUser(false);
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const filteredServices = services
    .filter((service) =>
      Object.values(service).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Nombre_Servicio.localeCompare(b.Nombre_Servicio);
      } else {
        return b.Nombre_Servicio.localeCompare(a.Nombre_Servicio);
      }
    });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <TextField
        label="Buscar tipos de servicio"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ mb: 2, ml: 2 }}
      >
        <ViewColumnIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {["Nombre"].map((column) => (
          <MenuItem key={column}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={visibleColumns.includes(column)}
                  onChange={() => toggleColumn(column)}
                />
              }
              label={column.charAt(0).toUpperCase() + column.slice(1)}
            />
          </MenuItem>
        ))}
      </Menu>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {visibleColumns.includes("nombre") && (
                <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                  Nombre {sortOrder === "asc" ? "↑" : "↓"}
                </TableCell>
              )}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.ID_Servicio}>
                {visibleColumns.includes("nombre") && (
                  <TableCell>{service.Nombre_Servicio}</TableCell>
                )}
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(service)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(service.ID_Servicio)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
        sx={{ mt: 2 }}
      >
        Agregar Tipo de Servicio
      </Button>

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
          <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
