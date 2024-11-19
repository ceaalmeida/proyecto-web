import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ReportService from "../../../api/reporte/reporte.service";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import AnimalService from "../../../api/animal/animal.service";
import AddIcon from "@mui/icons-material/Add";
import jsPDF from "jspdf";
import "jspdf-autotable";

const row=[
  { "key": "nombre_animal", "label": "Nombre del Animal" },
  { "key": "especie", "label": "Especie" },
  { "key": "raza", "label": "Raza" },
  { "key": "edad", "label": "Edad" },
  { "key": "peso", "label": "Peso" },
  { "key": "dias_refugio", "label": "Días en Refugio" },
  { "key": "dia", "label": "Fecha" },
  { "key": "hora", "label": "Hora" },
  { "key": "descripcion_actividad", "label": "Descripción Actividad" },
  { "key": "precio_actividad", "label": "Precio Actividad" },
  { "key": "nombre_veterinario", "label": "Veterinario" },
  { "key": "tipo_alimento", "label": "Tipo de Alimento" },
  { "key": "precio_total_cuidado_veterinario", "label": "Cuidado Veterinario" },
  { "key": "precio_transporte", "label": "Precio Transporte" },
  { "key": "precio_total_mantenimiento", "label": "Total Mantenimiento" }
]

export default function TablePAA() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [animales, setAnimales] = useState([]);
  const [id, setID] = useState(0);
  const [exportando, setExportando] = useState(false);
  const titulo ="Tabla_Programa_Actividad"

  const exportarPDF = () => {
    setExportando(true);
    const doc = new jsPDF("portrait", "pt", "A4");
    const marginLeft = 40;
    const title = `${titulo} Report`;

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

    doc.save(`${titulo}_report.pdf`);
    setExportando(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReportService.getProgramaActividadesAnimal(
          id,
          session?.user?.token
        );
        setData(response);
      } catch (error) {
        window.alert(error.message);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const getAll = async () => {
      const listaAnimal = await AnimalService.getAllAnimal();
      setAnimales(listaAnimal);
    };
    getAll();
  }, []);

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", p: 2 }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <h1>Selecciona un animal</h1>
        <FormControl fullWidth margin="dense" key="Animal">
          <InputLabel>Animal</InputLabel>
          <Select value={id} onChange={(e) => setID(e.target.value)}>
            {animales.map((field) => (
              <MenuItem value={field.ID_Animal}>{field.Nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Animal</TableCell>
              <TableCell>Especie</TableCell>
              <TableCell>Raza</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Días en Refugio</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Descripción Actividad</TableCell>
              <TableCell>Precio Actividad</TableCell>
              <TableCell>Veterinario</TableCell>
              <TableCell>Tipo de Alimento</TableCell>
              <TableCell>Cuidado Veterinario</TableCell>
              <TableCell>Precio Transporte</TableCell>
              <TableCell>Total Mantenimiento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre_animal}</TableCell>
                <TableCell>{item.especie}</TableCell>
                <TableCell>{item.raza}</TableCell>
                <TableCell>{item.edad}</TableCell>
                <TableCell>{item.peso}</TableCell>
                <TableCell>{item.dias_refugio}</TableCell>
                <TableCell>{item.dia}</TableCell>
                <TableCell>{item.hora}</TableCell>
                <TableCell>{item.descripcion_actividad}</TableCell>
                <TableCell>{item.precio_actividad}</TableCell>
                <TableCell>{item.nombre_veterinario}</TableCell>
                <TableCell>{item.tipo_alimento}</TableCell>
                <TableCell>{item.precio_total_cuidado_veterinario}</TableCell>
                <TableCell>{item.precio_transporte}</TableCell>
                <TableCell>{item.precio_total_mantenimiento}</TableCell>
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
