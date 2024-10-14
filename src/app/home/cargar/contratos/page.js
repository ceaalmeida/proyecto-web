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
    Checkbox,
    FormControlLabel,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ViewColumn as ViewColumnIcon,
} from "@mui/icons-material";

const initialContracts = [
    {
        "Código_Contrato": "C001",
        "Nombre": "Contrato A",
        "Tipo_Servicio": "Servicio A",
        "Direccion": "Dirección A",
        "Telefono": "123456789",
        "Email": "email@example.com",
        "Nombre_Responsable": "Responsable A",
        "Fecha_Inicio": "2023-05-01",
        "Fecha_Terminacion": "2024-05-01",
        "Fecha_Conciliacion": "2024-05-02",
        "Descripción": "Descripción A",
    },
    {
        "Código_Contrato": "C002",
        "Nombre": "Contrato B",
        "Tipo_Servicio": "Servicio B",
        "Direccion": "Dirección B",
        "Telefono": "987654321",
        "Email": "email2@example.com",
        "Nombre_Responsable": "Responsable B",
        "Fecha_Inicio": "2023-07-01",
        "Fecha_Terminacion": "2024-07-01",
        "Fecha_Conciliacion": "2024-07-02",
        "Descripción": "Descripción B",
    },
];

export default function ContractTable() {
    const [contracts, setContracts] = useState(initialContracts);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState([
        "Código_Contrato",
        "Nombre",
        "Tipo_Servicio",
        "Direccion",
        "Telefono",
        "Email",
        "Nombre_Responsable",
        "Fecha_Inicio",
        "Fecha_Terminacion",
        "Fecha_Conciliacion",
        "Descripción",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingContract, setEditingContract] = useState(null);
    const [newContract, setNewContract] = useState({
        "Código_Contrato": "",
        "Nombre": "",
        "Tipo_Servicio": "",
        "Direccion": "",
        "Telefono": "",
        "Email": "",
        "Nombre_Responsable": "",
        "Fecha_Inicio": "",
        "Fecha_Terminacion": "",
        "Fecha_Conciliacion": "",
        "Descripción": "",
    });
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (codigo) => {
        setContracts(contracts.filter((contract) => contract["Código_Contrato"] !== codigo));
    };

    const handleEdit = (contract) => {
        setEditingContract(contract);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setContracts(
            contracts.map((contract) =>
                contract["Código_Contrato"] === editingContract["Código_Contrato"] ? editingContract : contract
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        setContracts([...contracts, { ...newContract }]);
        setNewContract({
            "Código_Contrato": "",
            "Nombre": "",
            "Tipo_Servicio": "",
            "Direccion": "",
            "Telefono": "",
            "Email": "",
            "Nombre_Responsable": "",
            "Fecha_Inicio": "",
            "Fecha_Terminacion": "",
            "Fecha_Conciliacion": "",
            "Descripción": "",
        });
        setOpenAddDialog(false);
    };

    const toggleColumn = (column) => {
        setVisibleColumns((prev) =>
            prev.includes(column)
                ? prev.filter((col) => col !== column)
                : [...prev, column]
        );
    };

    const filteredContracts = contracts
        .filter((contract) =>
            Object.values(contract).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a["Fecha_Inicio"].localeCompare(b["Fecha_Inicio"]);
            } else {
                return b["Fecha_Inicio"].localeCompare(a["Fecha_Inicio"]);
            }
        });

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
            <TextField
                label="Buscar contratos"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{ mb: 2, ml: 2 }}
            >
                <ViewColumnIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {visibleColumns.map((column) => (
                    <MenuItem key={column}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={visibleColumns.includes(column)}
                                    onChange={() => toggleColumn(column)}
                                />
                            }
                            label={column.charAt(0).toUpperCase() + column.slice(1)}
                        />
                    </MenuItem>
                ))}
            </Menu>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {visibleColumns.map((column) => (
                                <TableCell key={column} onClick={handleSort} sx={{ cursor: "pointer" }}>
                                    {column.charAt(0).toUpperCase() + column.slice(1)} {sortOrder === "asc" ? "↑" : "↓"}
                                </TableCell>
                            ))}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredContracts.map((contract) => (
                            <TableRow key={contract["Código_Contrato"]}>
                                {visibleColumns.map((column) => (
                                    <TableCell key={column}>{contract[column]}</TableCell>
                                ))}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(contract)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(contract["Código_Contrato"])}
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
                sx={{ mt: 2 }}
            >
                Agregar Contrato
            </Button>

            {/* Diálogo para agregar contrato */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Agregar Nuevo Contrato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles del nuevo contrato.
                    </DialogContentText>
                    {Object.keys(newContract).map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newContract[field]}
                            onChange={(e) =>
                                setNewContract({ ...newContract, [field]: e.target.value })
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAdd}>Agregar</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para editar contrato */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Editar Contrato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, edite los detalles del contrato.
                    </DialogContentText>
                    {editingContract && Object.keys(editingContract).map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editingContract[field]}
                            onChange={(e) =>
                                setEditingContract({ ...editingContract, [field]: e.target.value })
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
                    <Button onClick={handleSaveEdit}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
