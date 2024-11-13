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
  MenuItem,
} from "@mui/material";
import AnimalService from "../../../api/animal/animal.service";

export default function TablePAA() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [animales, setAnimales] = useState([]);
  const [id, setID] = useState(0);

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
    </Paper>
  );
}
