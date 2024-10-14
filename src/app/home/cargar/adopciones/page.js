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

    const handleEdit = (adopcion) => {
        setEditingAdopcion(adopcion);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setAdopciones(
            adopciones.map((adopcion) =>
                adopcion.idAdopcion === editingAdopcion.idAdopcion ? editingAdopcion : adopcion
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        setAdopciones([...adopciones, { ...newAdopcion }]);
        setNewAdopcion({
            idAdopcion: "",
            idAnimal: "",
            fecha: "",
            costoAdopcion: "",
            nombreAdoptante: "",
            emailAdoptante: "",
            telefonoAdoptante: "",
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
                        onChange={(e) =>
                            setNewAdopcion({ ...newAdopcion, idAdopcion: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="ID Animal"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.idAnimal}
                        onChange={(e) =>
                            setNewAdopcion({ ...newAdopcion, idAnimal: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Fecha"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={newAdopcion.fecha}
                        onChange={(e) =>
                            setNewAdopcion({ ...newAdopcion, fecha: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Costo Adopción"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.costoAdopcion}
                        onChange={(e) =>
                            setNewAdopcion({ ...newAdopcion, costoAdopcion: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Nombre Adoptante"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.nombreAdoptante}
                        onChange={(e) =>
                            setNewAdopcion({ ...newAdopcion, nombreAdoptante: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Email Adoptante"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.emailAdoptante}
                        onChange={(e) =>
                            setNewAdopcion({ ...newAdopcion, emailAdoptante: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Teléfono Adoptante"
                        fullWidth
                        variant="outlined"
                        value={newAdopcion.telefonoAdoptante}
                        onChange={(e) =>
                            setNewAdopcion({ ...newAdopcion, telefonoAdoptante: e.target.value })
                        }
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
                                value={editingAdopcion.idAdopcion}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
                                        idAdopcion: e.target.value,
                                    })
                                }
                                disabled
                            />
                            <TextField
                                margin="dense"
                                label="ID Animal"
                                fullWidth
                                variant="outlined"
                                value={editingAdopcion.idAnimal}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
                                        idAnimal: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Fecha"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={editingAdopcion.fecha}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
                                        fecha: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Costo Adopción"
                                fullWidth
                                variant="outlined"
                                value={editingAdopcion.costoAdopcion}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
                                        costoAdopcion: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Nombre Adoptante"
                                fullWidth
                                variant="outlined"
                                value={editingAdopcion.nombreAdoptante}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
                                        nombreAdoptante: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Email Adoptante"
                                fullWidth
                                variant="outlined"
                                value={editingAdopcion.emailAdoptante}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
                                        emailAdoptante: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Teléfono Adoptante"
                                fullWidth
                                variant="outlined"
                                value={editingAdopcion.telefonoAdoptante}
                                onChange={(e) =>
                                    setEditingAdopcion({
                                        ...editingAdopcion,
                                        telefonoAdoptante: e.target.value,
                                    })
                                }
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
