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
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

const initialFoodTypes = [
    { id: 1, tipo: "Seco", descripcion: "Alimento seco para perros y gatos" },
    { id: 2, tipo: "Húmedo", descripcion: "Alimento húmedo para perros y gatos" },
    { id: 3, tipo: "Snacks", descripcion: "Snacks y golosinas para mascotas" },
];

export default function FoodTypeTable() {
    const [foodTypes, setFoodTypes] = useState(initialFoodTypes);
    const [editingType, setEditingType] = useState(null);
    const [newType, setNewType] = useState({
        tipo: "",
        descripcion: "",
    });
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleDelete = (id) => {
        setFoodTypes(foodTypes.filter((type) => type.id !== id));
    };

    const handleEdit = (type) => {
        setEditingType(type);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setFoodTypes(
            foodTypes.map((type) =>
                type.id === editingType.id ? editingType : type
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...foodTypes.map((t) => t.id)) + 1;
        setFoodTypes([...foodTypes, { ...newType, id }]);
        setNewType({ tipo: "", descripcion: "" });
        setOpenAddDialog(false);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddDialog(true)}
                sx={{ mb: 2 }}
            >
                Agregar Tipo de Alimento
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {foodTypes.map((type) => (
                            <TableRow key={type.id}>
                                <TableCell>{type.tipo}</TableCell>
                                <TableCell>{type.descripcion}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(type)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(type.id)}
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

            {/* Diálogo para agregar tipo de alimento */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nuevo Tipo de Alimento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles del nuevo tipo de alimento.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Tipo"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newType.tipo}
                        onChange={(e) =>
                            setNewType({ ...newType, tipo: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newType.descripcion}
                        onChange={(e) =>
                            setNewType({ ...newType, descripcion: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar tipo de alimento */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Tipo de Alimento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, modifique los detalles del tipo de alimento.
                    </DialogContentText>
                    {editingType && (
                        <>
                            <TextField
                                margin="dense"
                                label="Tipo"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingType.tipo}
                                onChange={(e) =>
                                    setEditingType({
                                        ...editingType,
                                        tipo: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Descripción"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={editingType.descripcion}
                                onChange={(e) =>
                                    setEditingType({
                                        ...editingType,
                                        descripcion: e.target.value,
                                    })
                                }
                            />
                        </>
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
