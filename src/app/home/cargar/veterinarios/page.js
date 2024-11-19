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
    Token,
} from "@mui/icons-material";
import ContratadosService from "../../../api/contratados/contratados.service";
import ContratoService from "../../../api/contratos/contratos.service";
import VeterinarioService from "../../../api/veterinario/veterinario.service";
import { loadAllProvincias } from "../../../api/provincia/provincia.service";
import { useSession } from "next-auth/react";
import contratosService from "../../../api/contratos/contratos.service";

// id.aleatorio
const generarCodigoContrato = (Nombre_Veterinario_Veterinario) => {
    return Nombre_Veterinario_Veterinario.slice(0, 6) + Math.floor(Math.random() * 100000);
};

export default function VeterinarianTable() {
    const [veterinarians, setVeterinarians] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [newVeterinarian, setNewVeterinarian] = useState({
        ID_Contratado: "",
        Nombre_Veterinario_Veterinario: "",
        Clínica_Veterinario: "",
        Dirección_Veterinario: "",
        Especialidad_Veterinario: "",
        Teléfono_Veterinario: "",
        Fax_Veterinario: "",
        Email_Veterinario: "",
        Distancia_Ciudad: "",
        Modalidad_Servicio: "",
    });
    const [newContrato, setNewContrato] = useState({
        Código_Contrato: "",
        Tipo_Servicio: "",
        Direccion: "",
        Telefono: "",
        Email: "",
        Nombre_Responsable: "",
        Fecha_Inicio: "",
        Fecha_Terminacion: "",
        Fecha_Conciliacion: "",
        Descripción: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [tab, setTab] = useState("veterinario");
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortColumn, setSortColumn] = useState("Nombre_Veterinario");
    const [visibleColumns, setVisibleColumns] = useState({
        Nombre_Veterinario_Veterinario: true,
        Clínica_Veterinario: true,
        Dirección_Veterinario: true,
        Teléfono_Veterinario: true,
    });
    const { data: session } = useSession()
    const loadVeterinarios = async () => {
        const data = await VeterinarioService.getAllVeterinarios();
        setVeterinarians(data);
    };

    const loadProvinciasData = async () => {
        try {
            const data = await loadAllProvincias(session?.user?.token);
            setProvincias(data);
        } catch (error) {
            console.log(error)
        }
        
    };

    useEffect( () => {
         loadVeterinarios();
         loadProvinciasData();
    }, []);

    const handleAdd = async () => {
        if (!newVeterinarian.Nombre_Veterinario || !newVeterinarian.Clínica_Veterinario) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const codigoContrato = generarCodigoContrato(newVeterinarian.Nombre_Veterinario);
        const provinciaSeleccionada = provincias.find(
            (p) => p.Nombre_Provincia === newContrato.Direccion
        );

        if (!provinciaSeleccionada) {
            alert("La dirección seleccionada no es válida.");
            return;
        }
        

        const idContratado = codigoContrato.split("").reverse().join("");

        const contrato = {
            ...newContrato,
            Código_Contrato: codigoContrato,
            Fecha_Inicio: new Date(newContrato.Fecha_Inicio),
            Fecha_Terminacion: new Date(newContrato.Fecha_Terminacion),
            Fecha_Conciliacion: new Date(newContrato.Fecha_Conciliacion),
        };

        const contratado = {
            Código_Contrato: codigoContrato,
            ID_Provincia: provinciaSeleccionada.ID_Provincia,
            ID_Contratado: idContratado,
        };

        const veterinario = {
            ...newVeterinarian,
            ID_Contratado: idContratado,
        };

        await ContratoService.createContrato(contrato);
        await ContratadosService.createContratado(contratado);
        await VeterinarioService.createVeterinario(veterinario);

        setVeterinarians([...veterinarians, veterinario]);
        setOpenDialog(false);
    };
    const handleEdit = (vet) => {
        setNewVeterinarian(vet); 
        setOpenDialog(true); 
    };
    
    const handleDelete = async (id) => {
        try {
            // Paso 1: Buscar al veterinario que se eliminará
            const veterinarianToDelete = veterinarians.find((vet) => vet.ID_Contratado === id);
            if (!veterinarianToDelete) {
                alert("No se encontró el veterinario.");
                return;
            }
    
            console.log("Veterinario encontrado:", veterinarianToDelete);
    
            // Paso 2: Buscar el contratado relacionado usando su ID_Contratado
            const contratado = await ContratadosService.getContratadoById(veterinarianToDelete.ID_Contratado);
            if (!contratado) {
                alert("No se encontró el contratado asociado.");
                return;
            }
    
            console.log("Contratado encontrado:", contratado);
    
            // Paso 3: Obtener el Código_Contrato del contratado
            const codigoContrato = contratado.Código_Contrato;
            if (!codigoContrato) {
                alert("No se pudo encontrar el código de contrato asociado.");
                return;
            }
    
            console.log("Código de contrato:", codigoContrato);
    
            
            await VeterinarioService.deleteVeterinario(id);
            console.log("Veterinario eliminado.");
            
            
            await ContratadosService.deleteContratado(contratado.ID_Contratado);
            console.log("Contratado eliminado.");
            
            await ContratoService.deleteContrato(codigoContrato);
            console.log("Contrato eliminado.");
            
    
            // Actualizar el estado local eliminando al veterinario
            setVeterinarians(veterinarians.filter((vet) => vet.ID_Contratado !== id));
            alert("Veterinario y sus relaciones eliminados correctamente.");
        } catch (error) {
            console.error("Error eliminando veterinario y relaciones:", error);
            alert("Hubo un error al eliminar el veterinario y sus relaciones.");
        }
    };
    
    
    const handleSave = async () => {
        try {
            if (newVeterinarian.ID_Contratado) {
                // Actualizar veterinario
                await VeterinarioService.updateVeterinario(newVeterinarian.ID_Contratado, newVeterinarian);
                setVeterinarians(
                    veterinarians.map((vet) =>
                        vet.ID_Contratado === newVeterinarian.ID_Contratado ? newVeterinarian : vet
                    )
                );
                alert("Veterinario actualizado correctamente.");
            } else {
                // Crear nuevo veterinario (ya implementado en handleAdd)
                await    handleAdd();
            }
            setOpenDialog(false); // Cierra el formulario
        } catch (error) {
            console.error("Error al guardar el veterinario:", error);
            alert("Ocurrió un error al intentar guardar el veterinario.");
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleSort = (column) => {
        const direction = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(direction);
        setSortColumn(column);
    };

    const handleColumnVisibility = (column) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const formatFechaInput = (input) => {
        let cleanInput = input.replace(/\D/g, "").slice(0, 8);
        let formattedInput = cleanInput;
        if (cleanInput.length > 4) {
            formattedInput = `${cleanInput.slice(0, 4)}-${cleanInput.slice(4, 6)}`;
        }
        if (cleanInput.length > 6) {
            formattedInput = `${cleanInput.slice(0, 4)}-${cleanInput.slice(4, 6)}-${cleanInput.slice(6, 8)}`;
        }
        return formattedInput;
    };

    const filteredVeterinarians = veterinarians
        .filter((vet) => {
            const vetLowerCase = JSON.stringify(vet).toLowerCase();
            return vetLowerCase.includes(searchQuery);
        })
        .sort((a, b) => {
            if (sortColumn === "Nombre_Veterinario") {
                return sortDirection === "asc"
                    ? a.Nombre_Veterinario.localeCompare(b.Nombre_Veterinario)
                    : b.Nombre_Veterinario.localeCompare(a.Nombre_Veterinario);
            }
            if (sortColumn === "Clínica_Veterinario") {
                return sortDirection === "asc"
                    ? a.Clínica_Veterinario.localeCompare(b.Clínica_Veterinario)
                    : b.Clínica_Veterinario.localeCompare(a.Clínica_Veterinario);
            }
            return 0;
        });

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
            <TextField
                label="Buscar Veterinario"
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
                Agregar Veterinario
            </Button>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Agregar Nuevo Veterinario</DialogTitle>
                <DialogContent>
                    <div>
                        <Button onClick={() => setTab("veterinario")}>Veterinario</Button>
                        <Button onClick={() => setTab("contrato")}>Contrato</Button>
                    </div>

                    {tab === "veterinario" && (
                        <div>
                            <TextField
                                label="Nombre_Veterinario"
                                fullWidth
                                value={newVeterinarian.Nombre_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Nombre_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Clínica"
                                fullWidth
                                value={newVeterinarian.Clínica_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Clínica_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Dirección"
                                fullWidth
                                value={newVeterinarian.Dirección_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Dirección_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Especialidad_Veterinario"
                                fullWidth
                                value={newVeterinarian.Especialidad_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Especialidad_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Teléfono"
                                fullWidth
                                value={newVeterinarian.Teléfono_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Teléfono_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Fax_Veterinario"
                                fullWidth
                                value={newVeterinarian.Fax_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Fax_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Email_Veterinario"
                                fullWidth
                                value={newVeterinarian.Email_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Email_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Distancia_Ciudad_Veterinario"
                                fullWidth
                                value={newVeterinarian.Distancia_Ciudad_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Distancia_Ciudad_Veterinario: e.target.value })
                                }
                            />
                            <TextField
                                label="Modalidad_Servicio_Veterinario"
                                fullWidth
                                value={newVeterinarian.Modalidad_Servicio_Veterinario}
                                onChange={(e) =>
                                    setNewVeterinarian({ ...newVeterinarian, Modalidad_Servicio_Veterinario: e.target.value })
                                }
                            />
                        </div>
                    )}

                    {tab === "contrato" && (
                        <div>

                            <TextField
                                label="Tipo de Servicio"
                                fullWidth
                                value={newContrato.Tipo_Servicio}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, Tipo_Servicio: e.target.value })
                                }
                            />
                            <Select
                                label="Dirección"
                                fullWidth
                                value={newContrato.Direccion}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, Direccion: e.target.value })
                                }
                            >
                                {provincias.map((provincia) => (
                                    <MenuItem
                                        key={provincia.ID_Provincia}
                                        value={provincia.Nombre_Provincia}
                                    >
                                        {provincia.Nombre_Provincia}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField
                                label="Teléfono"
                                fullWidth
                                value={newContrato.Telefono}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, Telefono: e.target.value })
                                }
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                value={newContrato.Email}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, Email: e.target.value })
                                }
                            />
                            <TextField
                                label="Nombre_Veterinario del Responsable"
                                fullWidth
                                value={newContrato.Nombre_Responsable}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, Nombre_Responsable: e.target.value })
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
                                        Fecha_Inicio: formatFechaInput(e.target.value),
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
                                        Fecha_Terminacion: formatFechaInput(e.target.value),
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
                                        Fecha_Conciliacion: formatFechaInput(e.target.value),
                                    })
                                }
                            />
                            <TextField
                                label="Descripción"
                                fullWidth
                                value={newContrato.Descripción}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, Descripción: e.target.value })
                                }
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
    <Button onClick={handleSave}>
        {newVeterinarian.ID_Contratado ? "Guardar Cambios" : "Agregar"}
    </Button>
