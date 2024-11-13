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
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

export default function GenericCRUDTable({
  idItem,
  entityName,
  loadAll,
  createEntity,
  updateEntity,
  deleteEntity,
  columns,
  session,
}) {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletedEntity, setDeletedEntity] = useState(false);
  let borrado;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const items = await loadAll(session?.user?.token);
      setData(items);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      console.log(newItem);
      await createEntity(newItem);
      setNewItem({});
      setOpenAddDialog(false);
      await loadData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
    setLoading(false);
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await updateEntity(editingItem[idItem], editingItem);
      await loadData();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error editing item:", error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      console.log(session);
      console.log(session?.user?.token);
      console.log("Item to delete");
      await deleteEntity(itemToDelete, session?.user?.token);
      await loadData();
      setOpenConfirmDialog(false);
      setDeletedEntity(true);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    setDeletedEntity(false);
    setLoading(false);
  };

  const renderTextField = (key, label) => (
    <TextField
      key={key}
      margin="dense"
      label={label}
      type="text"
      fullWidth
      variant="standard"
      value={newItem[key] || ""}
      onChange={(e) =>
        setNewItem({
          ...newItem,
          [key]: e.target.value,
        })
      }
    />
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      {idItem != "id" && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mt: 2 }}
        >
          {`Agregar ${entityName}`}
        </Button>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.label}</TableCell>
              ))}
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>{item[col.key]}</TableCell>
                ))}
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditingItem(item);
                      setOpenEditDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setItemToDelete(item[idItem]);
                      setOpenConfirmDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>{`Agregar Nuevo ${entityName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles del nuevo {entityName}.
          </DialogContentText>
          {columns.map((col) => renderTextField(col.key, col.label))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={loading ? null : handleAdd}>
            {loading ? <CircularProgress size={24} /> : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>{`Editar ${entityName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifique los detalles del {entityName}.
          </DialogContentText>
          {editingItem &&
            columns.map((col) => (
              <TextField
                key={col.key}
                margin="dense"
                label={col.label}
                type="text"
                fullWidth
                variant="standard"
                value={editingItem[col.key] || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    [col.key]: e.target.value,
                  })
                }
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={loading ? null : handleEdit}>
            {loading ? <CircularProgress size={24} /> : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>{`Eliminar ${entityName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar este {entityName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={loading ? null : handleDelete} color="error">
            {loading ? <CircularProgress size={24} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
