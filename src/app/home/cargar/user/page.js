import { useSession } from "next-auth/react";
import {
  createUser,
  deleteUser,
  getAllUsers,
  udpdateUser,
} from "../../../api/user/user.service";
import GenericCRUDTable from "../../../../components/home/generic-table.jsx";

export default function UserTable() {
  const { data: session } = useSession();

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "lastname", label: "Apellido" },
    { key: "username", label: "Nombre de Usuario" },
    { key: "email", label: "Correo" },
    { key: "age", label: "Edad" },
    { key: "password", label: "Contraseña" },
    { key: "permiso", label: "Permiso" },
  ];

  const handleCreate = async (newData) => {
    try {
      const id = Math.floor(100000 + Math.random() * 900000);
      const user = { ...newData, id };
      await createUser(user, session?.user?.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await udpdateUser(id, updatedData, session?.user?.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, session?.user?.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GenericCRUDTable
      entityName="Usuario"
      columns={columns}
      loadAll={getAllUsers}
      createEntity={handleCreate}
      updateEntity={handleUpdate}
      deleteEntity={handleDelete}
      session={session}
      idItem={"id"}
    />
  );
}