</DialogActions>
            </Dialog>

            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={visibleColumns.Nombre_Veterinario}
                            onChange={() => handleColumnVisibility("Nombre_Veterinario")}
                        />
                    }
                    label="Mostrar Nombre_Veterinario"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={visibleColumns.Clínica_Veterinario}
                            onChange={() => handleColumnVisibility("Clínica_Veterinario")}
                        />
                    }
                    label="Mostrar Clínica"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={visibleColumns.Dirección_Veterinario}
                            onChange={() => handleColumnVisibility("Dirección_Veterinario")}
                        />
                    }
                    label="Mostrar Dirección"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={visibleColumns.Teléfono_Veterinario}
                            onChange={() => handleColumnVisibility("Teléfono_Veterinario")}
                        />
                    }
                    label="Mostrar Teléfono"
                />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {visibleColumns.Nombre_Veterinario && (
                                <TableCell>
                                    <Button onClick={() => handleSort("Nombre_Veterinario")}>Nombre_Veterinario</Button>
                                </TableCell>
                            )}
                            {visibleColumns.Clínica_Veterinario && (
                                <TableCell>
                                    <Button onClick={() => handleSort("Clínica_Veterinario")}>Clínica</Button>
                                </TableCell>
                            )}
                            {visibleColumns.Dirección_Veterinario && (
                                <TableCell>Dirección</TableCell>
                            )}
                            {visibleColumns.Teléfono_Veterinario && (
                                <TableCell>Teléfono</TableCell>
                            )}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVeterinarians.map((vet) => (
                            <TableRow key={vet.ID_Contratado}>
                                {visibleColumns.Nombre_Veterinario && <TableCell>{vet.Nombre_Veterinario}</TableCell>}
                                {visibleColumns.Clínica_Veterinario && <TableCell>{vet.Clínica_Veterinario}</TableCell>}
                                {visibleColumns.Dirección_Veterinario && <TableCell>{vet.Dirección_Veterinario}</TableCell>}
                                {visibleColumns.Teléfono_Veterinario && <TableCell>{vet.Teléfono_Veterinario}</TableCell>}
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(vet)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(vet.ID_Contratado)}>
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





