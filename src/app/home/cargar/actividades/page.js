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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ActividadService from "../../../api/actividad/actividad.service";
import { useSession } from "next-auth/react";
import AnimalService from "../../../api/animal/animal.service";
import ProveedoresAlimentosService from "../../../api/proveedor_alimentos/proveedor_alimentos.service"
import ProveedorServiciosComplementariosService from "../../../api/proveedor_servicios_comp/proveedor_servicios_comp.service"
import VeterinarioService from "../../../api/veterinario/veterinario.service";
import {
  loadAllTransports,
} from "../../../api/transporte/transporte.service";

function ActivityTable() {
  const [activities, setActivities] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [borrar, setBorrar] = useState(null);
  const [listaAnimal,setListaAnimal]=useState([])
  const [listaTransporte,setListaTransporte]=useState([])
  const [proveedoresAlimentos,setProveedoresAlimentos]=useState([])
  const [proveedorServiciosComplementarios,setProveedorServiciosComplementarios]=useState([])
  const [veterinarios,setVeterinarios]=useState([])
  const [newActivity, setNewActivity] = useState({
    Descripción_Actividad: "",
    Precio: "",
    Precio_Transporte: "",
    ID_Animal: "",
  });
  const [errors, setErrors] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const getProveedoresAlimentos = async () => {
      const res = await ProveedoresAlimentosService.getAllProveedoresAlimentos(session?.user?.token);
      setProveedoresAlimentos(res);
    };

    const getProveedorServiciosComplementarios = async () => {
      const res = await ProveedorServiciosComplementariosService.getAllProveedores(session?.user?.token);
      setProveedorServiciosComplementarios(res);
    };

    const getVeterinarios = async () => {
      const res = await VeterinarioService.getAllVeterinarios(session?.user.token);
      setVeterinarios(res);
    };

    getProveedoresAlimentos();
    getProveedorServiciosComplementarios();
    getVeterinarios();
  }, [session]);

  useEffect(()=>{
    const getTransporte= async ()=>{
      const res= await loadAllTransports(session?.user?.token)
      setListaTransporte(res)
    }
    getTransporte()
  },[session])

  useEffect(()=>{   
    const getAnimlaes=async()=>{
      const res=await AnimalService.getAllAnimal(session?.user.token)
      setListaAnimal(res)
    }
    getAnimlaes() 
  },[session])

  useEffect(() => {
    const ini = async () => {
      const resp = await ActividadService.getAll(session?.user?.token);
      setActivities(resp);      
    };
    ini();
  }, []);

  const validate = (activity) => {
    let errors = {};

    if (!activity.Descripción_Actividad) {
      errors.Descripción_Actividad = "La descripción no puede estar vacía.";
    }
    if (!activity.Precio || isNaN(activity.Precio)) {
      errors.Precio = "El precio debe ser un número y no puede estar vacío.";
    }
    if (!activity.Precio_Transporte || isNaN(activity.Precio_Transporte)) {
      errors.Precio_Transporte =
        "El precio de transporte debe ser un número y no puede estar vacío.";
    }
    if (
      !activity.ID_Animal ||
      activity.ID_Animal.length < 6 ||
      !/^[a-zA-Z0-9]+$/.test(activity.ID_Animal)
    ) {
      errors.ID_Animal =
        "El ID de animal debe tener al menos 6 caracteres y contener solo letras o números.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async () => {
    const id = Math.max(...activities.map((a) => a.ID_Actividad)) + 1;
    setActivities([...activities, { ...newActivity, ID_Actividad: id }]);
    await ActividadService.create(newActivity, session?.user?.token);
    setNewActivity({
      Descripción_Actividad: "",
      Precio: "",
      Precio_Transporte: "",
      ID_Animal: "",
    });
    setOpenAddDialog(false);
  };
  // useEffect(() => {
  //   handleAdd()
  // }, [])

  const handleSaveEdit = () => {
    if (validate(editingActivity)) {
      setActivities(
        activities.map((activity) =>
          activity.ID_Actividad === editingActivity.ID_Actividad
            ? editingActivity
            : activity
        )
      );
      setOpenEditDialog(false);
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDelete = (id) => {
    setDeleting(true);
    ActividadService.delete(id);
    setActivities(
      activities.filter((activity) => activity.ID_Actividad !== id)
    );
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setOpenEditDialog(true);
  };

  const filteredActivities = activities.filter((activity) =>
    Object.values(activity).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  // .sort((a, b) =>
  //   sortOrder === "asc"
  //     ? a.Descripción_Actividad.localeCompare(b.Descripción_Actividad)
  //     : b.Descripción_Actividad.localeCompare(a.Descripción_Actividad)
  // );

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", p: 2 }}>
      <TextField
        label="Buscar actividades"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mt: 2 }}
        >
          Agregar Actividad
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                Descripción {sortOrder === "asc" ? "↑" : "↓"}
              </TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Precio Transporte</TableCell>
              <TableCell>ID Animal</TableCell> {/* Columna para ID de animal */}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.ID_Actividad}>
                <TableCell>{activity.Descripción_Actividad}</TableCell>
                <TableCell>{activity.Precio}</TableCell>
                <TableCell>{activity.Precio_Transporte}</TableCell>
                <TableCell>{activity.ID_Animal}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(activity)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setBorrar(activity.ID_Actividad),
                        setOpenConfirmDialog(true);
                    }}
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

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Agregar Nueva Actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingrese los detalles de la nueva actividad.
          </DialogContentText>
          {[
            "Descripción_Actividad",
            "Precio",
            "Precio_Transporte",            
            "Dia",
            "Hora",
          ].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={
                field.replace(/_/g, " ").charAt(0).toUpperCase() +
                field.replace(/_/g, " ").slice(1)
              }
              type={
                field === "Dia" ? "date" : field === "Hora" ? "time" : "text"
              }
              fullWidth
              variant="standard"
              value={newActivity[field]}
              onChange={(e) =>
                setNewActivity({ ...newActivity, [field]: e.target.value })
              }
              error={!!errors[field]}
              helperText={errors[field]}
              InputLabelProps={
                field === "Dia" || field === "Hora" ? { shrink: true } : {}
              }
            />
          ))}
          {[
            "Animal",
            "Contratado_Veterinario",
            "Contratado_Proveedor_Alimentos",
            "Contratado_Proveedor_Servicios_Complementarios",
            "Transporte",
          ].map((field) => (
            
            <FormControl fullWidth margin="dense" key={field}>
              <InputLabel>
                {field.replace(/_/g, " ").charAt(0).toUpperCase() +
                  field.replace(/_/g, " ").slice(1)}
              </InputLabel>
              <Select
                value={newActivity[field]}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, ["ID_"+field]: e.target.value })
                }
              >
                {/* Aquí deberías mapear las opciones disponibles */}
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {/* Ejemplo de opciones */}
                {field==="Animal" && listaAnimal.map((tab)=>(
                  <MenuItem value={tab.ID_Animal}>{tab.Nombre}</MenuItem>
                ))}
                {field==="Contratado_Veterinario" && veterinarios.map((tab)=>(
                  <MenuItem value={tab.ID_Contratado}>{tab.Nombre_Veterinario}</MenuItem>
                ))}
                {field==="Contratado_Proveedor_Alimentos" && proveedoresAlimentos.map((tab)=>(
                  <MenuItem value={tab.ID_Contratado}>{tab.Nombre_Proveedor}</MenuItem>
                ))}
                {field==="Contratado_Proveedor_Servicios_Complementarios" && proveedorServiciosComplementarios.map((tab)=>(
                  <MenuItem value={tab.ID_Contratado}>{tab.Nombre_Proveedor}</MenuItem>
                ))}
                {field==="Transporte" && listaTransporte.map((tab)=>(
                  <MenuItem value={tab.ID_Transporte}>{tab.Vehículo}</MenuItem>
                ))}
                
              </Select>
              {errors[field] && (
                <FormHelperText error>{errors[field]}</FormHelperText>
              )}
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, modifique los detalles de la actividad.
          </DialogContentText>
          {editingActivity &&
            [
              "Descripción_Actividad",
              "Precio",
              "Precio_Transporte",
              "ID_Animal",
            ].map((field) => (
              <TextField
                key={field}
                margin="dense"
                label={
                  field.replace(/_/g, " ").charAt(0).toUpperCase() +
                  field.replace(/_/g, " ").slice(1)
                }
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
                error={!!errors[field]}
                helperText={errors[field]}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleSaveEdit}
            disabled={Object.keys(errors).length > 0}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Eliminar Transporte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar la actividad?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={deleting ? null : handleDelete} color="error">
            {deleting ? <CircularProgress /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default ActivityTable;
