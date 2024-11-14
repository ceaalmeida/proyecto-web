import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ReportService from "../../../api/reporte/reporte.service";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@mui/material";

export default function TablePIAD() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

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

  return (
    <Paper sx={{ width: "95%", overflow: "hidden", p: 2 }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Animal</TableCell>
              <TableCell>Especie</TableCell>
              <TableCell>Raza</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Costo Total Mantenimiento</TableCell>
              <TableCell>Precio Total Adopción</TableCell>
              <TableCell>Donaciones Recibidas</TableCell>
              <TableCell>Monto Total Ingresos</TableCell>
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
    </Paper>
  );
}
