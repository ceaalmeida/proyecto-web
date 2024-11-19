import React, { useEffect, useState } from "react";
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
  DialogTitle,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ProveedoresAlimentosService from "../../../api/proveedor_alimentos/proveedor_alimentos.service";
import ContratadosService from "../../../api/contratados/contratados.service";
import ContratoService from "../../../api/contratos/contratos.service";

// Generar código único basado en el nombre
const generarCodigoProveedor = (nombreProveedor) => {
  return nombreProveedor.slice(0, 6) + Math.floor(Math.random() * 100000);
};

export default function ProveedoresAlimentosTable() {
  const [proveedores, setProveedores] = useState([]);
  const [newProveedor, setNewProveedor] = useState({
    Nombre_Proveedor: "",
    Dirección: "",
    Email: "",
    ID_Alimento: "",
  });
  const [newContrato, setNewContrato] = useState({
    Código_Contrato: "",
    Descripción: "",
    Fecha_Inicio: "",
    Fecha_Terminacion: "",
    Fecha_Conciliacion: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [tab, setTab] = useState("proveedor");

  const loadProveedores = async () => {
    const data = await ProveedoresAlimentosService.getAllProveedoresAlimentos();
    setProveedores(data);
  };

  useEffect(() => {
    try {
      loadProveedores();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAdd = async () => {
    if (!newProveedor.Nombre_Proveedor || !newProveedor.Email) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const codigoProveedor = generarCodigoProveedor(
      newProveedor.Nombre_Proveedor
    );
    const idContratado = codigoProveedor.split("").reverse().join("");

    const contrato = {
      ...newContrato,
      Código_Contrato: codigoProveedor,
      Fecha_Inicio: new Date(newContrato.Fecha_Inicio),
      Fecha_Terminacion: new Date(newContrato.Fecha_Terminacion),
      Fecha_Conciliacion: new Date(newContrato.Fecha_Conciliacion),
    };

    const contratado = {
      Código_Contrato: codigoProveedor,
      ID_Contratado: idContratado,
    };

    const proveedor = {
      ...newProveedor,
      ID_Contratado: idContratado,
    };

    await ContratoService.createContrato(contrato);
    await ContratadosService.createContratado(contratado);
    await ProveedoresAlimentosService.createProveedor(proveedor);

    setProveedores([...proveedores, proveedor]);
    setOpenDialog(false);
  };

  const handleEdit = (proveedor) => {
    setNewProveedor(proveedor);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (newProveedor.ID_Contratado) {
        // Actualizar proveedor existente
        await ProveedoresAlimentosService.updateProveedor(
          newProveedor.ID_Contratado,
          newProveedor
        );
        setProveedores(
          proveedores.map((prov) =>
            prov.ID_Contratado === newProveedor.ID_Contratado
              ? newProveedor
              : prov
          )
        );
        alert("Proveedor actualizado correctamente.");
      } else {
        // Crear nuevo proveedor
        await handleAdd();
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error al guardar el proveedor:", error);
      alert("Ocurrió un error al intentar guardar el proveedor.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const proveedorToDelete = proveedores.find(
        (prov) => prov.ID_Contratado === id
      );
      if (!proveedorToDelete) {
        alert("No se encontró el proveedor.");
        return;
      }

      const contratado = await ContratadosService.getContratadoById(
        proveedorToDelete.ID_Contratado
      );
      if (!contratado) {
        alert("No se encontró el contratado asociado.");
        return;
      }

      const codigoContrato = contratado.Código_Contrato;

      await ProveedoresAlimentosService.deleteProveedor(id);
      await ContratadosService.deleteContratado(contratado.ID_Contratado);
      await ContratoService.deleteContrato(codigoContrato);

      setProveedores(proveedores.filter((prov) => prov.ID_Contratado !== id));
      alert("Proveedor y sus relaciones eliminados correctamente.");
    } catch (error) {
      console.error("Error eliminando proveedor y relaciones:", error);
      alert("Hubo un error al eliminar el proveedor y sus relaciones.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProveedores = proveedores.filter((prov) =>
    JSON.stringify(prov).toLowerCase().includes(searchQuery)
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <TextField
        label="Buscar Proveedor"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Agregar Proveedor
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
        <DialogContent>
          <div>
            <Button onClick={() => setTab("proveedor")}>Proveedor</Button>
            <Button onClick={() => setTab("contrato")}>Contrato</Button>
          </div>

          {tab === "proveedor" && (
            <>
              <TextField
                label="Nombre del Proveedor"
                fullWidth
                value={newProveedor.Nombre_Proveedor}
                onChange={(e) =>
                  setNewProveedor({
                    ...newProveedor,
                    Nombre_Proveedor: e.target.value,
                  })
                }
              />
              <TextField
                label="Dirección"
                fullWidth
                value={newProveedor.Dirección}
                onChange={(e) =>
                  setNewProveedor({
                    ...newProveedor,
                    Dirección: e.target.value,
                  })
                }
              />
              <TextField
                label="Email"
                fullWidth
                value={newProveedor.Email}
                onChange={(e) =>
                  setNewProveedor({ ...newProveedor, Email: e.target.value })
                }
              />
              <TextField
                label="ID Alimento"
                fullWidth
                value={newProveedor.ID_Alimento}
                onChange={(e) =>
                  setNewProveedor({
                    ...newProveedor,
                    ID_Alimento: e.target.value,
                  })
                }
              />
            </>
          )}

          {tab === "contrato" && (
            <>
              <TextField
                label="Descripción"
                fullWidth
                value={newContrato.Descripción}
                onChange={(e) =>
                  setNewContrato({
                    ...newContrato,
                    Descripción: e.target.value,
                  })
                }
              />
              <TextField
                label="Fecha de Inicio"
                fullWidth
                placeholder="YYYY-MM-DD"
                value={newContrato.Fecha_Inicio}
                onChange={(e) =>
                  setNewContrato({
                    ...newContrato,
                    Fecha_Inicio: e.target.value,
                  })
                }
              />
              <TextField
                label="Fecha de Terminación"
                fullWidth
                placeholder="YYYY-MM-DD"
                value={newContrato.Fecha_Terminacion}
                onChange={(e) =>
                  setNewContrato({
                    ...newContrato,
                    Fecha_Terminacion: e.target.value,
                  })
                }
              />
              <TextField
                label="Fecha de Conciliación"
                fullWidth
                placeholder="YYYY-MM-DD"
                value={newContrato.Fecha_Conciliacion}
                onChange={(e) =>
                  setNewContrato({
                    ...newContrato,
                    Fecha_Conciliacion: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSave}>
            {newProveedor.ID_Contratado ? "Guardar Cambios" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Proveedor</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>ID Alimento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProveedores.map((prov) => (
              <TableRow key={prov.ID_Contratado}>
                <TableCell>{prov.Nombre_Proveedor}</TableCell>
                <TableCell>{prov.Dirección}</TableCell>
                <TableCell>{prov.Email}</TableCell>
                <TableCell>{prov.ID_Alimento}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(prov)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(prov.ID_Contratado)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
