"use client";
import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  loadAllFoods,
  createFood,
  deleteFood,
  readFood,
  updateFood,
} from "../../../api/tipo-de-alimento/tipo-de-alimento.service";
import { useSession } from "next-auth/react";

export default function FoodTypeTable() {
  const [foodTypes, setFoodTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [creatingFood, setCreatingFodd] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);
  const [deletingFood, setDeletingFood] = useState(false);

  const [newType, setNewType] = useState({
    ID_Alimento: "",
    Nombre_Alimento: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editType, setEditType] = useState(false);
  const {data: session, status} = useSession()

  const loadFoods = async () => {
    const foods = await loadAllFoods(session?.user?.token);
    setFoodTypes(foods);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleAdd = async () => {
    setCreatingFodd(true);
    const id = Math.max(...foodTypes.map((t) => t.id)) + 1;
    try {
      await createFood(newType, session?.user?.token);
    } catch (error) {
      alert(error.message);
    }

    setFoodTypes([...foodTypes, { ...newType, id }]);
    setNewType({ ID_Alimento: "", Nombre_Alimento: "" });
    setOpenAddDialog(false);
    setCreatingFodd(false);
  };

  const handleDelete = async () => {
    setDeletingFood(true);
    await deleteFood(foodToDelete, session?.user?.token);

    setFoodTypes(foodTypes.filter((food) => food.ID_Alimento !== foodToDelete));
    setOpenConfirmDialog(false);
    setDeletingFood(false);
  };

  const handleSaveEdit = async () => {
    setEditType(true);

    try {
      await updateFood(editingType.ID_Alimento, editingType, session?.user?.token);
    } catch (error) {
      console.log(error.message);
    }

    setFoodTypes(
      foodTypes.map((type) =>
        type.ID_Alimento === editingType.ID_Alimento ? editingType : type
      )
    );
    setOpenEditDialog(false);
    setEditType(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
        sx={{ mt: 2 }}
      >
        Agregar Tipo de Alimento
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N ombre del Alimento</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodTypes.map((food) => (
              <TableRow key={food.ID_Alimento}>
                <TableCell>{food.Nombre_Alimento}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditingType(food);
                      setOpenEditDialog(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setFoodToDelete(food.ID_Alimento);
                      setOpenConfirmDialog(true);
                    }}
                  >
                    Eliminar
                  </Button>
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
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={newType.descripcion}
            onChange={(e) =>
              setNewType({
                ...newType,
                Nombre_Alimento: e.target.value,
                ID_Alimento: Math.floor(100000 + Math.random() * 900000),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={creatingFood ? null : handleAdd}>
            {creatingFood ? <CircularProgress /> : "Agregar"}
          </Button>
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
                label="Nombre"
                type="text"
                fullWidth
                variant="standard"
                value={editingType.Nombre_Alimento}
                onChange={(e) =>
                  setEditingType({
                    ...editingType,
                    Nombre_Alimento: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={editType ? null : handleSaveEdit}>
            {editType ? <CircularProgress /> : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialogo de Confirmacion para Eliminar */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Eliminar Tipo de Alimento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar el Tipo de Alimento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={deletingFood ? null : handleDelete} color="error">
            {deletingFood ? <CircularProgress /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
