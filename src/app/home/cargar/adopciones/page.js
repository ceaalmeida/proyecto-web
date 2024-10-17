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
    const [adopciones, setAdopciones] = useState(initialAdopciones);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState([
        "idAdopcion",
        "idAnimal",
        "fecha",
        "costoAdopcion",
        "nombreAdoptante",
        "emailAdoptante",
        "telefonoAdoptante",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingAdopcion, setEditingAdopcion] = useState(null);
    const [errors, setErrors] = useState({});
    const [newAdopcion, setNewAdopcion] = useState({
        idAdopcion: "",
        idAnimal: "",
        fecha: "",
        costoAdopcion: "",
        nombreAdoptante: "",
        emailAdoptante: "",
        telefonoAdoptante: "",
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
        setAdopciones(adopciones.filter((adopcion) => adopcion.idAdopcion !== id));
    };
    const validate = (adopcion) => {
        let errors = {};

        if (!adopcion.idAdopcion || !/^[a-zA-Z0-9]{6,}$/.test(adopcion.idAdopcion)) {
            errors.idAdopcion = "El ID de adopción debe tener al menos 6 caracteres y contener solo letras o números.";
        }
        if (!adopcion.idAnimal || !/^[a-zA-Z0-9]{6,}$/.test(adopcion.idAnimal)) {
            errors.idAnimal = "El ID de animal debe tener al menos 6 caracteres y contener solo letras o números.";
        }
        if (!adopcion.costoAdopcion || isNaN(adopcion.costoAdopcion)) {
            errors.costoAdopcion = "El costo de adopción debe ser un número y no puede estar vacío.";
        }
        if (!adopcion.nombreAdoptante || !/^[a-zA-Z\s]+$/.test(adopcion.nombreAdoptante)) {
            errors.nombreAdoptante = "El nombre no puede estar vacío y debe contener solo letras y espacios.";
        }
        if (!adopcion.emailAdoptante || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adopcion.emailAdoptante)) {
            errors.emailAdoptante = "El email debe tener un formato válido (ej. correo@correo.com).";
        }
        if (!adopcion.telefonoAdoptante || !/^\d{8}$/.test(adopcion.telefonoAdoptante)) {
            errors.telefonoAdoptante = "El teléfono debe contener solo números y tener 8 caracteres.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleEdit = (adopcion) => {
        setEditingAdopcion(adopcion);
        setOpenEditDialog(true);
    };

    const handleAdd = () => {
        if (validate(newAdopcion)) {
            setAdopciones([...adopciones, { ...newAdopcion }]);
            setNewAdopcion({
                idAdopcion: "", idAnimal: "", fecha: "", costoAdopcion: "", nombreAdoptante: "", emailAdoptante: "", telefonoAdoptante: "",
            });
            setOpenAddDialog(false);
        }
    };

    const handleSaveEdit = () => {
        if (validate(editingAdopcion)) {
            setAdopciones(adopciones.map((adopcion) => (adopcion.idAdopcion === editingAdopcion.idAdopcion ? editingAdopcion : adopcion)));
            setOpenEditDialog(false);
        }
    };


    const toggleColumn = (column) => {
        setVisibleColumns((prev) =>
            prev.includes(column)
                ? prev.filter((col) => col !== column)
                : [...prev, column]
        );
    };

    const filteredAdopciones = adopciones
        .filter((adopcion) =>
            Object.values(adopcion).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.idAdopcion.localeCompare(b.idAdopcion);
            } else {
                return b.idAdopcion.localeCompare(a.idAdopcion);
            }
        });

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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {visibleColumns.includes("idAdopcion") && (
                                <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                                    ID Adopción {sortOrder === "asc" ? "↑" : "↓"}
                                </TableCell>
                            )}
                            {visibleColumns.includes("idAnimal") && (
                                <TableCell>ID Animal</TableCell>
                            )}
                            {visibleColumns.includes("fecha") && <TableCell>Fecha</TableCell>}
                            {visibleColumns.includes("costoAdopcion") && <TableCell>Costo Adopción</TableCell>}
                            {visibleColumns.includes("nombreAdoptante") && <TableCell>Nombre Adoptante</TableCell>}
                            {visibleColumns.includes("emailAdoptante") && <TableCell>Email Adoptante</TableCell>}
                            {visibleColumns.includes("telefonoAdoptante") && <TableCell>Teléfono Adoptante</TableCell>}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAdopciones.map((adopcion) => (
                            <TableRow key={adopcion.idAdopcion}>
                                {visibleColumns.includes("idAdopcion") && (
                                    <TableCell>{adopcion.idAdopcion}</TableCell>
                                )}
                                {visibleColumns.includes("idAnimal") && (
                                    <TableCell>{adopcion.idAnimal}</TableCell>
                                )}
                                {visibleColumns.includes("fecha") && (
                                    <TableCell>{adopcion.fecha}</TableCell>
                                )}
                                {visibleColumns.includes("costoAdopcion") && (
                                    <TableCell>{adopcion.costoAdopcion}</TableCell>
                                )}
                                {visibleColumns.includes("nombreAdoptante") && (
                                    <TableCell>{adopcion.nombreAdoptante}</TableCell>
                                )}
                                {visibleColumns.includes("emailAdoptante") && (
                                    <TableCell>{adopcion.emailAdoptante}</TableCell>
                                )}
                                {visibleColumns.includes("telefonoAdoptante") && (
                                    <TableCell>{adopcion.telefonoAdoptante}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(adopcion)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(adopcion.idAdopcion)}
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
                Agregar Adopción
            </Button>

            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nueva Adopción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Llenar los detalles de la nueva adopción.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="ID Adopción"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.idAdopcion}
                        onChange={(e) => setNewAdopcion({ ...newAdopcion, idAdopcion: e.target.value })}
                        error={!!errors.idAdopcion}
                        helperText={errors.idAdopcion}
                    />
                    <TextField
                        margin="dense"
                        label="ID Animal"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.idAnimal}
                        onChange={(e) => setNewAdopcion({ ...newAdopcion, idAnimal: e.target.value })}
                        error={!!errors.idAnimal}
                        helperText={errors.idAnimal}
                    />
                    <TextField
                        margin="dense"
                        label="Fecha"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={newAdopcion.fecha}
                        onChange={(e) => setNewAdopcion({ ...newAdopcion, fecha: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Costo Adopción"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.costoAdopcion}
                        onChange={(e) => setNewAdopcion({ ...newAdopcion, costoAdopcion: e.target.value })}
                        error={!!errors.costoAdopcion}
                        helperText={errors.costoAdopcion}
                    />
                    <TextField
                        margin="dense"
                        label="Nombre Adoptante"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.nombreAdoptante}
                        onChange={(e) => setNewAdopcion({ ...newAdopcion, nombreAdoptante: e.target.value })}
                        error={!!errors.nombreAdoptante}
                        helperText={errors.nombreAdoptante}
                    />
                    <TextField
                        margin="dense"
                        label="Email Adoptante"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.emailAdoptante}
                        onChange={(e) => setNewAdopcion({ ...newAdopcion, emailAdoptante: e.target.value })}
                        error={!!errors.emailAdoptante}
                        helperText={errors.emailAdoptante}
                    />
                    <TextField
                        margin="dense"
                        label="Teléfono Adoptante"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.telefonoAdoptante}
                        onChange={(e) => setNewAdopcion({ ...newAdopcion, telefonoAdoptante: e.target.value })}
                        error={!!errors.telefonoAdoptante}
                        helperText={errors.telefonoAdoptante}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

        </Paper>
    );
}
