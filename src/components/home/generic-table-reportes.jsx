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
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function GenericTableDisplay({
  idItem,
  entityName,
  loadAll,
  columns,
  session,
}) {
  const [data, setData] = useState([]);
  const [exportando, setExportando] = useState(false);

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

  const exportarPDF = () => {
    setExportando(true);
    const doc = new jsPDF("portrait", "pt", "A4");
    const marginLeft = 40;
    const title = `${entityName} Report`;

    // Configura las cabeceras de la tabla
    const headers = [columns.map((col) => col.label)];

    // Mapea los datos para llenar la tabla en PDF
    const dataRows = data.map((item) => columns.map((col) => item[col.key]));

    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);

    doc.autoTable({
      startY: 50,
      head: headers,
      body: dataRows,
      margin: { left: marginLeft },
    });

    doc.save(`${entityName}_report.pdf`);
    setExportando(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Typography component="h6" variant="h5">
        {entityName} 
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item[idItem]}>
                {columns.map((col) => (
                  <TableCell key={col.key}>{item[col.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={exportarPDF}
        sx={{ mt: 2 }}
      >
        {exportando ? <CircularProgress /> : "Exportar a PDF"}
      </Button>
    </Paper>
  );
}
