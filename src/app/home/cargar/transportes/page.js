import { useSession } from "next-auth/react";
import GenericCRUDTable from "../../../../components/home/generic-table.jsx";
import {
  loadAllTransports,
  createTransport,
  deleteTransport,
  updateTransport,
} from "../../../api/transporte/transporte.service";

export default function TransporteTable() {
  const { data: session } = useSession();

  const columns = [
    { key: "Vehículo", label: "Vehículo" },
    { key: "Modalidad", label: "Modalidad" },
    { key: "Precio", label: "Precio" },
  ];

  const handleCreate = async (newData) => {
    try {
      const ID_Transporte = Math.floor(100000 + Math.random() * 900000);
      const transporte = { ...newData, ID_Transporte };
      await createTransport(transporte, session?.user?.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateTransport(id, updatedData, session?.user?.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransport(id, session?.user?.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <GenericCRUDTable
      entityName="Transporte"
      columns={columns}
      loadAll={loadAllTransports}
      createEntity={handleCreate}
      updateEntity={handleUpdate}
      deleteEntity={handleDelete}
      session={session}
      idItem={"ID_Transporte"}
    />
  );
}
