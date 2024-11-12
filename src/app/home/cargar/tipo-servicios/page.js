"use client";
import {
  createService,
  deleteService,
  loadAllServices,
  readService,
  updateService,
} from "../../../api/tipo-de-servicio/tipo-de-servicio.service";
import { useSession } from "next-auth/react";
import GenericCRUDTable from "../../../../components/home/generic-table";

export default function ServiceTypeTable() {
  const columns = [{ key: "Nombre_Servicio", label: "Nombre de Servicio" }];

  const { data: session, status } = useSession();

  const handleAdd = async (newData) => {
    try {
      const ID_Servicio = Math.floor(100000 + Math.random() * 900000);
      const servicio = { ...newData, ID_Servicio };
      await createService(newData, session?.user?.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      await updateService(id, updatedData, session?.user?.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id, session?.user?.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GenericCRUDTable
      entityName="Servicio"
      columns={columns}
      loadAll={loadAllServices}
      createEntity={handleAdd}
      updateEntity={handleSaveEdit}
      deleteEntity={handleDelete}
      session={session}
      idItem={"ID_Servicio"}
    />
  );
}
