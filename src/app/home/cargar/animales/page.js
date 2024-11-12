"use client";
import React, { useEffect, useState } from "react";
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
  CircularProgress,
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
import AnimalService from "../../../api/animal/animal.service";

export default function AnimalTable() {
  const [animals, setAnimals] = useState([]);
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
  const [editado, setEditado] = useState();
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
  const [addAnimal, setaddAnimal] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [borrar, setBorrar] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const animales = async () => {
      const lista = await AnimalService.getAllAnimal();
      setAnimals(lista);
    };
    animales();
  }, [editado]);

  useEffect(() => {
    const update = async () => {
      if (editado) {
        const a = await AnimalService.updateAnimal(editado.ID_Animal, editado);
      }
    };
    update();
    setEditado(null);
  }, [editado]);

  useEffect(() => {
    const add = async () => {
      if (addAnimal) {
        const ani = await AnimalService.createAnimal(addAnimal);
        window.alert(ani);
      }
    };
    add();
    setaddAnimal(null);
  }, [addAnimal]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setAnimals(animals.filter((animal) => animal.ID_Animal !== borrar));
    await AnimalService.deleteAnimal(borrar);
    setOpenConfirmDialog(false);
    setDeleting(false);
  };

  const handleEdit = (animal) => {
    setEditingAnimal(animal);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    // setAnimals(
    //   animals.map((animal) =>
    //     animal.ID_Animal === editingAnimal.ID_Animal ? editingAnimal : animal
    //   )
    // );

    setEditado(editingAnimal);
    setOpenEditDialog(false);
  };

  const handleAdd = () => {
    newAnimal.ID_Animal = Math.floor(100000 + Math.random() * 900000);
    //window.alert(newAnimal.ID_Animal);
    setAnimals([...animals, { ...newAnimal }]);
    setaddAnimal(newAnimal);
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
        {["Nombre", "Especie", "Raza", "Edad", "Peso", "Precio_Adopción"].map(
          (column) => (
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
          )
        )}
      </Menu>

      <TableContainer component={Paper}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mt: 2 }}
        >
          Agregar Animal
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {visibleColumns.includes("Nombre") && (
                <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                  Nombre {sortOrder === "asc" ? "↑" : "↓"}
                </TableCell>
              )}
              {visibleColumns.includes("Especie") && (
                <TableCell>Especie</TableCell>
              )}
              {visibleColumns.includes("Raza") && <TableCell>Raza</TableCell>}
              {visibleColumns.includes("Edad") && <TableCell>Edad</TableCell>}
              {visibleColumns.includes("Peso") && <TableCell>Peso</TableCell>}
              {visibleColumns.includes("Precio_Adopción") && (
                <TableCell>Precio de Adopción</TableCell>
              )}
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
                    onClick={() => {
                      setOpenConfirmDialog(true);
                      setBorrar(animal.ID_Animal);
                    }}
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

      {/* Diálogo para agregar animal */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nuevo Animal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles del nuevo animal.
          </DialogContentText>
          {[
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
      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Eliminar Animal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar este Animal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={deleting ? null : handleDelete} color="error">
            {deleting ? <CircularProgress color="error" /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
