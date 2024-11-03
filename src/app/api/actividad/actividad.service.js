class AdopcionService {
    async getAll(token) {
      const adop = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Adopcion`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await adop.json();
      return data;
    }
  
    async delete(id, token) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Adopcion/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  
    async update(id, element, token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Adopcion/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(element),
        }
      );
      if (!res.ok) {
        window.alert("Error al actualizar");
      }
    }
  
    async create(element, token) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Adopcion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(element),
      });
      if (!res.ok) {
        window.alert("Error al crear");
      }
    }
  }
  
  export default new AdopcionService();
  