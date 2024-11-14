"use client";
import AnimalService from "../../../api/animal/animal.service";
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
  FormControlLabel,
  InputLabel,
  FormControl,
  Select,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ViewColumn as ViewColumnIcon,
} from "@mui/icons-material";
import DonacionService from "../../../api/donacion/donacion.service";
const initialDonaciones = [
  {
    id: "1",
    nombreDonante: "Juan Pérez",
    monto: 150.0,
    fecha: "2024-10-01",
    tipoDonacion: "Monetaria",
  },
  {
    id: "2",
    nombreDonante: "Maria Gómez",
    monto: 200.0,
    fecha: "2024-09-25",
    tipoDonacion: "Alimentos",
  },
];

export default function DonacionesTable() {
  const [donaciones, setDonaciones] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleColumns, setVisibleColumns] = useState([
    "Nombre_Donante",
    "Monto",
    "Fecha",
    "Email_Donante",
    "Telefono_Donante",
    "ID_Animal",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDonacion, setEditingDonacion] = useState(null);
  const [errors, setErrors] = useState({});
  const [newDonacion, setNewDonacion] = useState({
    Nombre_Donante: "",
    Monto: "",
    Fecha: "",
    Email_Donante: "",
    Telefono_Donante: "",
    ID_Animal: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [animales, setAnimales] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [borrar, setBorrar] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [editado, setEditado] = useState();
  

  const GetBy = (id) => {
    const res = animales.find((animales) => animales.ID_Animal === id);
    return res.Nombre;
  };

  useEffect(() => {
    const getAll = async () => {
      const listaAnimal = await AnimalService.getAllAnimal();
      // window.alert(JSON.stringify(listaAnimal, null, 2));
      setAnimales(listaAnimal);
    };
    getAll();
  }, []);

  useEffect(() => {
    const inicial = async () => {
      const res = await DonacionService.getAll();
      setDonaciones(res);
    };
    inicial();
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDonaciones(
      donaciones.filter((donacion) => donacion.ID_Donacion !== borrar)
    );
    await DonacionService.delete(borrar);
    setOpenConfirmDialog(false);
    setDeleting(false);
  };

  const handleEdit = (donacion) => {
    setEditingDonacion(donacion);
    setOpenEditDialog(true);
  };

  const handleAdd = async () => {
    const id = Math.floor(100000 + Math.random() * 900000);
    newDonacion.ID_Donacion = id;
    const neww = newDonacion;
    window.alert(neww.Fecha);
    const res = await DonacionService.create(neww);
    setDonaciones([...donaciones, { ...newDonacion, ID_Donacion: id }]);
    setNewDonacion({
      Nombre_Donante: "",
      Monto: "",
      Fecha: "",
      Email_Donante: "",
      Telefono_Donante: "",
      ID_Animal: "",
    });
    setOpenAddDialog(false);
  };
  //   useEffect(() => {
  //     handleAdd()
  //   }, []);
  useEffect(() => {
    const update = async () => {
      if (editado) {
        const a = await DonacionService.update(editado.ID_Donacion, editado);
      }
    };
    update();
    setEditado(null);
  }, [editado]);

  const handleSaveEdit = () => {
    setDonaciones(
      donaciones.map((donacion) =>
        donacion.ID_Donacion === editingDonacion.ID_Donacion
          ? editingDonacion
          : donacion
      )
    );
    setEditado(editingDonacion);
    setOpenEditDialog(false);
  };

  const validate = (donacion) => {
    let errors = {};

    if (
      !donacion.Nombre_Donante ||
      !/^[a-zA-Z\s]+$/.test(donacion.Nombre_Donante)
    ) {
      errors.Nombre_Donante =
        "El nombre del donante no puede estar vacío y debe contener solo letras y espacios.";
    }
    if (!donacion.Monto || isNaN(donacion.Monto)) {
      errors.Monto = "El monto debe ser un número y no puede estar vacío.";
    }
    if (!donacion.Fecha) {
      errors.Fecha = "La fecha no puede estar vacía.";
    }
    if (!donacion.ID_Animal) {
      errors.ID_Animal = "El ID del animal no puede estar vacío.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  // Filtrado y ordenamiento
  const filteredDonaciones = donaciones.filter((donacion) =>
    Object.values(donacion).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  //   .sort((a, b) => {
  //     if (sortOrder === "asc") {
  //       return a.Nombre_Donante.localeCompare(b.Nombre_Donante);
  //     } else {
  //       return b.Nombre_Donante.localeCompare(a.Nombre_Donante);
  //     }
  //   });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <TextField
        label="Buscar donaciones"
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
        {[
          "Nombre_Donante",
          "Monto",
          "Fecha",
          "Email_Donante",
          "Telefono_Donante",
          "ID_Animal",
        ].map((column) => (
          <MenuItem key={column}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={visibleColumns.includes(column)}
                  onChange={() => toggleColumn(column)}
                />
              }
              label={column.replace("_", " ")}
            />
          </MenuItem>
        ))}
      </Menu>
      <TableContainer component={Paper}>
        {" "}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mt: 2 }}
        >
          Agregar Donación
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {visibleColumns.includes("Nombre_Donante") && (
                <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                  Nombre del Donante {sortOrder === "asc" ? "↑" : "↓"}
                </TableCell>
              )}
              {visibleColumns.includes("Monto") && <TableCell>Monto</TableCell>}
              {visibleColumns.includes("Fecha") && <TableCell>Fecha</TableCell>}
              {visibleColumns.includes("Email_Donante") && (
                <TableCell>Email del Donante</TableCell>
              )}
              {visibleColumns.includes("Telefono_Donante") && (
                <TableCell>Teléfono del Donante</TableCell>
              )}
              {visibleColumns.includes("ID_Animal") && (
                <TableCell>ID del Animal</TableCell>
              )}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonaciones.map((donacion) => (
              <TableRow key={donacion.ID_Donacion}>
                {visibleColumns.includes("Nombre_Donante") && (
                  <TableCell>{donacion.Nombre_Donante}</TableCell>
                )}
                {visibleColumns.includes("Monto") && (
                  <TableCell>{donacion.Monto}</TableCell>
                )}
                {visibleColumns.includes("Fecha") && (
                  <TableCell>{donacion.Fecha}</TableCell>
                )}
                {visibleColumns.includes("Email_Donante") && (
                  <TableCell>{donacion.Email_Donante}</TableCell>
                )}
                {visibleColumns.includes("Telefono_Donante") && (
                  <TableCell>{donacion.Telefono_Donante}</TableCell>
                )}
                {visibleColumns.includes("ID_Animal") && (
                  <TableCell>{GetBy(donacion.ID_Animal)}</TableCell>
                )}
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(donacion)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenConfirmDialog(true);
                      setBorrar(donacion.ID_Donacion);
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

      {/* Diálogo para agregar donación */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nueva Donación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles de la nueva donación.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Nombre Donante"
            type="text"
            fullWidth
            variant="standard"
            value={newDonacion.Nombre_Donante}
            onChange={(e) =>
              setNewDonacion({ ...newDonacion, Nombre_Donante: e.target.value })
            }
            error={!!errors.Nombre_Donante}
            helperText={errors.Nombre_Donante}
          />
          <TextField
            margin="dense"
            label="Monto"
            type="number"
            fullWidth
            variant="standard"
            value={newDonacion.Monto}
            onChange={(e) =>
              setNewDonacion({
                ...newDonacion,
                Monto: parseFloat(e.target.value),
              })
            }
            error={!!errors.Monto}
            helperText={errors.Monto}
          />
          <TextField
            margin="dense"
            label="Fecha"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newDonacion.Fecha}
            onChange={(e) =>
              setNewDonacion({ ...newDonacion, Fecha: e.target.value })
            }
            error={!!errors.Fecha}
            helperText={errors.Fecha}
          />
          <TextField
            margin="dense"
            label="Email Donante"
            type="email"
            fullWidth
            variant="standard"
            value={newDonacion.Email_Donante}
            onChange={(e) =>
              setNewDonacion({ ...newDonacion, Email_Donante: e.target.value })
            }
            error={!!errors.Email_Donante}
            helperText={errors.Email_Donante}
          />
          <TextField
            margin="dense"
            label="Teléfono Donante"
            type="text"
            fullWidth
            variant="standard"
            value={newDonacion.Telefono_Donante}
            onChange={(e) =>
              setNewDonacion({
                ...newDonacion,
                Telefono_Donante: e.target.value,
              })
            }
            error={!!errors.Telefono_Donante}
            helperText={errors.Telefono_Donante}
          />
          <FormControl fullWidth margin="dense" key="Animal">
            <InputLabel>Animal</InputLabel>
            <Select
              value={newDonacion.ID_Animal}
              onChange={(e) =>
                setNewDonacion({ ...newDonacion, ID_Animal: e.target.value })
              }
            >
              {animales.map((field) => (
                <MenuItem value={field.ID_Animal}>{field.Nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar donación */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Donación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, modifique los detalles de la donación.
          </DialogContentText>
          {editingDonacion && (
            <>
              <TextField
                margin="dense"
                label="Nombre Donante"
                type="text"
                fullWidth
                variant="standard"
                value={editingDonacion.Nombre_Donante}
                onChange={(e) =>
                  setEditingDonacion({
                    ...editingDonacion,
                    Nombre_Donante: e.target.value,
                  })
                }
                error={!!errors.Nombre_Donante}
                helperText={errors.Nombre_Donante}
              />
              <TextField
                margin="dense"
                label="Monto"
                type="number"
                fullWidth
                variant="standard"
                value={editingDonacion.Monto}
                onChange={(e) =>
                  setEditingDonacion({
                    ...editingDonacion,
                    Monto: parseFloat(e.target.value),
                  })
                }
                error={!!errors.Monto}
                helperText={errors.Monto}
              />
              <TextField
                margin="dense"
                label="Fecha"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={editingDonacion.Fecha}
                onChange={(e) =>
                  setEditingDonacion({
                    ...editingDonacion,
                    Fecha: e.target.value,
                  })
                }
                error={!!errors.Fecha}
                helperText={errors.Fecha}
              />
              <TextField
                margin="dense"
                label="Email Donante"
                type="email"
                fullWidth
                variant="standard"
                value={editingDonacion.Email_Donante}
                onChange={(e) =>
                  setEditingDonacion({
                    ...editingDonacion,
                    Email_Donante: e.target.value,
                  })
                }
                error={!!errors.Email_Donante}
                helperText={errors.Email_Donante}
              />
              <TextField
                margin="dense"
                label="Teléfono Donante"
                type="text"
                fullWidth
                variant="standard"
                value={editingDonacion.Telefono_Donante}
                onChange={(e) =>
                  setEditingDonacion({
                    ...editingDonacion,
                    Telefono_Donante: e.target.value,
                  })
                }
                error={!!errors.Telefono_Donante}
                helperText={errors.Telefono_Donante}
              />
              <FormControl fullWidth margin="dense" key="Animal">
                <InputLabel>Animal</InputLabel>
                <Select
                  value={editingDonacion.ID_Animal}
                  onChange={(e) =>
                    setEditingDonacion({
                      ...editingDonacion,
                      ID_Animal: e.target.value,
                    })
                  }
                >
                  {animales.map((field) => (
                    <MenuItem value={field.ID_Animal}>{field.Nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
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
