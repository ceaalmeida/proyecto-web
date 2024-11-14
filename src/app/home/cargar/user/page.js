import { useSession } from "next-auth/react";
import {
  createUser,
  deleteUser,
  getAllUsers,
  udpdateUser,
  readUserByEmail,
  readUserById,
} from "../../../api/user/user.service";
import GenericCRUDTable from "../../../../components/home/generic-table.jsx";

export default function UserTable() {
  const { data: session } = useSession();

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "lastname", label: "Apellido" },
    { key: "username", label: "Usuario" },
    { key: "email", label: "Correo" },
    { key: "age", label: "Edad" },
    // { key: "password", label: "Contraseña" },
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
      const usuarioActual = session?.user?.email;
      console.log("Usuario actual:", usuarioActual);
      const deletingUser = await readUserById(id, session?.user?.token);
      console.log("Deleting User: ", deletingUser.email)
      const isAdmin = await esAdmin(usuarioActual, deletingUser.email);
      if (isAdmin) {
        alert("No se puede borrar este usuario");
        return false;
      } else {
        // await deleteUser(id, session?.user?.token);
        console.log("Se Borra el usuario");
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const esAdmin = async (emailActual, emailABorrar) => {
    if (emailActual === emailABorrar) {
      console.log("Es Admin");
      return true;
    }
    console.log("No Es Admin");
    return false;
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
