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
import ContratadosService from "../../../api/contratados/contratados.service";
import ContratoService from "../../../api/contratos/contratos.service";
import ProveedorService from "../../../api/proveedor_servicios_comp/proveedor_servicios_comp.service"; // Servicio del proveedor
import { loadAllProvincias } from "../../../api/provincia/provincia.service";
import { useSession } from "next-auth/react";

const generarCodigoContrato = (nombre) => {
    return nombre.slice(0, 6) + Math.floor(Math.random() * 100000);
};

export default function ProveedorTable() {
    const [proveedores, setProveedores] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [newProveedor, setNewProveedor] = useState({
        ID_Contratado: "",
        Nombre_Proveedor: "",
        Dirección: "",
        Teléfono: "",
        Email: "",
        ID_Servicio: "",
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
    const [tab, setTab] = useState("proveedor");
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortColumn, setSortColumn] = useState("Nombre_Proveedor");
    const [visibleColumns, setVisibleColumns] = useState({
        Nombre_Proveedor: true,
        Dirección: true,
        Teléfono: true,
        Email: true,
    });
    const { data: session } = useSession();

    const loadProveedores = async () => {
        const data = await ProveedorService.getAllProveedores();
        setProveedores(data);
    };

    const loadProvinciasData = async () => {
        const data = await loadAllProvincias(session?.user?.token);
        setProvincias(data);
    };

    useEffect(() => {
        loadProveedores();
        loadProvinciasData();
    }, []);

    const handleAdd = async () => {
        if (!newProveedor.Nombre_Proveedor || !newContrato.Tipo_Servicio) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const codigoContrato = generarCodigoContrato(newProveedor.Nombre_Proveedor);
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

        const proveedor = {
            ...newProveedor,
            ID_Contratado: idContratado,
            ID_Servicio: Math.random().toString(36).substr(2, 9), // Genera ID único
        };

        await ContratoService.createContrato(contrato);
        await ContratadosService.createContratado(contratado);
        await ProveedorService.createProveedor(proveedor);

        setProveedores([...proveedores, proveedor]);
        setOpenDialog(false);
    };

    const handleEdit = (prov) => {
        setNewProveedor(prov);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            const proveedorToDelete = proveedores.find((prov) => prov.ID_Contratado === id);
            const contratado = await ContratadosService.getContratadoById(proveedorToDelete.ID_Contratado);

            await ProveedorService.deleteProveedor(id);
            await ContratadosService.deleteContratado(contratado.ID_Contratado);
            await ContratoService.deleteContrato(contratado.Código_Contrato);

            setProveedores(proveedores.filter((prov) => prov.ID_Contratado !== id));
            alert("Proveedor y sus relaciones eliminados correctamente.");
        } catch (error) {
            console.error("Error eliminando proveedor y relaciones:", error);
            alert("Hubo un error al eliminar el proveedor y sus relaciones.");
        }
    };

    const handleSave = async () => {
        if (newProveedor.ID_Contratado) {
            await ProveedorService.updateProveedor(newProveedor.ID_Contratado, newProveedor);
            setProveedores(
                proveedores.map((prov) =>
                    prov.ID_Contratado === newProveedor.ID_Contratado ? newProveedor : prov
                )
            );
        } else {
            await handleAdd();
        }
        setOpenDialog(false);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleSort = (column) => {
        const direction = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(direction);
        setSortColumn(column);
    };

    const filteredProveedores = proveedores
        .filter((prov) =>
            JSON.stringify(prov).toLowerCase().includes(searchQuery)
        )
        .sort((a, b) => {
            if (sortColumn === "Nombre_Proveedor") {
                return sortDirection === "asc"
                    ? a.Nombre_Proveedor.localeCompare(b.Nombre_Proveedor)
                    : b.Nombre_Proveedor.localeCompare(a.Nombre_Proveedor);
            }
            return 0;
        });

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
    <DialogTitle>{newProveedor.ID_Contratado ? "Editar Proveedor" : "Agregar Nuevo Proveedor"}</DialogTitle>
    <DialogContent>
        <div>
            <Button onClick={() => setTab("proveedor")}>Proveedor</Button>
            <Button onClick={() => setTab("contrato")}>Contrato</Button>
        </div>

        {tab === "proveedor" && (
            <div>
                <TextField
                    label="Nombre del Proveedor"
                    fullWidth
                    value={newProveedor.Nombre_Proveedor}
                    onChange={(e) =>
                        setNewProveedor({ ...newProveedor, Nombre_Proveedor: e.target.value })
                    }
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Dirección"
                    fullWidth
                    value={newProveedor.Dirección}
                    onChange={(e) =>
                        setNewProveedor({ ...newProveedor, Dirección: e.target.value })
                    }
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Teléfono"
                    fullWidth
                    value={newProveedor.Teléfono}
                    onChange={(e) =>
                        setNewProveedor({ ...newProveedor, Teléfono: e.target.value })
                    }
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={newProveedor.Email}
                    onChange={(e) =>
                        setNewProveedor({ ...newProveedor, Email: e.target.value })
                    }
                    sx={{ mt: 2 }}
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
                    sx={{ mt: 2 }}
                />
                <Select
                    label="Dirección"
                    fullWidth
                    value={newContrato.Direccion}
                    onChange={(e) =>
                        setNewContrato({ ...newContrato, Direccion: e.target.value })
                    }
                    sx={{ mt: 2 }}
                >
                    {provincias.map((provincia) => (
                        <MenuItem key={provincia.ID_Provincia} value={provincia.Nombre_Provincia}>
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
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={newContrato.Email}
                    onChange={(e) =>
                        setNewContrato({ ...newContrato, Email: e.target.value })
                    }
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Nombre del Responsable"
                    fullWidth
                    value={newContrato.Nombre_Responsable}
                    onChange={(e) =>
                        setNewContrato({ ...newContrato, Nombre_Responsable: e.target.value })
                    }
                    sx={{ mt: 2 }}
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
                    sx={{ mt: 2 }}
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
                    sx={{ mt: 2 }}
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
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Descripción"
                    fullWidth
                    value={newContrato.Descripción}
                    onChange={(e) =>
                        setNewContrato({ ...newContrato, Descripción: e.target.value })
                    }
                    sx={{ mt: 2 }}
                />
            </div>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
    </DialogActions>
</Dialog>

<TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table>
        <TableHead>
            <TableRow>
                {visibleColumns.Nombre_Proveedor && (
                    <TableCell>
                        <Button onClick={() => handleSort("Nombre_Proveedor")}>
                            Nombre del Proveedor
                        </Button>
                    </TableCell>
                )}
                {visibleColumns.Dirección && <TableCell>Dirección</TableCell>}
                {visibleColumns.Teléfono && <TableCell>Teléfono</TableCell>}
                {visibleColumns.Email && <TableCell>Email</TableCell>}
                <TableCell>Acciones</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {filteredProveedores.map((prov) => (
                <TableRow key={prov.ID_Contratado}>
                    {visibleColumns.Nombre_Proveedor && <TableCell>{prov.Nombre_Proveedor}</TableCell>}
                    {visibleColumns.Dirección && <TableCell>{prov.Dirección}</TableCell>}
                    {visibleColumns.Teléfono && <TableCell>{prov.Teléfono}</TableCell>}
                    {visibleColumns.Email && <TableCell>{prov.Email}</TableCell>}
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


