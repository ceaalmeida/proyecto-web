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
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const initialActivities = [
  {
    ID_Actividad: 1,
    Descripción_Actividad: "Cuidado de perros",
    Precio: 100,
    Precio_Transporte: 20,
    ID_Animal: 1,
  },
  {
    ID_Actividad: 2,
    Descripción_Actividad: "Adopción de gatos",
    Precio: 150,
    Precio_Transporte: 25,
    ID_Animal: 2,
  },
];

 function ActivityTable() {
  const [activities, setActivities] = useState(initialActivities);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingActivity, setEditingActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({
    Descripción_Actividad: "",
    Precio: "",
    Precio_Transporte: "",
    ID_Animal: "", // Añadido para manejar la relación con los animales
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    setActivities(
      activities.filter((activity) => activity.ID_Actividad !== id)
    );
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    setActivities(
      activities.map((activity) =>
        activity.ID_Actividad === editingActivity.ID_Actividad
          ? editingActivity
          : activity
      )
    );
    setOpenEditDialog(false);
  };

  const handleAdd = () => {
    const id = Math.max(...activities.map((a) => a.ID_Actividad)) + 1;
    setActivities([...activities, { ...newActivity, ID_Actividad: id }]);
    setNewActivity({
      Descripción_Actividad: "",
      Precio: "",
      Precio_Transporte: "",
      ID_Animal: "",
    });
    setOpenAddDialog(false);
  };

  const filteredActivities = activities
    .filter((activity) =>
      Object.values(activity).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Descripción_Actividad.localeCompare(b.Descripción_Actividad);
      } else {
        return b.Descripción_Actividad.localeCompare(a.Descripción_Actividad);
      }
    });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <TextField
        label="Buscar actividades"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                Descripción {sortOrder === "asc" ? "↑" : "↓"}
              </TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Precio Transporte</TableCell>
              <TableCell>ID Animal</TableCell> {/* Columna para ID de animal */}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.ID_Actividad}>
                <TableCell>{activity.Descripción_Actividad}</TableCell>
                <TableCell>{activity.Precio}</TableCell>
                <TableCell>{activity.Precio_Transporte}</TableCell>
                <TableCell>{activity.ID_Animal}</TableCell>{" "}
                {/* Muestra ID de animal */}
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(activity)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(activity.ID_Actividad)}
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
        Agregar Actividad
      </Button>

      {/* Diálogo para agregar actividad */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nueva Actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles de la nueva actividad.
          </DialogContentText>
          {[
            "Descripción_Actividad",
            "Precio",
            "Precio_Transporte",
            "ID_Animal",
          ].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={
                field.replace(/_/g, " ").charAt(0).toUpperCase() +
                field.replace(/_/g, " ").slice(1)
              }
              type="text"
              fullWidth
              variant="standard"
              value={newActivity[field]}
              onChange={(e) =>
                setNewActivity({ ...newActivity, [field]: e.target.value })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar actividad */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, modifique los detalles de la actividad.
          </DialogContentText>
          {editingActivity &&
            [
              "Descripción_Actividad",
              "Precio",
              "Precio_Transporte",
              "ID_Animal",
            ].map((field) => (
              <TextField
                key={field}
                margin="dense"
                label={
                  field.replace(/_/g, " ").charAt(0).toUpperCase() +
                  field.replace(/_/g, " ").slice(1)
                }
                type="text"
                fullWidth
                variant="standard"
                value={editingActivity[field]}
                onChange={(e) =>
                  setEditingActivity({
                    ...editingActivity,
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

export default  ActivityTable;

