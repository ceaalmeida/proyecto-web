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
    const [donaciones, setDonaciones] = useState(initialDonaciones);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState([
        "nombreDonante",
        "monto",
        "fecha",
        "tipoDonacion",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingDonacion, setEditingDonacion] = useState(null);
    const [errors, setErrors] = useState({});
    const [newDonacion, setNewDonacion] = useState({
        nombreDonante: "",
        monto: "",
        fecha: "",
        tipoDonacion: "",
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
        setDonaciones(donaciones.filter((donacion) => donacion.id !== id));
    };

    const handleEdit = (donacion) => {
        setEditingDonacion(donacion);
        setOpenEditDialog(true);
    };

    const handleAdd = () => {
        if (validate(newDonacion)) {
            const id = (donaciones.length + 1).toString();
            setDonaciones([...donaciones, { ...newDonacion, id }]);
            setNewDonacion({
                nombreDonante: "", monto: "", fecha: "", tipoDonacion: "",
            });
            setOpenAddDialog(false);
        }
    };

    const handleSaveEdit = () => {
        if (validate(editingDonacion)) {
            setDonaciones(donaciones.map((donacion) => (donacion.id === editingDonacion.id ? editingDonacion : donacion)));
            setOpenEditDialog(false);
        }
    };

    const validate = (donacion) => {
        let errors = {};

        if (!donacion.nombreDonante || !/^[a-zA-Z\s]+$/.test(donacion.nombreDonante)) {
            errors.nombreDonante = "El nombre del donante no puede estar vacío y debe contener solo letras y espacios.";
        }
        if (!donacion.monto || isNaN(donacion.monto)) {
            errors.monto = "El monto debe ser un número y no puede estar vacío.";
        }
        if (!donacion.fecha) {
            errors.fecha = "La fecha no puede estar vacía.";
        }
        if (!donacion.tipoDonacion || !/^[a-zA-Z\s]+$/.test(donacion.tipoDonacion)) {
            errors.tipoDonacion = "El tipo de donación no puede estar vacío y debe contener solo letras.";
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

    const filteredDonaciones = donaciones
        .filter((donacion) =>
            Object.values(donacion).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.nombreDonante.localeCompare(b.nombreDonante);
            } else {
                return b.nombreDonante.localeCompare(a.nombreDonante);
            }
        });

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
                {["nombreDonante", "monto", "fecha", "tipoDonacion"].map((column) => (
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
                            {visibleColumns.includes("nombreDonante") && (
                                <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                                    Nombre del Donante {sortOrder === "asc" ? "↑" : "↓"}
                                </TableCell>
                            )}
                            {visibleColumns.includes("monto") && <TableCell>Monto</TableCell>}
                            {visibleColumns.includes("fecha") && <TableCell>Fecha</TableCell>}
                            {visibleColumns.includes("tipoDonacion") && (
                                <TableCell>Tipo de Donación</TableCell>
                            )}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDonaciones.map((donacion) => (
                            <TableRow key={donacion.id}>
                                {visibleColumns.includes("nombreDonante") && (
                                    <TableCell>{donacion.nombreDonante}</TableCell>
                                )}
                                {visibleColumns.includes("monto") && (
                                    <TableCell>{donacion.monto}</TableCell>
                                )}
                                {visibleColumns.includes("fecha") && (
                                    <TableCell>{donacion.fecha}</TableCell>
                                )}
                                {visibleColumns.includes("tipoDonacion") && (
                                    <TableCell>{donacion.tipoDonacion}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(donacion)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(donacion.id)}
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
                Agregar Donación
            </Button>

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
                        value={newDonacion.nombreDonante}
                        onChange={(e) => setNewDonacion({ ...newDonacion, nombreDonante: e.target.value })}
                        error={!!errors.nombreDonante}
                        helperText={errors.nombreDonante}
                    />
                    <TextField
                        margin="dense"
                        label="Monto"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newDonacion.monto}
                        onChange={(e) => setNewDonacion({ ...newDonacion, monto: e.target.value })}
                        error={!!errors.monto}
                        helperText={errors.monto}
                    />
                    <TextField
                        key="fecha"
                        margin="dense"
                        label="Fecha"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={newDonacion.fecha}
                        onChange={(e) => setNewDonacion({ ...newDonacion, fecha: e.target.value })}
                        error={!!errors.fecha}
                        helperText={errors.fecha}
                    />
                    <TextField
                        margin="dense"
                        label="Tipo Donación"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newDonacion.tipoDonacion}
                        onChange={(e) => setNewDonacion({ ...newDonacion, tipoDonacion: e.target.value })}
                        error={!!errors.tipoDonacion}
                        helperText={errors.tipoDonacion}
                    />
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
                                value={editingDonacion.nombreDonante}
                                onChange={(e) => setEditingDonacion({ ...editingDonacion, nombreDonante: e.target.value })}
                                error={!!errors.nombreDonante}
                                helperText={errors.nombreDonante}
                            />
                            <TextField
                                margin="dense"
                                label="Monto"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingDonacion.monto}
                                onChange={(e) => setEditingDonacion({ ...editingDonacion, monto: e.target.value })}
                                error={!!errors.monto}
                                helperText={errors.monto}
                            />
                            <TextField
                                key="fecha"
                                margin="dense"
                                label="Fecha"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={editingDonacion.fecha}
                                onChange={(e) => setEditingDonacion({ ...editingDonacion, fecha: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Tipo Donación"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingDonacion.tipoDonacion}
                                onChange={(e) => setEditingDonacion({ ...editingDonacion, tipoDonacion: e.target.value })}
                                error={!!errors.tipoDonacion}
                                helperText={errors.tipoDonacion}
                            />
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
