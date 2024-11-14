"use client";
import React, { useEffect, useState } from "react";
import AdopcionService from "../../../api/adopcion/adopcion.service";
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
  FormControl,
  CircularProgress,
  IconButton,
  Menu,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewColumn as ViewColumnIcon,
} from "@mui/icons-material";
import AnimalService from "../../../api/animal/animal.service";

const initialAdopciones = [
  {
    idAdopcion: "AD001",
    idAnimal: "A001",
    fecha: "2024-01-15",
    costoAdopcion: 200,
    nombreAdoptante: "Juan Pérez",
    emailAdoptante: "juan@example.com",
    telefonoAdoptante: "123456789",
  },
  {
    idAdopcion: "AD002",
    idAnimal: "A002",
    fecha: "2024-02-12",
    costoAdopcion: 150,
    nombreAdoptante: "María Gómez",
    emailAdoptante: "maria@example.com",
    telefonoAdoptante: "987654321",
  },
];

export default function AdopcionesTable() {
  const [adopciones, setAdopciones] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleColumns, setVisibleColumns] = useState([
    "ID_Adopcion",
    "ID_Animal",
    "Fecha",
    "Costo_Adopcion",
    "Nombre_Adoptante",
    "Email_Adoptante",
    "Telefono_Adoptante",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAdopcion, setEditingAdopcion] = useState(null);
  const [editado, setEditado] = useState(null);
  const [errors, setErrors] = useState({});
  const [newAdopcion, setNewAdopcion] = useState({
    ID_Adopcion: "",
    ID_Animal: "",
    Fecha: "",
    Costo_Adopcion: "",
    Nombre_Adoptante: "",
    Email_Adoptante: "",
    Telefono_Adoptante: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [add, setAdd] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [borrar, setBorrar] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [animales, setAnimales] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const listaAnimal = await AnimalService.getAllAnimal();
     // window.alert(JSON.stringify(listaAnimal, null, 2));
      setAnimales(listaAnimal);
    };
    getAll();
  }, []);

  useEffect(() => {
    const inicia = async () => {
      const initi = await AdopcionService.getAll();
      setAdopciones(initi);
    };
    inicia(); // Llama a la función asíncrona cuando el componente se monte
  }, [editado]);


  const GetBy = (id) => {       
    const res=animales.find(animales => animales.ID_Animal === id);    
    return res.Nombre || "Cargando..." ;
  };

  useEffect(() => {
    const update = async () => {
      if (editado) {
        const a = await AdopcionService.update(editado.ID_Adopcion, editado);
      }
    };
    update();
    setEditado(null);
  }, [editado]);
  useEffect(() => {
    const ad = async () => {
      if (add) {
        await AdopcionService.create(add);
      }
    };
    ad();
    setAdd(null);
  }, [add]);
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setAdopciones(
      adopciones.filter((adopcion) => adopcion.ID_Adopcion !== borrar)
    );
    await AdopcionService.delete(borrar);
    setOpenConfirmDialog(false);
    setDeleting(false);
  };

  const validate = (adopcion) => {
    let errors = {};

    if (
      !adopcion.ID_Adopcion ||
      !/^[a-zA-Z0-9]{6,}$/.test(adopcion.ID_Adopcion)
    ) {
      errors.ID_Adopcion =
        "El ID de adopción debe tener al menos 6 caracteres y contener solo letras o números.";
    }
    if (!adopcion.ID_Animal || !/^[a-zA-Z0-9]+$/.test(adopcion.ID_Animal)) {
      errors.ID_Animal =
        "El ID de animal debe tener al menos 6 caracteres y contener solo letras o números.";
    }
    if (!adopcion.Costo_Adopcion || isNaN(adopcion.Costo_Adopcion)) {
      errors.Costo_Adopcion =
        "El costo de adopción debe ser un número y no puede estar vacío.";
    }
    if (
      !adopcion.Nombre_Adoptante ||
      !/^[a-zA-Z\s]+$/.test(adopcion.Nombre_Adoptante)
    ) {
      errors.Nombre_Adoptante =
        "El nombre no puede estar vacío y debe contener solo letras y espacios.";
    }
    if (
      !adopcion.Email_Adoptante ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adopcion.Email_Adoptante)
    ) {
      errors.Email_Adoptante =
        "El email debe tener un formato válido (ej. correo@correo.com).";
    }
    if (
      !adopcion.Telefono_Adoptante ||
      !/^\d{8}$/.test(adopcion.Telefono_Adoptante)
    ) {
      errors.Telefono_Adoptante =
        "El teléfono debe contener solo números y tener 8 caracteres.";
    }
    if (!adopcion.Fecha) {
      errors.Fecha = "La fecha no puede estar vacía.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = (adopcion) => {
    setEditingAdopcion(adopcion);

    setOpenEditDialog(true);
  };

  const handleAdd = () => {
    setAdopciones([...adopciones, { ...newAdopcion }]);
    setAdd(newAdopcion);
    setNewAdopcion({
      ID_Adopcion: "",
      ID_Animal: "",
      Fecha: "",
      Costo_Adopcion: "",
      Nombre_Adoptante: "",
      Email_Adoptante: "",
      Telefono_Adoptante: "",
    });
    setOpenAddDialog(false);
  };

  const handleSaveEdit = () => {
    setEditado(editingAdopcion);
    // if (validate(editingAdopcion)) {
    // if(true){
    //     //setAdopciones(adopciones.map((adopcion) => (adopcion.ID_Adopcion === editingAdopcion.ID_Adopcion ? editingAdopcion : adopcion)));
    //     await AdopcionService.update(editingAdopcion);
    //     setOpenEditDialog(false);
    // }
    setOpenEditDialog(false);
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const filteredAdopciones = adopciones.filter((adopcion) =>
    Object.values(adopcion).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <TextField
        label="Buscar adopciones"
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
        {visibleColumns.map((column) => (
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mt: 2 }}
        >
          Agregar Adopción
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* {visibleColumns.includes("ID_Adopcion") && (
                            <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                                ID Adopción {sortOrder === "asc" ? "↑" : "↓"}
                            </TableCell>
                        )} */}
              {visibleColumns.includes("ID_Animal") && (
                <TableCell>ID Animal</TableCell>
              )}
              {visibleColumns.includes("Fecha") && <TableCell>Fecha</TableCell>}
              {visibleColumns.includes("Costo_Adopcion") && (
                <TableCell>Costo Adopción</TableCell>
              )}
              {visibleColumns.includes("Nombre_Adoptante") && (
                <TableCell>Nombre Adoptante</TableCell>
              )}
              {visibleColumns.includes("Email_Adoptante") && (
                <TableCell>Email Adoptante</TableCell>
              )}
              {visibleColumns.includes("Telefono_Adoptante") && (
                <TableCell>Teléfono Adoptante</TableCell>
              )}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdopciones.map((adopcion) => (
              <TableRow key={adopcion.ID_Adopcion}>
                {/* {visibleColumns.includes("ID_Adopcion") && (
                  <TableCell>{adopcion.ID_Adopcion}</TableCell>
                )} */}
                {visibleColumns.includes("ID_Animal") && (
                  <TableCell>{GetBy(adopcion.ID_Animal)}</TableCell>     
                            
                )}
                {visibleColumns.includes("Fecha") && (
                  <TableCell>{adopcion.Fecha}</TableCell>
                )}
                {visibleColumns.includes("Costo_Adopcion") && (
                  <TableCell>{adopcion.Costo_Adopcion}</TableCell>
                )}
                {visibleColumns.includes("Nombre_Adoptante") && (
                  <TableCell>{adopcion.Nombre_Adoptante}</TableCell>
                )}
                {visibleColumns.includes("Email_Adoptante") && (
                  <TableCell>{adopcion.Email_Adoptante}</TableCell>
                )}
                {visibleColumns.includes("Telefono_Adoptante") && (
                  <TableCell>{adopcion.Telefono_Adoptante}</TableCell>
                )}
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(adopcion)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenConfirmDialog(true);
                      setBorrar(adopcion.ID_Adopcion);
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

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nueva Adopción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llenar los detalles de la nueva adopción.
          </DialogContentText>
          <FormControl fullWidth margin="dense" key="Animal">
            <InputLabel>Animal</InputLabel>
            <Select
              value={newAdopcion.ID_Animal}
              onChange={(e) =>
                setNewAdopcion({ ...newAdopcion, ID_Animal: e.target.value })
              }
            >
              {animales.map((field) => (
                <MenuItem value={field.ID_Animal}>{field.Nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Fecha"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newAdopcion.Fecha}
            onChange={(e) =>
              setNewAdopcion({ ...newAdopcion, Fecha: e.target.value })
            }
            error={!!errors.Fecha}
            helperText={errors.Fecha}
          />
          <TextField
            margin="dense"
            label="Costo Adopción"
            fullWidth
            variant="outlined"
            value={newAdopcion.Costo_Adopcion}
            onChange={(e) =>
              setNewAdopcion({ ...newAdopcion, Costo_Adopcion: e.target.value })
            }
            error={!!errors.Costo_Adopcion}
            helperText={errors.Costo_Adopcion}
          />
          <TextField
            margin="dense"
            label="Nombre Adoptante"
            fullWidth
            variant="outlined"
            value={newAdopcion.Nombre_Adoptante}
            onChange={(e) =>
              setNewAdopcion({
                ...newAdopcion,
                Nombre_Adoptante: e.target.value,
              })
            }
            error={!!errors.Nombre_Adoptante}
            helperText={errors.Nombre_Adoptante}
          />
          <TextField
            margin="dense"
            label="Email Adoptante"
            fullWidth
            variant="outlined"
            value={newAdopcion.Email_Adoptante}
            onChange={(e) =>
              setNewAdopcion({
                ...newAdopcion,
                Email_Adoptante: e.target.value,
              })
            }
            error={!!errors.Email_Adoptante}
            helperText={errors.Email_Adoptante}
          />
          <TextField
            margin="dense"
            label="Teléfono Adoptante"
            fullWidth
            variant="outlined"
            value={newAdopcion.Telefono_Adoptante}
            onChange={(e) =>
              setNewAdopcion({
                ...newAdopcion,
                Telefono_Adoptante: e.target.value,
              })
            }
            error={!!errors.Telefono_Adoptante}
            helperText={errors.Telefono_Adoptante}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Adopción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modificar los detalles de la adopción.
          </DialogContentText>
          {editingAdopcion && (
            <>
              <TextField
                margin="dense"
                label="ID Adopción"
                fullWidth
                variant="outlined"
                value={editingAdopcion.ID_Adopcion}
                onChange={(e) =>
                  setEditingAdopcion({
                    ...editingAdopcion,
                    ID_Adopcion: e.target.value,
                  })
                }
                disabled
              />
              <TextField
                margin="dense"
                label="ID Animal"
                fullWidth
                variant="outlined"
                value={editingAdopcion.ID_Animal}
                onChange={(e) =>
                  setEditingAdopcion({
                    ...editingAdopcion,
                    ID_Animal: e.target.value,
                  })
                }
                error={!!errors.ID_Animal}
                helperText={errors.ID_Animal}
              />
              <TextField
                margin="dense"
                label="Fecha"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={editingAdopcion.Fecha}
                onChange={(e) =>
                  setEditingAdopcion({
                    ...editingAdopcion,
                    Fecha: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Costo Adopción"
                fullWidth
                variant="outlined"
                value={editingAdopcion.Costo_Adopcion}
                onChange={(e) =>
                  setEditingAdopcion({
                    ...editingAdopcion,
                    Costo_Adopcion: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Nombre Adoptante"
                fullWidth
                variant="outlined"
                value={editingAdopcion.Nombre_Adoptante}
                onChange={(e) =>
                  setEditingAdopcion({
                    ...editingAdopcion,
                    Nombre_Adoptante: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Email Adoptante"
                fullWidth
                variant="outlined"
                value={editingAdopcion.Email_Adoptante}
                onChange={(e) =>
                  setEditingAdopcion({
                    ...editingAdopcion,
                    Email_Adoptante: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Teléfono Adoptante"
                fullWidth
                variant="outlined"
                value={editingAdopcion.Telefono_Adoptante}
                onChange={(e) =>
                  setEditingAdopcion({
                    ...editingAdopcion,
                    Telefono_Adoptante: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit}>Actualizar</Button>
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
            ¿Está seguro de que desea eliminar esta Adopcion?
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
