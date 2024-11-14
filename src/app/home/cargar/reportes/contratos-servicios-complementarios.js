import { useSession } from "next-auth/react";
import GenericTableDisplay from "../../../../components/home/generic-table-reportes";
import ReportService from "../../../api/reporte/reporte.service";

export default function ReporteContratosProveedoresServiciosComplementarios() {
  const columns = [
    { key: "fecha_inicio_contrato", label: "Inicio de Contrato" },
    { key: "fecha_terminacion_contrato", label: "Terminación de Contrato" },
    { key: "fecha_conciliacion", label: "Conciliación de Contrato" },
    { key: "tipo_servicio", label: "Servicio" },
    { key: "provincia", label: "Provincia" },
  ];
  const { data: session } = useSession();

  return (
    <GenericTableDisplay
    entityName={"Información de Contratos con Proveedores de Servicios Complementarios"}
      loadAll={ReportService.getListaPSC}
      columns={columns}
      session={session}
    />
  );
}
