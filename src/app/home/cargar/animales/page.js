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
  {
    ID_Animal: "A001",
    Nombre: "Max",
    Especie: "Perro",
    Raza: "Labrador",
    Edad: 3,
    Peso: 25.5,
    Dias_Refugio: 10,
    Precio_Mantenimiento: 150,
    Precio_Adopción: 300,
  },
  {
    ID_Animal: "A002",
    Nombre: "Luna",
    Especie: "Gato",
    Raza: "Siamés",
    Edad: 2,
    Peso: 4.2,
    Dias_Refugio: 5,
    Precio_Mantenimiento: 100,
    Precio_Adopción: 250,
  },
  {
    ID_Animal: "A003",
    Nombre: "Rocky",
    Especie: "Perro",
    Raza: "Pastor Alemán",
    Edad: 5,
    Peso: 30.0,
    Dias_Refugio: 20,
    Precio_Mantenimiento: 200,
    Precio_Adopción: 350,
  },
  {
    ID_Animal: "A004",
    Nombre: "Milo",
    Especie: "Gato",
    Raza: "Persa",
    Edad: 4,
    Peso: 4.5,
    Dias_Refugio: 15,
    Precio_Mantenimiento: 120,
    Precio_Adopción: 270,
  },
];

export default function AnimalTable() {
  const [animals, setAnimals] = useState(initialAnimals);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleColumns, setVisibleColumns] = useState([
    "Nombre",
    "Especie",
    "Raza",
    "Edad",
    "Peso",
    "Precio_Adopción",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [newAnimal, setNewAnimal] = useState({
    ID_Animal: "",
    Nombre: "",
    Especie: "",
    Raza: "",
    Edad: "",
    Peso: "",
    Dias_Refugio: "",
    Precio_Mantenimiento: "",
    Precio_Adopción: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    setAnimals(animals.filter((animal) => animal.ID_Animal !== id));
  };

  const handleEdit = (animal) => {
    setEditingAnimal(animal);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    setAnimals(
        animals.map((animal) =>
            animal.ID_Animal === editingAnimal.ID_Animal ? editingAnimal : animal
        )
    );                                                                                
    setOpenEditDialog(false);
  };

  const handleAdd = () => {
    setAnimals([...animals, { ...newAnimal }]);
    setNewAnimal({
      ID_Animal: "",
      Nombre: "",
      Especie: "",
      Raza: "",
      Edad: "",
      Peso: "",
      Dias_Refugio: "",
      Precio_Mantenimiento: "",
      Precio_Adopción: "",
    });
    setOpenAddDialog(false);
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
          return a.Nombre.localeCompare(b.Nombre);
        } else {
          return b.Nombre.localeCompare(a.Nombre);
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
          {["Nombre", "Especie", "Raza", "Edad", "Peso", "Precio_Adopción"].map((column) => (
              <MenuItem key={column}>
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={visibleColumns.includes(column)}
                          onChange={() => toggleColumn(column)}
                      />
                    }
                    label={column}
                />
              </MenuItem>
          ))}
        </Menu>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {visibleColumns.includes("Nombre") && (
                    <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                      Nombre {sortOrder === "asc" ? "↑" : "↓"}
                    </TableCell>
                )}
                {visibleColumns.includes("Especie") && <TableCell>Especie</TableCell>}
                {visibleColumns.includes("Raza") && <TableCell>Raza</TableCell>}
                {visibleColumns.includes("Edad") && <TableCell>Edad</TableCell>}
                {visibleColumns.includes("Peso") && <TableCell>Peso</TableCell>}
                {visibleColumns.includes("Precio_Adopción") && <TableCell>Precio de Adopción</TableCell>}
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAnimals.map((animal) => (
                  <TableRow key={animal.ID_Animal}>
                    {visibleColumns.includes("Nombre") && (
                        <TableCell>{animal.Nombre}</TableCell>
                    )}
                    {visibleColumns.includes("Especie") && (
                        <TableCell>{animal.Especie}</TableCell>
                    )}
                    {visibleColumns.includes("Raza") && (
                        <TableCell>{animal.Raza}</TableCell>
                    )}
                    {visibleColumns.includes("Edad") && (
                        <TableCell>{animal.Edad}</TableCell>
                    )}
                    {visibleColumns.includes("Peso") && (
                        <TableCell>{animal.Peso}</TableCell>
                    )}
                    {visibleColumns.includes("Precio_Adopción") && (
                        <TableCell>{animal.Precio_Adopción}</TableCell>
                    )}
                    <TableCell>
                      <IconButton
                          onClick={() => handleEdit(animal)}
                          color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                          onClick={() => handleDelete(animal.ID_Animal)}
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

        {/* Diálogo para agregar animal */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Agregar Nuevo Animal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, ingrese los detalles del nuevo animal.
            </DialogContentText>
            {[
              "ID_Animal",
              "Nombre",
              "Especie",
              "Raza",
              "Edad",
              "Peso",
              "Dias_Refugio",
              "Precio_Mantenimiento",
              "Precio_Adopción",
            ].map((field) => (
                <TextField
                    key={field}
                    label={field}
                    fullWidth
                    variant="outlined"
                    value={newAnimal[field]}
                    onChange={(e) =>
                        setNewAnimal({ ...newAnimal, [field]: e.target.value })
                    }
                    sx={{ mb: 2 }}
                />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
            <Button onClick={handleAdd}>Agregar</Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo para editar animal */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Editar Animal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, edite los detalles del animal.
            </DialogContentText>
            {editingAnimal && (
                <>
                  {[
                    "ID_Animal",
                    "Nombre",
                    "Especie",
                    "Raza",
                    "Edad",
                    "Peso",
                    "Dias_Refugio",
                    "Precio_Mantenimiento",
                    "Precio_Adopción",
                  ].map((field) => (
                      <TextField
                          key={field}
                          label={field}
                          fullWidth
                          variant="outlined"
                          value={editingAnimal[field]}
                          onChange={(e) =>
                              setEditingAnimal({
                                ...editingAnimal,
                                [field]: e.target.value,
                              })
                          }
                          sx={{ mb: 2 }}
                      />
                  ))}
                </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </Paper>
  );
}
