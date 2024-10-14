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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewColumn as ViewColumnIcon,
} from "@mui/icons-material";

const initialAnimals = [
  { id: 1, nombre: "Max", especie: "Perro", raza: "Labrador", edad: 3 },
  { id: 2, nombre: "Luna", especie: "Gato", raza: "Siamés", edad: 2 },
  { id: 3, nombre: "Rocky", especie: "Perro", raza: "Pastor Alemán", edad: 5 },
  { id: 4, nombre: "Milo", especie: "Gato", raza: "Persa", edad: 4 },
];

export default function AnimalTable() {
  const [animals, setAnimals] = useState(initialAnimals);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleColumns, setVisibleColumns] = useState([
    "nombre",
    "especie",
    "raza",
    "edad",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [newAnimal, setNewAnimal] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const letras = /^[a-zA-Z]+$/;
  const num = /^[0-9]+$/;

  // const Alerta = ({ mensaje, close }) => {
  //   return (
  //     <Dialog open={showAlert} onClose={setClose}>
  //       <DialogTitle>Alerta</DialogTitle>
  //       <DialogContent>
  //         <DialogContentText>{mensaje}</DialogContentText>
  //         <Button onClick={close()}></Button>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    setAnimals(animals.filter((animal) => animal.id !== id));
  };

  const handleEdit = (animal) => {
    setEditingAnimal(animal);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    setAnimals(
      animals.map((animal) =>
        animal.id === editingAnimal.id ? editingAnimal : animal
      )
    );
    setOpenEditDialog(false);
  };

  const handleAdd = () => {
    const id = Math.max(...animals.map((a) => a.id)) + 1;

    if (
      letras.test(newAnimal.nombre) &&
      letras.test(newAnimal.especie) &&
      letras.test(newAnimal.raza)
    ) {
      console.log("Biba cuva");
      setAnimals([...animals, { ...newAnimal, id }]);
      setNewAnimal({ nombre: "", especie: "", raza: "", edad: "" });
      setOpenAddDialog(false);
    } else {
      setShowAlert(true);
      setMensaje("Los datos introducidos son incorrectos");
    }
  };
  const setClose = () => {
    setShowAlert(false);
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const filteredAnimals = animals
    .filter((animal) =>
      Object.values(animal).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <TextField
        label="Buscar animales"
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
        {["nombre", "especie", "raza", "edad"].map((column) => (
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
              {visibleColumns.includes("especie") && (
                <TableCell>Especie</TableCell>
              )}
              {visibleColumns.includes("raza") && <TableCell>Raza</TableCell>}
              {visibleColumns.includes("edad") && <TableCell>Edad</TableCell>}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnimals.map((animal) => (
              <TableRow key={animal.id}>
                {visibleColumns.includes("nombre") && (
                  <TableCell>{animal.nombre}</TableCell>
                )}
                {visibleColumns.includes("especie") && (
                  <TableCell>{animal.especie}</TableCell>
                )}
                {visibleColumns.includes("raza") && (
                  <TableCell>{animal.raza}</TableCell>
                )}
                {visibleColumns.includes("edad") && (
                  <TableCell>{animal.edad}</TableCell>
                )}
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(animal)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(animal.id)}
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
        Agregar Animal
      </Button>
      ;{/* Diálogo para agregar animal */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nuevo Animal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles del nuevo animal.
          </DialogContentText>
          {["nombre", "especie", "raza", "edad"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              fullWidth
              variant="standard"
              value={newAnimal[field]}
              onChange={(e) => {
                setNewAnimal({ ...newAnimal, [field]: e.target.value });
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>
      {/* Mensaje Error */}
      <Dialog open={showAlert} onClose={setClose}>
        <DialogTitle>Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText>{mensaje}</DialogContentText>
          <DialogActions>
          <Button onClick={setClose}></Button>
          </DialogActions>          
        </DialogContent>
      </Dialog>
      {/* Diálogo para editar animal */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Animal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, modifique los detalles del animal.
          </DialogContentText>
          {editingAnimal &&
            ["nombre", "especie", "raza", "edad"].map((field) => (
              <TextField
                key={field}
                margin="dense"
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type="text"
                fullWidth
                variant="standard"
                value={editingAnimal[field]}
                onChange={(e) => {
                  setEditingAnimal({
                    ...editingAnimal,
                    [field]: e.target.value,
                  });
                }}
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
