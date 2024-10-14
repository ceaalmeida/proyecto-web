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

const initialActivities = [
    { id: 1, descripcion: "Cuidado de perros", precio: 100, precioTransporte: 20 },
    { id: 2, descripcion: "Adopción de gatos", precio: 150, precioTransporte: 25 },
];

export default function ActivityTable() {
    const [activities, setActivities] = useState(initialActivities);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingActivity, setEditingActivity] = useState(null);
    const [newActivity, setNewActivity] = useState({
        descripcion: "",
        precio: "",
        precioTransporte: "",
    });
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        setActivities(activities.filter((activity) => activity.id !== id));
    };

    const handleEdit = (activity) => {
        setEditingActivity(activity);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setActivities(
            activities.map((activity) =>
                activity.id === editingActivity.id ? editingActivity : activity
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...activities.map((a) => a.id)) + 1;
        setActivities([...activities, { ...newActivity, id }]);
        setNewActivity({ descripcion: "", precio: "", precioTransporte: "" });
        setOpenAddDialog(false);
    };

    const filteredActivities = activities.filter((activity) =>
        Object.values(activity).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    ).sort((a, b) => {
        if (sortOrder === "asc") {
            return a.descripcion.localeCompare(b.descripcion);
        } else {
            return b.descripcion.localeCompare(a.descripcion);
        }
    });

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
            <TextField
                label="Buscar actividades"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                                Descripción {sortOrder === "asc" ? "↑" : "↓"}
                            </TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Precio Transporte</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredActivities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell>{activity.descripcion}</TableCell>
                                <TableCell>{activity.precio}</TableCell>
                                <TableCell>{activity.precioTransporte}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(activity)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(activity.id)}
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
                Agregar Actividad
            </Button>

            {/* Diálogo para agregar actividad */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nueva Actividad</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles de la nueva actividad.
                    </DialogContentText>
                    {["descripcion", "precio", "precioTransporte"].map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newActivity[field]}
                            onChange={(e) =>
                                setNewActivity({ ...newActivity, [field]: e.target.value })
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar actividad */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Actividad</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, modifique los detalles de la actividad.
                    </DialogContentText>
                    {editingActivity &&
                        ["descripcion", "precio", "precioTransporte"].map((field) => (
                            <TextField
                                key={field}
                                margin="dense"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingActivity[field]}
                                onChange={(e) =>
                                    setEditingActivity({
                                        ...editingActivity,
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
