import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ReportService from "../../../api/reporte/reporte.service";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer,Button,CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import jsPDF from "jspdf";
import "jspdf-autotable";

const row=[  
  { "key": "nombre_animal", "label": "Nombre del Animal" },
  { "key": "especie", "label": "Especie" },
  { "key": "raza", "label": "Raza" },
  { "key": "edad", "label": "Edad" },
  { "key": "costo_total_mantenimiento", "label": "Costo Total Mantenimiento" },
  { "key": "precio_total_adopcion", "label": "Precio Total Adopción" },
  { "key": "donaciones_recibidas", "label": "Donaciones Recibidas" },
  { "key": "monto_total_ingresos", "label": "Monto Total Ingresos" }
]
export default function TablePIAD() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [exportando, setExportando] = useState(false);
  const titulo="Ingreso Donacion Acopcion"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReportService.getListaPIAD(session?.user?.token);
        setData(response);
      } catch (error) {
        window.alert(error.message);
      }
    };

    fetchData();
  }, [session]);

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


  return (
    <Paper sx={{ width: "95%", overflow: "hidden", p: 2 }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {row.map((ele)=>(
              <TableCell key={ele.key}>{ele.label}</TableCell>
            ))}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nombre_animal}</TableCell>
                <TableCell>{item.especie}</TableCell>
                <TableCell>{item.raza}</TableCell>
                <TableCell>{item.edad}</TableCell>
                <TableCell>{item.costo_total_mantenimiento}</TableCell>
                <TableCell>{item.precio_total_adopcion}</TableCell>
                <TableCell>{item.donaciones_recibidas}</TableCell>
                <TableCell>{item.monto_total_ingresos}</TableCell>
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
