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

const initialTransportes = [
    {
        id: 1,
        nombre: "Transporte Urbano",
        capacidad: 15,
        tipoVehiculo: "Minibus",
    },
    {
        id: 2,
        nombre: "Transporte Rural",
        capacidad: 5,
        tipoVehiculo: "Camioneta",
    },
];

export default function TransporteTable() {
    const [transportes, setTransportes] = useState(initialTransportes);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState([
        "nombre",
        "capacidad",
        "tipoVehiculo",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingTransporte, setEditingTransporte] = useState(null);
    const [newTransporte, setNewTransporte] = useState({
        nombre: "",
        capacidad: "",
        tipoVehiculo: "",
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
        setTransportes(transportes.filter((transporte) => transporte.id !== id));
    };

    const handleEdit = (transporte) => {
        setEditingTransporte(transporte);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setTransportes(
            transportes.map((transporte) =>
                transporte.id === editingTransporte.id ? editingTransporte : transporte
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...transportes.map((t) => t.id)) + 1;
        setTransportes([...transportes, { ...newTransporte, id }]);
        setNewTransporte({ nombre: "", capacidad: "", tipoVehiculo: "" });
        setOpenAddDialog(false);
    };

    const toggleColumn = (column) => {
        setVisibleColumns((prev) =>
            prev.includes(column)
                ? prev.filter((col) => col !== column)
                : [...prev, column]
        );
    };

    const filteredTransportes = transportes
        .filter((transporte) =>
            Object.values(transporte).some((value) =>
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
                label="Buscar transportes"
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
                {["nombre", "capacidad", "tipoVehiculo"].map((column) => (
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
                            {visibleColumns.includes("capacidad") && (
                                <TableCell>Capacidad</TableCell>
                            )}
                            {visibleColumns.includes("tipoVehiculo") && (
                                <TableCell>Tipo de Vehículo</TableCell>
                            )}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransportes.map((transporte) => (
                            <TableRow key={transporte.id}>
                                {visibleColumns.includes("nombre") && (
                                    <TableCell>{transporte.nombre}</TableCell>
                                )}
                                {visibleColumns.includes("capacidad") && (
                                    <TableCell>{transporte.capacidad}</TableCell>
                                )}
                                {visibleColumns.includes("tipoVehiculo") && (
                                    <TableCell>{transporte.tipoVehiculo}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(transporte)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(transporte.id)}
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
                Agregar Transporte
            </Button>

            {/* Diálogo para agregar transporte */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nuevo Transporte</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles del nuevo transporte.
                    </DialogContentText>
                    {["nombre", "capacidad", "tipoVehiculo"].map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newTransporte[field]}
                            onChange={(e) =>
                                setNewTransporte({ ...newTransporte, [field]: e.target.value })
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar transporte */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Transporte</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, modifique los detalles del transporte.
                    </DialogContentText>
                    {editingTransporte &&
                        ["nombre", "capacidad", "tipoVehiculo"].map((field) => (
                            <TextField
                                key={field}
                                margin="dense"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingTransporte[field]}
                                onChange={(e) =>
                                    setEditingTransporte({
                                        ...editingTransporte,
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
