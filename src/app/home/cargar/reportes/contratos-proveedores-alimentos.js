import { useSession } from "next-auth/react";
import GenericTableDisplay from "../../../../components/home/generic-table-reportes";
import ReportService from "../../../api/reporte/reporte.service";

export default function ReporteContratosProveedoresAlimentos() {
  const columns = [
    { key: "nombre_proveedor", label: "Proveedor" },
    { key: "tipo_alimento", label: "Alimento" },
    { key: "id_provincia", label: "Provincia" },
    { key: "direccion", label: "Direccion" },
    { key: "fecha_inicio", label: "Inicio de Contrato" },
    { key: "fecha_terminacion", label: "Terminación de Contrato" },
    { key: "fecha_conciliacion", label: "Conciliación de contrato" },
  ];
  const { data: session } = useSession();

  return (
    <GenericTableDisplay
    entityName={"Información de Contratos con Proveedores de Alimentos"}
      session={session}
      loadAll={ReportService.getListaPA}
      columns={columns}
    />
  );
}
