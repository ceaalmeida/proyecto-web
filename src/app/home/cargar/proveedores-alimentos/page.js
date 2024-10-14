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

const initialProveedoresAlimentos = [
    {
        id: 1,
        nombre: "Alimentos Gourmet",
        direccion: "Calle 123, Ciudad",
        email: "contacto@alimentosgourmet.com",
        idAlimento: "1",
    },
    {
        id: 2,
        nombre: "NutriPet",
        direccion: "Avenida 456, Ciudad",
        email: "info@nutripet.com",
        idAlimento: "2",
    },
];

export default function ProveedorAlimentosTable() {
    const [proveedores, setProveedores] = useState(initialProveedoresAlimentos);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState([
        "nombre",
        "direccion",
        "email",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProveedor, setEditingProveedor] = useState(null);
    const [newProveedor, setNewProveedor] = useState({
        nombre: "",
        direccion: "",
        email: "",
        idAlimento: "",
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
        setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
    };

    const handleEdit = (proveedor) => {
        setEditingProveedor(proveedor);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setProveedores(
            proveedores.map((proveedor) =>
                proveedor.id === editingProveedor.id ? editingProveedor : proveedor
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...proveedores.map((p) => p.id)) + 1;
        setProveedores([...proveedores, { ...newProveedor, id }]);
        setNewProveedor({ nombre: "", direccion: "", email: "", idAlimento: "" });
        setOpenAddDialog(false);
    };

    const toggleColumn = (column) => {
        setVisibleColumns((prev) =>
            prev.includes(column)
                ? prev.filter((col) => col !== column)
                : [...prev, column]
        );
    };

    const filteredProveedores = proveedores
        .filter((proveedor) =>
            Object.values(proveedor).some((value) =>
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
                label="Buscar proveedores"
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
                {["nombre", "direccion", "email"].map((column) => (
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
                            {visibleColumns.includes("direccion") && (
                                <TableCell>Dirección</TableCell>
                            )}
                            {visibleColumns.includes("email") && (
                                <TableCell>Email</TableCell>
                            )}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProveedores.map((proveedor) => (
                            <TableRow key={proveedor.id}>
                                {visibleColumns.includes("nombre") && (
                                    <TableCell>{proveedor.nombre}</TableCell>
                                )}
                                {visibleColumns.includes("direccion") && (
                                    <TableCell>{proveedor.direccion}</TableCell>
                                )}
                                {visibleColumns.includes("email") && (
                                    <TableCell>{proveedor.email}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(proveedor)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(proveedor.id)}
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
                Agregar Proveedor de Alimentos
            </Button>

            {/* Diálogo para agregar proveedor */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles del nuevo proveedor.
                    </DialogContentText>
                    {["nombre", "direccion", "email", "idAlimento"].map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newProveedor[field]}
                            onChange={(e) =>
                                setNewProveedor({ ...newProveedor, [field]: e.target.value })
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar proveedor */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Proveedor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, modifique los detalles del proveedor.
                    </DialogContentText>
                    {editingProveedor &&
                        ["nombre", "direccion", "email", "idAlimento"].map((field) => (
                            <TextField
                                key={field}
                                margin="dense"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingProveedor[field]}
                                onChange={(e) =>
                                    setEditingProveedor({
                                        ...editingProveedor,
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
