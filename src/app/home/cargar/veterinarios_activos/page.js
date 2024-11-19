import { useEffect, useState } from "react";
import ContratoService from "../../../api/contrato/contrato.service";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  CircularProgress,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const row = [
  { key: "Código_Contrato", label: "Código Contrato" },
  { key: "Tipo_Servicio", label: "Tipo de Servicio" },
  { key: "Nombre_Responsable", label: "Nombre del Responsable" },
  { key: "Fecha_Inicio", label: "Fecha de Inicio" },
  { key: "Fecha_Terminacion", label: "Fecha de Terminación" },
  { key: "Descripcion", label: "Descripción" },
];

export default function TableContratosVeterinariosActivos() {
  const [data, setData] = useState([]);
  const [exportando, setExportando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todos los contratos del backend
        const response = await ContratoService.getAllContratos();

        // Filtrar solo los contratos con "Tipo_Servicio" igual a "Contrato Veterinario"
        // y cuya "Fecha_Terminacion" no haya pasado
        const contratosActivos = response.filter((contrato) => {
          const fechaActual = new Date();
          const fechaTerminacion = new Date(contrato.Fecha_Terminacion);
          return (
            contrato.Tipo_Servicio === "Contrato Veterinario" &&
            fechaTerminacion >= fechaActual
          );
        });

        setData(contratosActivos);
      } catch (error) {
        window.alert("Error al cargar contratos: " + error.message);
      }
    };

    fetchData();
  }, []);

  const exportarPDF = () => {
    setExportando(true);
    const doc = new jsPDF("portrait", "pt", "A4");
    const marginLeft = 40;
    const title = `Reporte de Contratos Veterinarios Activos`;

    // Configura las cabeceras de la tabla
    const headers = [row.map((col) => col.label)];

    // Mapea los datos para llenar la tabla en PDF
    const dataRows = data.map((item) => row.map((col) => item[col.key]));

    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);

    doc.autoTable({
      startY: 50,
      head: headers,
      body: dataRows,
      margin: { left: marginLeft },
    });

    doc.save(`contratos_veterinarios_activos_report.pdf`);
    setExportando(false);
  };

  return (
    <Paper sx={{ width: "95%", overflow: "hidden", p: 2 }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {row.map((ele) => (
                <TableCell key={ele.key}>{ele.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.Código_Contrato}>
                <TableCell>{item.Código_Contrato}</TableCell>
                <TableCell>{item.Tipo_Servicio}</TableCell>
                <TableCell>{item.Nombre_Responsable}</TableCell>
                <TableCell>{item.Fecha_Inicio}</TableCell>
                <TableCell>{item.Fecha_Terminacion}</TableCell>
                <TableCell>{item.Descripción}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        onClick={exportarPDF}
        sx={{ mt: 2 }}
        disabled={exportando}
      >
        {exportando ? <CircularProgress size={24} /> : "Exportar a PDF"}
      </Button>
    </Paper>
  );
}

