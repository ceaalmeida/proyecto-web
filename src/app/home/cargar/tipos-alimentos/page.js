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
import GenericCRUDTable from "../../../../components/home/generic-table";

export default function FoodTypeTable() {
  const { data: session, status } = useSession();

  const columns = [{ key: "Nombre_Alimento", label: "Nombre de Alimento" }];

  const loadFoods = async () => {
    const foods = await loadAllFoods(session?.user?.token);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleAdd = async (newData) => {
    try {
      const ID_Alimento = Math.floor(100000 + Math.random() * 900000);
      const alimento = { ...newData, ID_Alimento };
      await createFood(alimento, session?.user?.token);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFood(id, session?.user?.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      await updateFood(id, updatedData, session?.user?.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <GenericCRUDTable
      entityName="Tipo de Alimento"
      columns={columns}
      loadAll={loadAllFoods}
      createEntity={handleAdd}
      updateEntity={handleEdit}
      deleteEntity={handleDelete}
      session={session}
      idItem={"ID_Alimento"}
    />
  );
}
