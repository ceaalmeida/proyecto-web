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
import ProveedorServiciosComplementariosService from "../../../api/proveedor_servicios_comp/proveedor_servicios_comp.service";
import { loadAllProvincias } from "../../../api/provincia/provincia.service";

// Generar código de contrato aleatorio
const generarCodigoContrato = (nombre) => {
    return nombre.slice(0, 6) + Math.floor(Math.random() * 100000);
};

export default function ProveedorServiciosTable() {
    const [proveedores, setProveedores] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [newProveedor, setNewProveedor] = useState({
        nombreProveedor: "",
        direccion: "",
        telefono: "",
        email: "",
    });
    const [newContrato, setNewContrato] = useState({
        tipoContrato: "",
        tipoServicio: "",
        direccion: "",
        telefono: "",
        email: "",
        nombreResponsable: "",
        fechaInicio: "",
        fechaTerminacion: "",
        descripcion: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [tab, setTab] = useState("proveedor");
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortColumn, setSortColumn] = useState("nombreProveedor");
    const [visibleColumns, setVisibleColumns] = useState({
        nombreProveedor: true,
        direccion: true,
        telefono: true,
    });

    useEffect(() => {
        const loadProveedores = async () => {
            const data = await ProveedorServiciosComplementariosService.getAllProveedores();
            setProveedores(data);
        };

        const loadProvinciasData = async () => {
            const data = await loadAllProvincias();
            setProvincias(data);
        };

        loadProveedores();
        loadProvinciasData();
    }, []);

    const handleAdd = async () => {
        if (!newProveedor.nombreProveedor || !newProveedor.direccion) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const codigoContrato = generarCodigoContrato(newProveedor.nombreProveedor);
        const provinciaSeleccionada = provincias.find(
            (p) => p.Nombre_Provincia === newContrato.direccion
        );

        if (!provinciaSeleccionada) {
            alert("La dirección seleccionada no es válida.");
            return;
        }

        const idContratado = codigoContrato.split("").reverse().join("");

        const contrato = {
            ...newContrato,
            Codigo_Contrato: codigoContrato,
            fechaInicio: new Date(newContrato.fechaInicio),
            fechaTerminacion: new Date(newContrato.fechaTerminacion),
        };

        const contratado = {
            Codigo_Contrato: codigoContrato,
            ID_Provincia: provinciaSeleccionada.ID_Provincia,
            ID_Contratado: idContratado,
        };

        const proveedor = {
            ...newProveedor,
            ID_Contratado: idContratado,
        };

        await ContratoService.createContrato(contrato);
        await ContratadosService.createContratado(contratado);
        await ProveedorServiciosComplementariosService.createProveedor(proveedor);

        setProveedores([...proveedores, proveedor]);
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

    const handleColumnVisibility = (column) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const filteredProveedores = proveedores
        .filter((prov) => {
            const provLowerCase = JSON.stringify(prov).toLowerCase();
            return provLowerCase.includes(searchQuery);
        })
        .sort((a, b) => {
            if (sortColumn === "nombreProveedor") {
                return sortDirection === "asc"
                    ? a.nombreProveedor.localeCompare(b.nombreProveedor)
                    : b.nombreProveedor.localeCompare(a.nombreProveedor);
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
                <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
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
                                value={newProveedor.nombreProveedor}
                                onChange={(e) =>
                                    setNewProveedor({ ...newProveedor, nombreProveedor: e.target.value })
                                }
                            />
                            <TextField
                                label="Dirección"
                                fullWidth
                                value={newProveedor.direccion}
                                onChange={(e) =>
                                    setNewProveedor({ ...newProveedor, direccion: e.target.value })
                                }
                            />
                            <TextField
                                label="Teléfono"
                                fullWidth
                                value={newProveedor.telefono}
                                onChange={(e) =>
                                    setNewProveedor({ ...newProveedor, telefono: e.target.value })
                                }
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                value={newProveedor.email}
                                onChange={(e) =>
                                    setNewProveedor({ ...newProveedor, email: e.target.value })
                                }
                            />
                        </div>
                    )}

                    {tab === "contrato" && (
                        <div>
                            <TextField
                                label="Tipo de Contrato"
                                fullWidth
                                value={newContrato.tipoContrato}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, tipoContrato: e.target.value })
                                }
                            />
                            <TextField
                                label="Tipo de Servicio"
                                fullWidth
                                value={newContrato.tipoServicio}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, tipoServicio: e.target.value })
                                }
                            />
                            <Select
                                label="Dirección"
                                fullWidth
                                value={newContrato.direccion}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, direccion: e.target.value })
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
                                value={newContrato.telefono}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, telefono: e.target.value })
                                }
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                value={newContrato.email}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, email: e.target.value })
                                }
                            />
                            <TextField
                                label="Nombre del Responsable"
                                fullWidth
                                value={newContrato.nombreResponsable}
                                onChange={(e) =>
                                    setNewContrato({ ...newContrato, nombreResponsable: e.target.value })
                                }
                            />
                            <TextField
                                label="Fecha de Inicio"
                                fullWidth
                                placeholder="YYYY-MM-DD"
                                value={newContrato.fechaInicio}
                                onChange={(e) =>
                                    setNewContrato({
                                        ...newContrato,
                                        fechaInicio: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="Fecha de Terminación"
                                fullWidth
                                placeholder="YYYY-MM-DD"
                                value={newContrato.fechaTerminacion}
                                onChange={(e) =>
                                    setNewContrato({
                                        ...newContrato,
                                        fechaTerminacion: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="Descripción"
                                fullWidth
                                multiline
                                rows={4}
                                value={newContrato.descripcion}
                                onChange={(e) =>
                                    setNewContrato({
                                        ...newContrato,
                                        descripcion: e.target.value,
                                    })
                                }
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Guardar</Button>
                </DialogActions>
            </Dialog>

            <TableContainer>
                <Table stickyHeader aria-label="Proveedor Servicios Complementarios">
                    <TableHead>
                        <TableRow>
                            {visibleColumns.nombreProveedor && (
                                <TableCell
                                    onClick={() => handleSort("nombreProveedor")}
                                >
                                    Nombre del Proveedor
                                </TableCell>
                            )}
                            {visibleColumns.direccion && (
                                <TableCell onClick={() => handleSort("direccion")}>
                                    Dirección
                                </TableCell>
                            )}
                            {visibleColumns.telefono && (
                                <TableCell onClick={() => handleSort("telefono")}>
                                    Teléfono
                                </TableCell>
                            )}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProveedores.map((proveedor) => (
                            <TableRow key={proveedor.ID_Contratado}>
                                {visibleColumns.nombreProveedor && (
                                    <TableCell>{proveedor.nombreProveedor}</TableCell>
                                )}
                                {visibleColumns.direccion && (
                                    <TableCell>{proveedor.direccion}</TableCell>
                                )}
                                {visibleColumns.telefono && (
                                    <TableCell>{proveedor.telefono}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton>
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

