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
        id: 1,
        idAnimal: "A001",
        idAdoptante: "AD001",
        fecha: "2024-01-15",
        cuota: 200,
    },
    {
        id: 2,
        idAnimal: "A002",
        idAdoptante: "AD002",
        fecha: "2024-02-12",
        cuota: 150,
    },
];

export default function AdopcionesTable() {
    const [adopciones, setAdopciones] = useState(initialAdopciones);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState([
        "idAnimal",
        "idAdoptante",
        "fecha",
        "cuota",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingAdopcion, setEditingAdopcion] = useState(null);
    const [newAdopcion, setNewAdopcion] = useState({
        idAnimal: "",
        idAdoptante: "",
        fecha: "",
        cuota: "",
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
        setAdopciones(adopciones.filter((adopcion) => adopcion.id !== id));
    };

    const handleEdit = (adopcion) => {
        setEditingAdopcion(adopcion);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setAdopciones(
            adopciones.map((adopcion) =>
                adopcion.id === editingAdopcion.id ? editingAdopcion : adopcion
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...adopciones.map((a) => a.id)) + 1;
        setAdopciones([...adopciones, { ...newAdopcion, id }]);
        setNewAdopcion({ idAnimal: "", idAdoptante: "", fecha: "", cuota: "" });
        setOpenAddDialog(false);
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
                return a.idAnimal.localeCompare(b.idAnimal);
            } else {
                return b.idAnimal.localeCompare(a.idAnimal);
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
                {["idAnimal", "idAdoptante", "fecha", "cuota"].map((column) => (
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
                            {visibleColumns.includes("idAnimal") && (
                                <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                                    ID Animal {sortOrder === "asc" ? "↑" : "↓"}
                                </TableCell>
                            )}
                            {visibleColumns.includes("idAdoptante") && (
                                <TableCell>ID Adoptante</TableCell>
                            )}
                            {visibleColumns.includes("fecha") && <TableCell>Fecha</TableCell>}
                            {visibleColumns.includes("cuota") && <TableCell>Cuota</TableCell>}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAdopciones.map((adopcion) => (
                            <TableRow key={adopcion.id}>
                                {visibleColumns.includes("idAnimal") && (
                                    <TableCell>{adopcion.idAnimal}</TableCell>
                                )}
                                {visibleColumns.includes("idAdoptante") && (
                                    <TableCell>{adopcion.idAdoptante}</TableCell>
                                )}
                                {visibleColumns.includes("fecha") && (
                                    <TableCell>{adopcion.fecha}</TableCell>
                                )}
                                {visibleColumns.includes("cuota") && (
                                    <TableCell>{adopcion.cuota}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(adopcion)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(adopcion.id)}
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

            {/* Diálogo para agregar adopción */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nueva Adopción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles de la nueva adopción.
                    </DialogContentText>
                    {["idAnimal", "idAdoptante", "fecha", "cuota"].map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newAdopcion[field]}
                            onChange={(e) =>
                                setNewAdopcion({ ...newAdopcion, [field]: e.target.value })
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar adopción */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Adopción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, modifique los detalles de la adopción.
                    </DialogContentText>
                    {editingAdopcion &&
                        ["idAnimal", "idAdoptante", "fecha", "cuota"].map((field) => (
                            <TextField
                                key={field}
                                margin="dense"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingAdopcion[field]}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
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
