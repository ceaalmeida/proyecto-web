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
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

const initialVeterinarians = [
    { id: 1, nombre: "Dr. Pedro Pérez", clinica: "Clínica Veterinaria A", direccion: "Calle 123", especialidad: "Cirugía", telefono: "123456789", fax: "987654321", email: "pedro@clinica.com", distancia: "10 km", modalidad: "A domicilio" },
    { id: 2, nombre: "Dra. Ana Gómez", clinica: "Clínica Veterinaria B", direccion: "Calle 456", especialidad: "Dermatología", telefono: "234567890", fax: "876543210", email: "ana@clinica.com", distancia: "15 km", modalidad: "En clínica" },
];

export default function VeterinarianTable() {
    const [veterinarians, setVeterinarians] = useState(initialVeterinarians);
    const [editingVeterinarian, setEditingVeterinarian] = useState(null);
    const [newVeterinarian, setNewVeterinarian] = useState({
        nombre: "",
        clinica: "",
        direccion: "",
        especialidad: "",
        telefono: "",
        fax: "",
        email: "",
        distancia: "",
        modalidad: "",
    });
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleDelete = (id) => {
        setVeterinarians(veterinarians.filter((veterinarian) => veterinarian.id !== id));
    };

    const handleEdit = (veterinarian) => {
        setEditingVeterinarian(veterinarian);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setVeterinarians(
            veterinarians.map((veterinarian) =>
                veterinarian.id === editingVeterinarian.id ? editingVeterinarian : veterinarian
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...veterinarians.map((v) => v.id)) + 1;
        setVeterinarians([...veterinarians, { ...newVeterinarian, id }]);
        setNewVeterinarian({
            nombre: "",
            clinica: "",
            direccion: "",
            especialidad: "",
            telefono: "",
            fax: "",
            email: "",
            distancia: "",
            modalidad: "",
        });
        setOpenAddDialog(false);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Clínica</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Especialidad</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Fax</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Distancia</TableCell>
                            <TableCell>Modalidad</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {veterinarians.map((veterinarian) => (
                            <TableRow key={veterinarian.id}>
                                <TableCell>{veterinarian.nombre}</TableCell>
                                <TableCell>{veterinarian.clinica}</TableCell>
                                <TableCell>{veterinarian.direccion}</TableCell>
                                <TableCell>{veterinarian.especialidad}</TableCell>
                                <TableCell>{veterinarian.telefono}</TableCell>
                                <TableCell>{veterinarian.fax}</TableCell>
                                <TableCell>{veterinarian.email}</TableCell>
                                <TableCell>{veterinarian.distancia}</TableCell>
                                <TableCell>{veterinarian.modalidad}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(veterinarian)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(veterinarian.id)}
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
                sx={{  mt: 2}}
            >
                Agregar Veterinario
            </Button>

            {/* Diálogo para agregar veterinario */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nuevo Veterinario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles del nuevo veterinario.
                    </DialogContentText>
                    {Object.keys(newVeterinarian).map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newVeterinarian[field]}
                            onChange={(e) =>
                                setNewVeterinarian({ ...newVeterinarian, [field]: e.target.value })
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar veterinario */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Veterinario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, modifique los detalles del veterinario.
                    </DialogContentText>
                    {editingVeterinarian &&
                        Object.keys(editingVeterinarian).map((field) => (
                            <TextField
                                key={field}
                                margin="dense"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingVeterinarian[field]}
                                onChange={(e) =>
                                    setEditingVeterinarian({
                                        ...editingVeterinarian,
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
