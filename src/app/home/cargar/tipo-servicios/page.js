"use client"
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

const initialServices = [
    { id: 1, nombre: "Veterinario" },
    { id: 2, nombre: "Paseo" },
    { id: 3, nombre: "Alimentación" },
];

export default function ServiceTypeTable() {
    const [services, setServices] = useState(initialServices);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState(["nombre"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({
        nombre: "",
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
        setServices(services.filter((service) => service.id !== id));
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setServices(
            services.map((service) =>
                service.id === editingService.id ? editingService : service
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...services.map((s) => s.id)) + 1;
        setServices([...services, { ...newService, id }]);
        setNewService({
            nombre: "",
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

    const filteredServices = services
        .filter((service) =>
            Object.values(service).some((value) =>
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
                label="Buscar tipos de servicio"
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
                {["nombre"].map((column) => (
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
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredServices.map((service) => (
                            <TableRow key={service.id}>
                                {visibleColumns.includes("nombre") && (
                                    <TableCell>{service.nombre}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(service)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(service.id)}
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
                Agregar Tipo de Servicio
            </Button>

            {/* Diálogo para agregar tipo de servicio */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nuevo Tipo de Servicio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese el nombre del nuevo tipo de servicio.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newService.nombre}
                        onChange={(e) =>
                            setNewService({ ...newService, nombre: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar tipo de servicio */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Tipo de Servicio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, modifique el nombre del tipo de servicio.
                    </DialogContentText>
                    {editingService && (
                        <TextField
                            margin="dense"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editingService.nombre}
                            onChange={(e) =>
                                setEditingService({
                                    ...editingService,
                                    nombre: e.target.value,
                                })
                            }
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
                    <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
