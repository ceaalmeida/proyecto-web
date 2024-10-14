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
        id: 1,
        fechaInicio: "2023-05-01",
        fechaFin: "2024-05-01",
        monto: 1500,
        idContratado: "C001",
    },
    {
        id: 2,
        fechaInicio: "2023-07-01",
        fechaFin: "2024-07-01",
        monto: 2000,
        idContratado: "C002",
    },
];

export default function ContractTable() {
    const [contracts, setContracts] = useState(initialContracts);
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleColumns, setVisibleColumns] = useState([
        "fechaInicio",
        "fechaFin",
        "monto",
        "idContratado",
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingContract, setEditingContract] = useState(null);
    const [newContract, setNewContract] = useState({
        fechaInicio: "",
        fechaFin: "",
        monto: "",
        idContratado: "",
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

    const handleDelete = (id) => {
        setContracts(contracts.filter((contract) => contract.id !== id));
    };

    const handleEdit = (contract) => {
        setEditingContract(contract);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setContracts(
            contracts.map((contract) =>
                contract.id === editingContract.id ? editingContract : contract
            )
        );
        setOpenEditDialog(false);
    };

    const handleAdd = () => {
        const id = Math.max(...contracts.map((c) => c.id)) + 1;
        setContracts([...contracts, { ...newContract, id }]);
        setNewContract({
            fechaInicio: "",
            fechaFin: "",
            monto: "",
            idContratado: "",
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
                return a.fechaInicio.localeCompare(b.fechaInicio);
            } else {
                return b.fechaInicio.localeCompare(a.fechaInicio);
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
                {["fechaInicio", "fechaFin", "monto", "idContratado"].map((column) => (
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
                            {visibleColumns.includes("fechaInicio") && (
                                <TableCell onClick={handleSort} sx={{ cursor: "pointer" }}>
                                    Fecha Inicio {sortOrder === "asc" ? "↑" : "↓"}
                                </TableCell>
                            )}
                            {visibleColumns.includes("fechaFin") && (
                                <TableCell>Fecha Fin</TableCell>
                            )}
                            {visibleColumns.includes("monto") && (
                                <TableCell>Monto</TableCell>
                            )}
                            {visibleColumns.includes("idContratado") && (
                                <TableCell>ID Contratado</TableCell>
                            )}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredContracts.map((contract) => (
                            <TableRow key={contract.id}>
                                {visibleColumns.includes("fechaInicio") && (
                                    <TableCell>{contract.fechaInicio}</TableCell>
                                )}
                                {visibleColumns.includes("fechaFin") && (
                                    <TableCell>{contract.fechaFin}</TableCell>
                                )}
                                {visibleColumns.includes("monto") && (
                                    <TableCell>{contract.monto}</TableCell>
                                )}
                                {visibleColumns.includes("idContratado") && (
                                    <TableCell>{contract.idContratado}</TableCell>
                                )}
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(contract)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(contract.id)}
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
                    {["fechaInicio", "fechaFin", "monto", "idContratado"].map((field) => (
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
                        Por favor, modifique los detalles del contrato.
                    </DialogContentText>
                    {editingContract &&
                        ["fechaInicio", "fechaFin", "monto", "idContratado"].map(
                            (field) => (
                                <TextField
                                    key={field}
                                    margin="dense"
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={editingContract[field]}
                                    onChange={(e) =>
                                        setEditingContract({
                                            ...editingContract,
                                            [field]: e.target.value,
                                        })
                                    }
                                />
                            )
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
